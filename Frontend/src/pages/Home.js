import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Nav, Row } from 'react-bootstrap';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { GetProductsByBrand } from '../features/products/productSlice';
import { Helmet } from 'react-helmet';
import SliderShow from '../Components/SliderShow';
import { GetPhones } from '../features/phone/phoneSlice';
import { getBrand } from '../features/brand/brandSlice';
//Icon
import { FaCaretDown } from "react-icons/fa";
import formatNumber from '../utils/formatNumber';

function Home() {
    const dispatch = useDispatch();
    const productState = useSelector(state => state?.phone?.phones);
    const brandState = useSelector(state => state?.brand?.product);
    const [isProductStateReady, setIsProductStateReady] = useState(false);
    const [products, setProducts] = useState([]);
    const productbrand = useSelector(state => state?.product?.productbrand);
    const [isLoading, setIsLoading] = useState(true);
    const [visibleProducts, setVisibleProducts] = useState(20); // Số lượng sản phẩm được hiển thị ban đầu
    const [sortOrder, setSortOrder] = useState("asc");
    useEffect(() => {
        dispatch(GetPhones());
        dispatch(getBrand())
            .then(() => setIsLoading(false))
            .catch(() => 'error');
        setIsProductStateReady(true);
    }, [dispatch]);

    useEffect(() => {
        setProducts(productState)
    }, [productState])

    useEffect(() => {
        setProducts(productbrand)
    }, [productbrand])

    const handleClickBrand = (id) => {
        if (id > 0) {
            dispatch(GetProductsByBrand(id));
        }
        else {
            setProducts(productState)
        }
    }
    if (isLoading) {
        return <div className='w-100 d-flex justify-content-center' style={{ height: '300px' }}>
            <div className="spinner"></div>
        </div>;
    }
    if (!productState) {
        return <div>Sản phẩm không khả dụng.</div>;
    }

    //Xem thêm Panigation
    const productsPerPage = 20;
    const handleLoadMore = () => {
        setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + productsPerPage);
    };
    const remainingProducts = products?.length - visibleProducts;

    const sortProducts = (value) => {
        if (value === "asc") {
            const tuThapDenCao = productState.filter(item => item?.products[0]?.price).sort((a, b) => a.products[0].price - b.products[0].price);
            setProducts(tuThapDenCao)
        } else if (value === "desc") {
            const tuCaoDenThap = productState.filter(item => item?.products[0]?.price).sort((a, b) => b.products[0].price - a.products[0].price);
            setProducts(tuCaoDenThap)
        }
    };
    
    return (
        <>
            <Helmet>
                <title>PHBshop - Điện thoại chính hãng</title>
            </Helmet>
            <div>
                <SliderShow />
            </div>
            <div>
                <p className='h5 font-weight-bold mt-5 mb-5'>ĐIỆN THOẠI NỔI BẬT</p>
                <Container className="d-flex justify-content-end align-items-center">
                    <Nav.Link onClick={handleClickBrand} href="" className="rounded-pill border button-primary mr-2">
                        Tất cả
                    </Nav.Link>
                    {brandState &&
                        brandState.map((item, index) => {
                            const handleClick = () => {
                                handleClickBrand(item.id);
                            };

                            return (
                                <Nav.Link
                                    onClick={handleClick}
                                    key={index}
                                    href=""
                                    className="rounded-pill border button-primary mr-2"
                                >
                                    {item.title}
                                </Nav.Link>
                            );
                        })}
                    <div className="ml-auto">
                        <select
                            value={sortOrder}
                            onChange={(e) => {
                                setSortOrder(e.target.value);
                                sortProducts(e.target.value);
                            }}
                            className='border p-1'
                        >
                            <option value="asc">Sắp xếp theo: Giá thấp đến cao</option>
                            <option value="desc">Sắp xếp theo: Giá cao đến thấp</option>
                        </select>
                    </div>
                </Container>
                <Container className='mt-3'>
                    <Row>
                        {isProductStateReady ? (
                            products && products.slice(0, visibleProducts).map((item, index) => {
                                return (
                                    <div className=' w-item' key={index}>
                                        <Link to={`/dtdd/${item?.id}`} className="card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div className='p-3'>
                                                <img className='card-image' width={"100%"} src={item?.fileHinh} alt='iphone15promax' />
                                                <div className='mt-4'>
                                                    <p className='text-title'>{item?.name}</p>
                                                    <div>
                                                        <div className='text-info'>
                                                            <i className='btn'> {item?.kichThuoc} inches</i>
                                                            <i className='btn'> {item?.ram} GB</i>
                                                            <i className='btn'> {item?.rom} GB</i>
                                                            <i className='btn'> {item?.cpu}</i>
                                                        </div>
                                                        <p className='text-price  font-size-bold amount' >
                                                            {formatNumber((item?.products[0]?.price))}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        ) : (
                            <div className='w-100 d-flex justify-content-center' style={{ height: '300px' }}>
                                <div className="spinner"></div>
                            </div>
                        )}
                    </Row>
                    {visibleProducts < products?.length && (
                        <div className="text-center mt-3">
                            <Button variant="primary" style={{ width: '30%' }} onClick={handleLoadMore}>
                                Xem thêm {remainingProducts} Điện thoại <FaCaretDown />
                            </Button>
                        </div>
                    )}
                </Container>

            </div>

            <footer className='m-auto' style={{ width: 1200 }}>
                <Footer />
            </footer>
        </>
    );

}

export default Home;