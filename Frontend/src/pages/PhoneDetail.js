import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CiCirclePlus } from "react-icons/ci";
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
import Footer from '../Components/Footer';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux'
import { GetAPhone } from '../features/phone/phoneSlice';
import { CreateWishList } from '../features/wishlists/wishlistSlice';
import { Helmet } from 'react-helmet';
import { GetCapacitiesByPhoneId } from '../features/capacity/capacitySlice';
import { GetColorsByPhoneId } from '../features/color/colorSlice';
import { GetProductForUser } from '../features/products/productSlice';
import { AddCart } from '../features/cart/cartSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { CreateComment } from '../features/comment/commentSlice';
import { CreateRating } from '../features/rating/ratingSlice';
import formatNumber from '../utils/formatNumber';
import { GetCoupon } from '../features/coupon/couponSlice';

const commentSchema = yup.object({
    content: yup.string().required("Content is required!"),
    hinhPublicId: yup.string(),
    fileHinh: yup.string(),
});

const ratingSchema = yup.object({
    comment: yup.string().required("Content is required!"),
    star: yup.number().required("Rating star is required!").min(1).max(5),
});

const PhoneDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    const phoneState = useSelector(state => state?.phone?.A_Phone);
    const productState = useSelector(state => state?.product?.A_Product);
    const authState = useSelector(state => state?.auth?.user?.userDto);
    const capacityState = useSelector(state => state?.capacity?.capacities);
    const colorState = useSelector(state => state?.color?.colors);
    const phoneId = useParams().phoneId;
    const couponState = useSelector(state => state?.coupon?.coupons)
    const [activeButtonCapacity, setActiveButtonCapacity] = useState(null);
    const [activeButtonColor, setActiveButtonColor] = useState(null);
    const [replytVisiable, setReplytVisiable] = useState(false);
    const [replyCommentId, setReplyCommentId] = useState(null);
    const formik = useFormik({
        initialValues: {
            content: '',
            userId: authState?.id || "",
            productId: productState?.id || "",
            commentId: "",
            ngayDang: new Date().toISOString().substr(0, 10),
        },
        validationSchema: commentSchema,
        onSubmit: values => {
            console.log(values);
            dispatch(CreateComment(values));
            setTimeout(() => {
                dispatch(GetProductForUser(AProduct))
            }, 300);
        },
    });


    const formik2 = useFormik({
        initialValues: {
            comment: '',
            star: '',
            ngayDang: new Date().toISOString().substr(0, 10),
            userId: authState?.id || "",
            productId: productState?.id || "",
        },
        validationSchema: ratingSchema,
        onSubmit: values => {
            console.log(values);
            dispatch(CreateRating(values));
            setTimeout(() => {
                dispatch(GetProductForUser(AProduct))
            }, 300);
        },
    });
    const formik3 = useFormik({
        initialValues: {
            content: '',
            userId: authState?.id || "",
            productId: productState?.id || "",
            commentId: "",
            ngayDang: new Date().toISOString().substr(0, 10),
        },
        validationSchema: commentSchema,
        onSubmit: values => {
            console.log(values);
            setReplytVisiable(false);
            dispatch(CreateComment(values));
            setTimeout(() => {
                dispatch(GetProductForUser(AProduct))
            }, 300);
        },
    });
    const [AProduct, setAProduct] = useState({
        "phoneId": phoneId,
        "colorId": productState?.colorId,
        "capacityId": productState?.capacityId
    });
    //Lấy thông tin phone danh sách loại rom và danh sách
    useEffect(() => {
        dispatch(GetCoupon())
        dispatch(GetAPhone(phoneId))
            .then(() => setIsLoading(false))
            .catch(() => 'error');
        dispatch(GetCapacitiesByPhoneId(phoneId))
        dispatch(GetColorsByPhoneId(phoneId))
    }, [dispatch, phoneId]);

    //Khới tạo sp ban đầu
    useEffect(() => {
        if (phoneState?.products && phoneState.products.length > 0) {
            setAProduct(prevState => ({
                ...prevState,
                colorId: phoneState.products[0].colorId,
                capacityId: phoneState.products[0].capacityId
            }));
        }
    }, [phoneState]);
    //Lấy sản phẩm mới sau khi chọn màu và rom
    useEffect(() => {
        dispatch(GetProductForUser(AProduct))
    }, [dispatch, AProduct]);
    //Load rating và bình luận
    useEffect(() => {
        formik.setFieldValue("productId", productState?.id);
        formik2.setFieldValue("productId", productState?.id);
        formik3.setFieldValue("productId", productState?.id);
    }, [dispatch, productState])


    const handleColorSelection = (colorId) => {
        setAProduct(prevState => ({
            ...prevState,
            colorId: colorId
        }));
        setActiveButtonColor(colorId);
    };

    const handleCapacitySelection = (capacityId) => {
        setAProduct(prevState => ({
            ...prevState,
            capacityId: capacityId
        }));
        setActiveButtonCapacity(capacityId);
    };


    if (isLoading) {
        return <div className='w-100 d-flex justify-content-center' style={{ height: '300px' }}>
            <div className="spinner"></div>
        </div>;
    }

    if (!phoneState) {
        window.location.href = '/404';
        return null;
    }
    //Thêm sản phẩm yêu thích
    const addWishlist = () => {
        dispatch(CreateWishList({
            userId: authState?.id,
            phoneId: phoneState?.id,
        }))
    }

    const addCart = () => {
        dispatch(AddCart({
            userId: authState?.id,
            productId: productState?.id,
            quantity: 1
        }))
        setTimeout(() => {
            navigate("/cart")
        }, 300);
    }
    const handleReplyClick = (commentId) => {
        setReplytVisiable(true);
        setReplyCommentId(commentId);
        formik3.setFieldValue("commentId", commentId)
    };
    return (
        <>
            <Helmet>
                <title>{phoneState.name} | PHBshop</title>
            </Helmet>

            <div>

                <Container className='pl-0 ml-0'>
                    <h5 style={{ display: 'inline-block' }}>Điện thoại {phoneState.name} {productState?.capacity?.totalCapacity} GB</h5>
                    <span className=' ml-3 text-primary'>{productState?.soldQuantity} Số lượng đã bán</span>
                    <Link className='ml-3' onClick={addWishlist}>
                        <div className="heart heart1">
                            <svg width="1em" height="1em" viewBox="0 0 512 512">
                                <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3C200.7 23 111.4 15.6 53.6 64.3C-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9c14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3m-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7c38.9-32.7 98.9-27.8 136.5 10.5l35 35.7l35-35.7c37.8-38.5 97.8-43.2 136.5-10.6c51.1 43.1 43.5 113.9 7.3 150.8"></path>
                            </svg>
                        </div>
                        <div className="heart heart2">
                            <svg width="1em" height="1em" viewBox="0 0 512 512" >
                                <path fill="#ff0000" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9"></path>
                            </svg>
                        </div>
                    </Link>
                    <Link to="/so-sanh" className='ml-3' >
                        <CiCirclePlus className='mb-1' style={{ fontSize: '20px' }} />
                        So sánh
                    </Link>
                </Container>
                <Container className='border-top'>
                    <Row>
                        <Col xl={7}>
                            {/* Slider điện thoại */}
                            <Swiper
                                spaceBetween={30}
                                centeredSlides={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={true}
                                modules={[Autoplay, Pagination, Navigation]}
                                className="mySwiper"
                            >
                                {
                                    productState?.images.map((item, index) => {
                                        return (
                                            <SwiperSlide key={index}>
                                                <img className='w-100' src={item.url} alt='zxc' />
                                            </SwiperSlide>
                                        )
                                    })
                                }

                            </Swiper>
                            {/* <SwiperSlide>
                                    <img className='w-100' src={productState?.images[0].url} alt='zxc' />
                                </SwiperSlide> */}


                            {/* Ảnh thông tin điện thoại */}
                            <Container className='bg-light '>
                                <Row className='mt-5'>
                                    <h5>Thông tin sản phẩm</h5>
                                    <p>{phoneState.desc}</p>
                                </Row>


                            </Container>
                            {/* Đánh giá sản phẩm */}
                            <Container className='bg-light shadow p-3 mb-5 bg-white rounded  mt-3'>
                                <Row>
                                    <Col>
                                        <div>
                                            <h2 className='text-danger'>Đánh giá sản phẩm</h2>
                                            <p>Điểm đánh giá: {
                                                productState?.averageRating && typeof productState?.averageRating === 'number' && productState?.averageRating > 0 && (
                                                    Array.from({ length: productState?.averageRating }).map((_, index) => (
                                                        <span key={index} style={{ cursor: 'inherit', display: 'inline-block', position: 'relative' }}>
                                                            &#9733;
                                                        </span>
                                                    ))
                                                )
                                            }</p>
                                            <div>

                                            </div>
                                        </div>
                                        <div className='d-flex justify-start items-center'>
                                            <p className='mt-1'>Lọc đánh giá theo</p>
                                            <Button className='bg-light ml-2 text-info '>Tất cả</Button>
                                            <Button className='bg-light ml-2 text-info '>5 sao</Button>
                                            <Button className='bg-light ml-2 text-info '>4 sao</Button>
                                            <Button className='bg-light ml-2 text-info '>3 sao</Button>
                                            <Button className='bg-light ml-2 text-info '>2 sao</Button>
                                            <Button className='bg-light ml-2 text-info '>1 sao</Button>
                                        </div>
                                        <Form onSubmit={formik2.handleSubmit}>
                                            <Row className="flex flex-wrap md:flex-nowrap w-full items-start h-full justify-between my-2">
                                                <Col md={10} className="w-full h-full mb-3 md:mb-0">
                                                    <div className='mb-3'>
                                                        <input
                                                            type="number"
                                                            name="star"
                                                            className="form-control"
                                                            placeholder="Star"
                                                            value={formik2.values.star}
                                                            onChange={formik2.handleChange('star')}
                                                            onBlur={formik2.handleBlur('star')}
                                                        />
                                                        <div className='error'>
                                                            {
                                                                formik2.touched.star && formik2.errors.star
                                                            }
                                                        </div>
                                                    </div>
                                                    <Form.Group className="mantine-InputWrapper-root mantine-Textarea-root mantine-1m3pqry">
                                                        <Form.Control
                                                            as="textarea"
                                                            className="rounded-lg border-neutral-300 mantine-Input-input mantine-Textarea-input mantine-1jx8v2y"
                                                            id="mantine-r8"
                                                            placeholder="Đánh giá sản phẩm"
                                                            rows="6"
                                                            aria-invalid="false"
                                                            value={formik2.values.comment}
                                                            onChange={formik2.handleChange('comment')}
                                                            onBlur={formik2.handleBlur('comment')}
                                                        />
                                                        <div className='error'>
                                                            {
                                                                formik2.touched.comment && formik2.errors.comment
                                                            }
                                                        </div>
                                                    </Form.Group>

                                                </Col>
                                                <Col md={2} className="w-full flex flex-col md:px-2">
                                                    <Button
                                                        variant="primary"
                                                        type="submit"
                                                        className="mantine-UnstyledButton-root mantine-Button-root bg-ddv hover:bg-ddv text-white rounded-lg cursor-pointer mt-2 mantine-ijj40k"
                                                        style={{ width: '100%', height: '44px' }}
                                                    >
                                                        Gửi
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                        {
                                            productState && productState?.ratings?.map((item, index) => {
                                                return (
                                                    <div key={index} className='mt-4'>
                                                        <div className='d-flex items-start justify-start '>
                                                            <div className='avatar overflow-hidden'>
                                                                <img src='/Images/user-icon.jpg' width={30} height={30} alt='zxczcxzxc' />
                                                            </div>
                                                            <div className='flex-column items-start justify-start pl-2 w-11/12'>
                                                                <div className='d-flex items-center'>
                                                                    <span style={{ display: 'inline-block', direction: '1tr' }}>
                                                                        {
                                                                            item && typeof item.star === 'number' && item.star > 0 && (
                                                                                Array.from({ length: item.star }).map((_, index) => (
                                                                                    <span key={index} style={{ cursor: 'inherit', display: 'inline-block', position: 'relative' }}>
                                                                                        &#9733;
                                                                                    </span>
                                                                                ))
                                                                            )

                                                                        }

                                                                    </span>
                                                                    <p className="text-brow text-sm mx-2">{item?.ngayDang}</p>
                                                                </div>
                                                                <div className="d-flex items-center">
                                                                    <p className="text-ddv font-bold text-16">
                                                                        <span className="text-16 mx-2 text-black font-normal">{item?.comment}</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }


                                    </Col>
                                </Row>
                            </Container>
                            {/* Bình luận */}
                            <Container className='bg-light shadow p-3 mb-5 bg-white rounded '>
                                <Row>
                                    <Col>
                                        <div className=' my-2 rounded-lg  bg-white py-3 px-3'>
                                            <div className='flex-column'>
                                                <h4 className='text-danger font-weight-bold p-0'>Bình luận</h4>
                                                <div className='mb-5'>
                                                    <Form onClick={formik.handleSubmit}>
                                                        <Row className="flex flex-wrap my-2">
                                                            <Col md={10} className=" mb-3">
                                                                <Form.Group className="">
                                                                    <Form.Control
                                                                        as="textarea"
                                                                        className="rounded-lg"
                                                                        id="mantine-r8"
                                                                        placeholder="Nhận xét về sản phẩm"
                                                                        rows="6"
                                                                        aria-invalid="false"
                                                                        value={formik.values.content}
                                                                        onChange={formik.handleChange('content')}
                                                                        onBlur={formik.handleBlur('content')}
                                                                    />
                                                                    <div className='error'>
                                                                        {
                                                                            formik.touched.content && formik.errors.content
                                                                        }
                                                                    </div>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={2} className="w-full flex flex-col md:px-2">
                                                                <Button
                                                                    variant="primary"
                                                                    type="submit"
                                                                    className="text-white cursor-pointer mt-2 "
                                                                    style={{ width: '100%', height: '44px' }}
                                                                >
                                                                    Gửi
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                </div>
    {
        productState && productState?.comments?.map((item, index) => {
            if (item?.commentId === null) {
                return (
                    <div className='pt-4 w-100' key={item.id}>
                        <div className='d-flex items-start justify-start '>
                            <div className='avatar overflow-hidden'>
                                <img src='/Images/user-icon.jpg' width={30} height={30} alt='asdasd' />
                            </div>

                            <div className='flex-column items-start justify-start w-100'>
                                <div className='d-flex items-center ml-4'>
                                    <h5>Khách hàng</h5>
                                    <p className="text-brow text-sm mx-2">{item?.ngayDang}</p>
                                </div>
                                <div className="bg-light shadow ml-4 p-3 mb-5 bg-white rounded">
                                    <p className="text-ddv font-bold text-16">
                                        <span className="text-16 mx-2 text-black font-normal">{item?.content}</span>
                                    </p>
                                    <div className='d-flex justify-content-end'>
                                        <p className='text-danger btn' onClick={() => handleReplyClick(item.id)}>Trả lời</p>
                                    </div>
                                </div>
                                {replytVisiable && replyCommentId === item.id && (
                                    <Form onSubmit={formik3.handleSubmit}>
                                        <Row className="flex flex-wrap my-2">
                                            <Col md={10} className="mb-3">
                                            <Form.Group className="">
                                                                    <Form.Control
                                                                        as="textarea"
                                                                        className="rounded-lg"
                                                                        id="mantine-r8"
                                                                        placeholder="Nhận xét về sản phẩm"
                                                                        rows="6"
                                                                        aria-invalid="false"
                                                                        value={formik3.values.content}
                                                                        onChange={formik3.handleChange('content')}
                                                                        onBlur={formik3.handleBlur('content')}
                                                                    />
                                                                    <div className='error'>
                                                                        {
                                                                            formik3.touched.content && formik3.errors.content
                                                                        }
                                                                    </div>
                                                                </Form.Group>
                                            </Col>
                                            <Col md={2} className="w-full flex flex-col md:px-2">
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                    className="text-white cursor-pointer mt-2"
                                                    style={{ width: '100%', height: '44px' }}
                                                >
                                                    Gửi
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                )}
                        </div>
                        </div>
                        {
                            item && item?.childComments?.map(i => {
                                return (
                                    <div className='d-flex items-start justify-start w-100' key={i.id}>
                                        <div className='avatar overflow-hidden pr-5 ml-5'>
                                            <img src='/Images/user-icon.jpg' width={30} height={30} alt='asdasd' />
                                        </div>
                                        <div className='flex-column items-start justify-start w-100'>
                                            <h5>
                                                Khách hàng
                                            </h5>
                                            <p className="text-brow text-sm mx-2">{i?.ngayDang}</p>
                                            <div className="d-flex items-center  bg-light shadow mb-5 bg-white  rounded">
                                                <p className="text-ddv font-bold text-16">
                                                    <span className="text-16 mx-2 text-black font-normal">{i?.content}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                )
            }

        })
    }
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col xl={5}>
                            <Container className='bg-light '>
                                <Row>
                                    <Col>
                                        {
                                            capacityState &&
                                            capacityState.map((item, index) => {
                                                return (
                                                    <Button
                                                        key={index}
                                                        onClick={() => handleCapacitySelection(item?.id)}
                                                        variant="outline-secondary secondary"
                                                        className={`ml-0 mr-2 mt-1 mb-1 ${activeButtonCapacity === item?.id ? 'border-primary border-primary-3' : ''}`}
                                                    >
                                                        {item.totalCapacity}GB
                                                    </Button>
                                                );
                                            })
                                        }
                                    </Col>
                                </Row>
                                <Row className='mt-1'>
                                    <Col>
                                        {
                                            colorState && colorState?.map((item, index) => {
                                                return (
                                                    <Button
                                                        key={index}
                                                        onClick={() => handleColorSelection(item?.id)}
                                                        className={`ml-0 mr-2 mt-1 mb-1 ${activeButtonColor === item?.id ? 'border-primary border-primary-3' : ''}`}
                                                        variant="outline-secondary secondary"
                                                    >
                                                        {item.colorName}
                                                    </Button>

                                                )
                                            })
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={12} md={12} sm={12}>
                                        <h5>Giá</h5>
                                        <p className='h4 detail-price text-danger font-weight-bold amount'>{formatNumber(productState?.price)}</p>
                                    </Col>
                                    <Col xl={12} md={12} sm={12}>
                                        <div className='detail-boder p-2'>
                                            <h6>Khuyến mãi</h6>
                                            <div className='detail-boder'>
                                                <ul >
                                                    {
                                                        couponState && couponState?.map((item, index) => {
                                                            return (
                                                                <li>{item.title} </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                            <div className='w-100'>
                                                <div>
                                                    <Button onClick={(e) => addCart()} variant="danger" className='w-100' >MUA NGAY</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                </Row>
                            </Container>
                            <Container className=' bg-light '>
                                <Row className='ml-4'>
                                    <h5>Cấu hình Điện Thoại iPhone 12 128GB</h5>
                                    <Table striped bordered>
                                        <tbody>
                                            <tr>
                                                <td>Màn hình:</td>
                                                <td>{phoneState.loaiMan} {phoneState.kichThuoc} {phoneState.doPhanGiai}</td>
                                            </tr>
                                            <tr>
                                                <td>Camera sau:</td>
                                                <td>{phoneState.cameraSau}</td>
                                            </tr>
                                            <tr>
                                                <td>Camera trước:</td>
                                                <td>{phoneState.cameraTruoc}</td>
                                            </tr>
                                            <tr>
                                                <td>Chip:</td>
                                                <td>{phoneState.cpu}</td>
                                            </tr>
                                            <tr>
                                                <td>RAM:</td>
                                                <td>{phoneState.ram} GB</td>
                                            </tr>
                                            <tr>
                                                <td>Dung lượng lưu trữ:</td>
                                                <td>{productState?.capacity?.totalCapacity} GB</td>
                                            </tr>

                                            <tr>
                                                <td>Pin, Sạc:</td>
                                                <td>{phoneState.pin}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <footer className='m-auto' style={{ width: 1200 }}>
                    <Footer />
                </footer>
            </div>


        </>
    )
}

export default PhoneDetail;