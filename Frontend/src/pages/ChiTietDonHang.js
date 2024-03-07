import React, { useEffect } from 'react'
import { Button, Col, Container, Image, InputGroup, Row } from 'react-bootstrap'
import { FaMapMarkedAlt } from "react-icons/fa";
import { PiSealWarningFill } from "react-icons/pi";
import { IoBagOutline } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { GetAInvoice } from '../features/invoice/invoiceSlice';
import formatNumber from '../utils/formatNumber';
import formatDate from '../utils/formatDate';
const ChiTietDonHang = () => {
    const invoiceState = useSelector(state => state?.invoice?.detail_invoice);
    const invoiceId = useParams().invoiceId;
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetAInvoice(invoiceId))
    }, [])

    return (
        <div>
            <Helmet>
                <title>Chi tiết đơn hàng</title>
            </Helmet>
            <Container>
                <Row className='d-flex justify-content-between'>
                    <Col xl={7}>
                        <h6>
                            Chi tiết đơn hàng #{invoiceState?.id}
                            <span className='ml-2'>-</span>
                            <span className=' ml-2 text-success'>{invoiceState?.orderStatus}</span>
                        </h6>
                        <div className='mt-5 bg-transparent shadow p-3 mb-5 rounded ' style={{ height: '220px' }}>
                            <p><FaMapMarkedAlt />THÔNG TIN NHẬN HÀNG</p>
                            <div className='d-flex'>
                                <p style={{ width: "100px" }}>Người nhận:</p>
                                <p style={{ width: "300px" }}>{invoiceState?.user?.name} - 0329155867</p>
                            </div>
                            <div className='d-flex'>
                                <p style={{ width: "100px" }}>Địa chỉ nhận:</p>
                                <p style={{ width: "300px" }}>{invoiceState?.shippingInfo}</p>
                            </div>

                        </div>
                    </Col>
                    <Col xl={5} className=''>
                        <h6>Đặt lúc: {formatDate(invoiceState?.issueDate)}</h6>
                        <div className='mt-5 bg-transparent shadow p-3 mb-5 rounded ' style={{ height: '220px' }}>
                            <p><FaMapMarkedAlt />HÌNH THỨC THANH TOÁN</p>
                            <p className='text-warning'>{invoiceState?.paid?"Thanh toán Online":"Thanh toán Trực tiếp"}</p>
                        </div>
                    </Col>
                </Row>
                <Row className=''>
                    <div className='mt-5 bg-transparent shadow p-3  mb-5 rounded w-100'>
                        <h6><IoBagOutline className='h4' />THÔNG TIN SẢN PHẨM</h6>
                        <Container>
                            {
                                invoiceState?.invoiceDetails.map((item, index) => {
                                    return (
                                        <Row key={index} className=' pb-2 mb-4  border-bottom border-info'>
                                            <Col xl={2} md={2} sm={2} className='p-2'>
                                                <Image src={item?.product?.phone?.fileHinh} width={'100%'} />
                                            </Col>
                                            <Col xl={5} md={5} sm={5}>
                                                <h5>{item?.product?.phone?.name}</h5>
                                                <span>Màu {item?.product?.color?.colorName}</span>
                                            </Col>
                                            <Col xl={3} md={3} sm={3} className='text-right'>
                                                <p className='text-danger amount'>Đơn giá: { formatNumber( item?.product?.price)}</p>
                                                <p className='text-danger'>Số lượng: { item?.quantity}</p>
                                            </Col>

                                        </Row>
                                    )
                                })

                            }
                            <Row>
                                <Col className='text-right h5'>
                                    <div className='d-flex justify-content-end'>
                                        <p className='text-left font-weight-bold' style={{ width: "150px" }}>Tổng tiền</p>
                                        <p style={{ width: "200px" }} className='text-danger font-weight-bold amount'>{formatNumber(invoiceState?.totalPrice)} </p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='justify-content-center mt-5'>
                                <Link to="/user" className='btn border-warning text-dark p-3 rounded btn-hover font-weight-bold'>VỀ TRANG DANH SÁCH ĐƠN HÀNG</Link>
                            </Row>
                        </Container>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default ChiTietDonHang
