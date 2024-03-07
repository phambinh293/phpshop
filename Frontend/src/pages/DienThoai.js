import React, { useEffect, useState } from 'react'
import { Breadcrumb, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { GetProductsByProductType } from '../features/products/productSlice';
import formatNumber from '../utils/formatNumber';
const DienThoai = () => {
    const dispatch = useDispatch();
    const productState = useSelector(state => state?.product?.productforType);
    const productTypeId = useParams().productTypeId;
    const [isProductStateReady, setIsProductStateReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(GetProductsByProductType(productTypeId))
            .then(() => setIsLoading(false))
            .catch(() => 'error');
        setIsProductStateReady(true);
    }, [dispatch, productTypeId]);



    if (isLoading) {
        return <div className='w-100 d-flex justify-content-center' style={{ height: '300px' }}>
            <div className="spinner"></div>
        </div>;
    }
    if (!productState) {
        return <div>Sản phẩm không khả dụng.</div>;
    }

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active className='text-danger'>Điện thoại</Breadcrumb.Item>
                <Breadcrumb.Item active className='text-danger'>{productState[0].productType.title}</Breadcrumb.Item>
            </Breadcrumb>
            <Container className='mt-3'>
                <Row>
                    {isProductStateReady ? (
                        productState && productState?.map((item, index) => {
                            return (
                                <div className=' w-item' key={index} >
                                    <Link to={`/dtdd/${item?.phoneId}`} className="card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div className='p-3'>
                                            <img className='card-image' width={"100%"} src={item?.phone.fileHinh} alt='iphone15promax' />
                                            <div className='mt-4'>
                                                <p className='text-title'>{item?.phone.name}</p>
                                                <div>
                                                    <div className='text-info'>
                                                        <i className='btn'> {item?.phone.kichThuoc} inches</i>
                                                        <i className='btn'> {item?.phone.ram} GB</i>
                                                        <i className='btn'> {item?.phone.rom} GB</i>
                                                        <i className='btn'> {item?.phone.cpu}</i>
                                                    </div>
                                                    <p className='text-price  font-size-bold amount' >
                                                        {formatNumber((item?.phone?.products[0]?.price))}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    ) : (<div className='w-100 d-flex justify-content-center' style={{ height: '300px' }}>
                        <div className="spinner"></div>
                    </div>
                    )}
                </Row>
                {/* <Row>
                    <Button variant='border border-dark light w-25 m-auto'>Xem thêm</Button>
                </Row> */}
            </Container>
        </div>
    );
}

export default DienThoai;