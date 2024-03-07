import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { useDispatch, useSelector } from 'react-redux'
import { GetAProduct } from '../features/product/productSlice';
import { useParams } from 'react-router-dom';
const ProductDetail = () => {
    const dispatch = useDispatch();
    const productState = useSelector(state => state?.product?.product);
    const productId = useParams().id;

    useEffect(() => {
        dispatch(GetAProduct(productId))
            .catch(() => 'error');
    }, [dispatch, productId]);

    if (!productState) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Product Detail</h1>
            <Container>
                <Row>
                    <Col className='d-flex justify-content-between' >
                        <div className="product-image w-50">
                            <img src={productState.fileHinh} alt='ád' width={300} height={300}  />
                        </div>
                        <div className='w-50'>
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
                                className="mySwiper "
                            >
                                <SwiperSlide>
                                    <img className='w-100' src='/img/1/1.jpg' alt='zxc' />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img className='w-100' src='/img/1/2.jpg' alt='zxc' />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img className='w-100' src='/img/1/3.jpg' alt='zxc' />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img className='w-100' src='/img/1/4.jpg' alt='zxc' />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img className='w-100' src='/img/1/5.jpg' alt='zxc' />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img className='w-100' src='/img/1/6.jpg' alt='zxc' />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img className='w-100' src='/img/1/7.jpg' alt='zxc' />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img className='w-100' src='/img/1/8.jpg' alt='zxc' />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img className='w-100' src='/img/1/9.jpg' alt='zxc' />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='bg-transparent shadow   mb-5 rounded' style={{padding:'3rem '}}>
                            <table className="table table-bordered product-info" >
                                    <h4>Product Info</h4>
                                <tr >
                                    <td>Tên:</td>
                                    <td>{ productState?.phone.name}</td>
                                </tr>
                                <tr >
                                    <td>Giá:</td>
                                    <td>{ productState?.price}</td>
                                </tr>
                                <tr >
                                    <td>Số lượng tồn:</td>
                                    <td>{ productState?.quantity}</td>
                                </tr>
                                
                                <tr >
                                    <td>Số lượt đánh giá:</td>
                                    <td>{ productState?.averageRating}</td>
                                </tr>
                                <tr >
                                    <td>Số sản phẩm đã bán:</td>
                                    <td>{ productState?.soldQuantity}</td>
                                </tr>
                                <tr >
                                    <td>Trạng thái:</td>
                                        {
                                            ( productState?.status) ? (
                                                <td className='h6 text-success '>Hoạt động</td>
                                            ): (
                                                <td className='h6 text-danger' >Ngưng hoạt động</td>
                                            )
                                        }

                                </tr>

                            </table>
                            <div className='d-flex justify-content-between'>
                                <p className='btn btn-warning'>Edit</p>
                                <p className='btn btn-danger'>Delete</p>
                            </div>
                        </div>

                    </Col>
                    <Col>
                        <div>

                            <div className=' bg-transparent shadow p-4 mb-5 rounded'>
                                <h5>Product Details</h5>
                                <table className="table table-bordered product-info">
                                    <tr >
                                        <td>Màn hình:</td>
                                        <td>{ productState?.phone.loaiMan}    ,{ productState?.phone.kichThuoc}    ,{ productState?.phone.doPhanGiai }</td>
                                    </tr>

                                    <tr >
                                        <td>Camera sau:</td>
                                        <td>{ productState?.phone.cameraSau}</td>
                                    </tr>
                                    <tr >
                                        <td>Camera trước:</td>
                                        <td>{ productState?.phone.cameraTruoc}</td>
                                    </tr>
                                    <tr >
                                        <td>Chip:</td>
                                        <td>{ productState?.phone.cpu}</td>
                                    </tr>
                                    <tr >
                                        <td>RAM:</td>
                                        <td>{ productState?.phone.ram}GB</td>
                                    </tr>
                                    <tr >
                                        <td>Dung lượng lưu trữ:</td>
                                        <td>{ productState?.phone.rom}GB</td>
                                    </tr>
                                    <tr >
                                        <td>Pin, Sạc:</td>
                                        <td>{ productState?.phone.pin}</td>
                                    </tr>
                                </table>
                                <div>
                                    <h6>Mô tả:</h6>
                                    <p>{ productState?.phone.desc}</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProductDetail
