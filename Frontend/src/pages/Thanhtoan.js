import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet';
import { IoMdArrowBack } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { GetCart } from '../features/cart/cartSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { CheckCoupon } from '../features/coupon/couponSlice';
import { CreateInvoice } from '../features/invoice/invoiceSlice';
import { CreatePayment } from '../features/payment/paymentSlice';
import formatNumber from '../utils/formatNumber';

const invoiceSchema = yup.object({
    shippingInfo: yup.string().required('Address is Required'),
});

const couponSchema = yup.object({
    code: yup.string(),
});

const Thanhtoan = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userState = useSelector(state => state?.auth?.user?.userDto)
    const cartState = useSelector(state => state?.cart?.carts)
    const couponState = useSelector(state => state?.coupon?.ACoupon)
    const paymentURLState = useSelector(state => state?.payment?.payments?.url)
    const [selectedTab, setSelectedTab] = useState('thongTin');
    const [sum, setSum] = useState();
    const [tongTien, setTongTien] = useState();
    const [tongsl, settongsl] = useState();
    const [thanhToan, setThanhToan] = useState("tt");
    const [dataPayment, setDataPayment] = useState("tt");
    const [applyCoupon, setApplyCoupon] = useState(true);

    const formik = useFormik({
        initialValues: {
            userId: userState?.id || "",
            shippingInfo: userState?.address || "",
            issueDate: new Date().toISOString().substr(0, 10),
            totalPrice: sum || 0,
            totalPriceAfterDiscount: tongTien || 0,
            couponId: null,
            paid: false,
            orderStatus: "Hóa Đơn Mới",
            invoiceDetails: []
        },
        validationSchema: invoiceSchema,
        onSubmit: values => {
            if (thanhToan === "tt") {
                dispatch(CreateInvoice(values))
                setTimeout(() => {
                    navigate('/user');
                }, 300)
            }
            if (thanhToan === "onl") {
                if(paymentURLState){
                    window.location.href = paymentURLState
                }
                
            }
        },
    });

    const formik2 = useFormik({
        initialValues: {
            code: "",
            money: sum || 0,
            date: new Date().toISOString().substr(0, 10),
        },
        validationSchema: couponSchema,
        onSubmit: values => {
            dispatch(CheckCoupon(values))
        },
    });

    useEffect(() => {
        if (couponState) {
            formik.setFieldValue("couponId", couponState.id);
            setApplyCoupon(false)
            if (couponState.discountPercent > 0) {
                var tien = tongTien
                tien -= (couponState.discountPercent / 100) * tien;
                setTongTien(tien)
                formik.setFieldValue("totalPriceAfterDiscount", tien);
            } else {
                var tien = tongTien
                tien -= couponState.discountMoney;
                setTongTien(tien)
                formik.setFieldValue("totalPriceAfterDiscount", tien);
            }
        }
    }, [couponState])

    useEffect(() => {
        dispatch(GetCart(userState?.id))
    }, [])

    useEffect(() => {
        if(thanhToan === "onl"){
            dispatch(CreatePayment(dataPayment))
        }
    }, [thanhToan])



    useEffect(() => {
        let dem = 0
        let dem2 = 0
        for (let i = 0; i < cartState.length; i++) {
            dem += cartState[i]?.quantity * cartState[i]?.product?.price;
            dem2 += cartState[i]?.quantity
        }
        const newList = cartState.map((item) => ({
            productName: item.product?.phone?.name,
            price: item.product?.price,
            quantity: item.quantity
          }));
          setDataPayment(newList)
        setSum(dem)
        setTongTien(dem)
        settongsl(dem2)
        formik2.setFieldValue("money", dem);
        formik.setFieldValue("totalPrice", dem);
        formik.setFieldValue("totalPriceAfterDiscount", dem);
    }, [cartState])

    useEffect(() => {
        if (cartState) {
            const updatedInvoiceDetails = cartState.map(item => {
                return {
                    productId: item?.productId,
                    quantity: item?.quantity,
                    totalPrice: item?.quantity * item?.product?.price,
                };
            });
            formik.setFieldValue("invoiceDetails", updatedInvoiceDetails);
        }
    }, [cartState])

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };
    const handlePayment = (e) => {
        if (e.target.values === "tt") {
            setThanhToan("tt")
        } else {
            setThanhToan("onl")
        }
    };
    const handleEditInfo = () => {
        setTimeout(() => {
            navigate('/user/thong-tin-tai-khoan');
        }, 300)
    }


    return (
        <div>
            <Helmet>
                <title>Thanh toán | PHBshop</title>
            </Helmet>
            <Container className='w-50 m-auto '>
                <Row >
                    <p className='text-center w-100 bg-transparent'><Link to="/cart"><IoMdArrowBack className='float-left mt-2 h3' /></Link> <p className='h4 mt-2'>THANH TOÁN</p></p>
                </Row>
                <Row className='mt-2 border-top text-center '>
                    <Col className={`mr-2 ${selectedTab === 'thongTin' ? 'border-bottom border-danger text-danger font-weight-bold' : ''}`}>
                        <button
                            id="btnThongTin"
                            className={`p-2 w-100 ${selectedTab === 'text-danger' ? 'secondary' : ''} border-0 bg-transparent focus-outline-none ${selectedTab === 'thongTin' ? 'selected' : ''}`}
                            onClick={() => handleTabChange('thongTin')}
                        >
                            1. THÔNG TIN
                        </button>
                    </Col>
                    <Col className={`ml-2 ${selectedTab === 'thanhToan' ? 'border-bottom border-danger text-danger font-weight-bold' : 'border-bottom border-gray font-weight-bold'}`}>
                        <button
                            id="btnThanhToan"
                            className={`p-2 w-100  ${selectedTab === 'text-danger' ? 'secondary' : ''}  border-0 bg-transparent focus-outline-none ${selectedTab === 'thanhToan' ? 'selected' : ''}`}
                            onClick={() => handleTabChange('thanhToan')}
                        >
                            2. THANH TOÁN
                        </button>
                    </Col>
                </Row>
                <div id="thongTin" style={{ display: selectedTab === 'thongTin' ? 'block' : 'none' }}>
                    {
                        cartState && cartState?.map((item, index) => {
                            return (
                                <Row key={index} className=' pb-2 mb-4   mt-4 bg-light shadow p-4 mb-5 bg-white rounded'>
                                    <Col xl={2} md={2} sm={2} className='p-2'>
                                        <Image src={item?.product?.images ? item?.product?.images[0]?.url : "https://bit.ly/3ul4poY"} width={'75px'} />
                                    </Col>
                                    <Col xl={7} md={7} sm={7}>
                                        <h5>{item?.product?.phone?.name}</h5>
                                        <p className='text-danger'>Giá: {formatNumber(item?.product?.price)}đ</p>
                                    </Col>
                                    <Col xl={3} md={3} sm={3} className='text-right'>
                                        <p>Số lượng: <span>{item?.quantity}</span></p>
                                    </Col>
                                </Row>
                            )
                        })
                    }

                    <Row>
                        <div className='  bg-light shadow p-4 mb-5 bg-white rounded w-100 d-content-a'>
                            <h4>THÔNG TIN NHẬN HÀNG
                                <span onClick={() => { handleEditInfo() }} className='text-primary btn'><RiEditBoxLine className='mb-1' />Thay đổi thông tin</span>
                            </h4>
                            <form>
                                <div class="form-group">
                                    <label for="hoTen">Họ tên người nhận</label>
                                    <input readOnly type="text" class="form-control" id="hoTen" placeholder="Nhập họ tên" value={userState?.name} />
                                </div>
                                <div class="form-group">
                                    <label for="soDienThoai">Số điện thoại người nhận</label>
                                    <input readOnly type="tel" class="form-control" id="soDienThoai" placeholder="Nhập số điện thoại" value={userState?.phoneNumber} />
                                </div>
                                <div class="form-group">
                                    <label for="email">Email người nhận</label>
                                    <input readOnly type="email" class="form-control" id="email" placeholder="Nhập email" value={userState?.email} />
                                </div>
                                <div class="form-group">
                                    <label for="address">Địa chỉ</label>
                                    <input type="address" class="form-control" id="address" placeholder="Nhập address"
                                        value={formik.values.shippingInfo}
                                        onChange={formik.handleChange('shippingInfo')}
                                        onBlur={formik.handleBlur('shippingInfo')}
                                    />
                                    <div className='error'>
                                        {
                                            formik.touched.shippingInfo && formik.errors.shippingInfo
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>

                    </Row>
                   
                    <Row>
                        <Button variant='text-danger bg-danger w-100 text-light' onClick={() => handleTabChange('thanhToan')}>Tiếp tục</Button>

                    </Row>
                </div>
                <div id="thanhToan" style={{ display: selectedTab === 'thanhToan' ? 'block' : 'none' }} className='mt-4'>
                    <div className='bg-light shadow p-4 mb-5 bg-white rounded'>
                        <p>
                            <form onSubmit={formik2.handleSubmit}>
                                <div className='row'>
                                    <div className='col-8'>
                                        <input type='text'
                                            placeholder='Nhập mã giảm giá (chỉ ap dụng 1 lần)'
                                            className='w-100 py-2'
                                            value={formik2.values.code}
                                            onChange={formik2.handleChange('code')}
                                            onBlur={formik2.handleBlur('code')} />
                                        <div className='error'>
                                            {
                                                formik.touched.shippingInfo && formik.errors.shippingInfo
                                            }
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <button
                                            type='submit'
                                            className="float-right btn btn-danger"
                                            disabled={applyCoupon ? true : false}
                                        >
                                            Áp Dụng
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </p>
                        <p>
                            <span className='float-right'></span>
                        </p>
                        <p>Số lượng sản phẩm <span className='float-right'>{tongsl}</span></p>
                        <p>Tiền hàng (tạm tính) <span className='float-right'>{formatNumber(sum)}đ</span></p>
                        <hr />
                        <p className=''>Tổng tiền đã bao gồm VAT(8%) <span className='float-right h5 font-weight-bold'>{formatNumber(tongTien)}đ</span></p>
                    </div>
                    <div>
                        <h4>THÔNG TIN THANH TOÁN</h4>
                        <div className='bg-light shadow p-4 mb-5 bg-white rounded'>
                            <h5><MdPayment style={{ fontSize: '40px' }} className='mr-3' /><span className='text-danger'>Chọn phương thức thanh toán</span></h5>
                            <select
                                onClick={(e) => handlePayment(e)}
                                name="" className='form-control form-select'>
                                <option value="tt" selected>Thanh toán trực tiếp</option>
                                <option value="onl">Thanh toán online</option>
                            </select>
                        </div>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <h4>THÔNG TIN NHẬN HÀNG</h4>
                            <div className='bg-light shadow p-4 mb-5 bg-white rounded'>
                                <p>Khách hàng:<span className='float-right'>{userState?.name}</span></p>
                                <p>Số diện thoại: <span className='float-right'>{userState?.phoneNumber}</span></p>
                                <p>Email: <span className='float-right'>{userState?.email}</span></p>
                                <p>Nhận tại: <span className='float-right'>{formik.values.shippingInfo}</span></p>
                            </div>
                        </div>
                        <Row className='bg-light shadow p-3 mb-5 bg-white rounded'>
                            <p><span className='font-weight-bold mr-2'>Tổng tiền tạm tính:</span> <span className='text-danger font-weight-bold'>{formatNumber(formik.values.totalPriceAfterDiscount)}đ</span></p>
                            <Button type='submit' variant='text-danger bg-danger w-100 text-light'>Thanh toán</Button>
                        </Row>
                    </form>

                </div>
            </Container>


        </div>

    )
}

export default Thanhtoan
