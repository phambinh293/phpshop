import { FaRegUser } from "react-icons/fa";
import { GoMoveToTop } from "react-icons/go";
import { BsCartCheck } from "react-icons/bs";
import React, { useEffect, useRef, useState } from 'react'
import { Navbar, Nav, FormControl } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import formatNumber from "../utils/formatNumber";

const Mainlayout = () => {
    const [showGoToTop, setShowGoToTop] = useState(false)
    const userDto = useSelector(state => state.auth.user);
    const [searchTerm, setSearchTerm] = useState('');
    const productList = useSelector((state) => state?.phone?.phones);
    const [showSearchResult, setShowSearchResult] = useState(false);
    const searchBoxRef = useRef(null);
    const handleClickToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    useEffect(() => {
        const handleScroll = () => {
            setShowGoToTop(window.scrollY >= 200)
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [location]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setShowSearchResult(true);
    };

    const filteredProducts = searchTerm
        ? productList.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];
    const handleClickProduct = () => {
        setShowSearchResult(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
                setShowSearchResult(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (

        <>
            <div className='m-auto background-primary p-3' >
                <header className="m-auto w-navbar">
                    <Navbar expand="lg" className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand>
                                <div className="background-primary w-25">
                                    <Link to="/" className="btn" style={{ fontSize: '28px' }}>
                                        <img src='/logo_no_bachground.png' width={50} alt="Logo" />
                                        <span className="">PHBshop</span>
                                    </Link>
                                </div>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <div className="searchBox w-100 mr-3" ref={searchBoxRef}>
                                    <div className="d-flex ml-2 mr-2 w-100 mb-2" role="search">
                                        <div className="d-flex bg-light" style={{ width: '100%' }}>
                                            <FormControl
                                                id="text-search"
                                                type="search"
                                                placeholder="Bạn tìm gì"
                                                aria-label="Bạn tìm gì"
                                                value={searchTerm}
                                                onChange={handleSearch}
                                                onFocus={() => setShowSearchResult(true)}
                                            />
                                        </div>
                                    </div>
                                    {showSearchResult && (
                                        <div className="searchResult">
                                            {filteredProducts.map((product) => (
                                                <Link
                                                    to={`/dtdd/${product?.id}`}
                                                    key={product.id}
                                                    className="card card-body"
                                                    onClick={handleClickProduct}
                                                >
                                                    <div className="d-flex">
                                                        <img
                                                            src={product.fileHinh}
                                                            width={'60px'}
                                                            height={'60px'}
                                                            alt={product.name}
                                                        />
                                                        <div className="ml-2">
                                                            <h5>{product.name}</h5>
                                                            <p className="text-danger amount">
                                                                {formatNumber(product.price)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Navbar.Collapse>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    {!userDto ? (
                                        <Link to='/login'  className="btn button-primary ml-2 mr-2 mb-2" >Tài khoản và đơn hàng</Link>

                                    ) : (
                                        <Link to='/user'  className="btn button-primary ml-2 mr-2 mb-2" >Tài khoản và đơn hàng</Link>
                                    )}

                                    <Link to="/cart" className="btn button-primary ml-2 mr-2 mb-2"><BsCartCheck /> Giỏ hàng</Link>

                                    {!userDto ? (
                                        <Link to="/login" className="btn button-primary ml-2 mr-2 mb-2">
                                            <FaRegUser /> Đăng Nhập
                                        </Link>
                                    ) : (
                                        <></>
                                    )}

                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Container className="p-0 m-0 ml-3" >
                        <Row className="d-flex justify-content-start">
                            <Link to={'/dienthoai/1'} className="btn mr-3">Hỗ trợ 5G</Link>
                            <Link to={'/dienthoai/2'} className="btn mr-3">Kháng bui, nước</Link>
                            <Link to={'/dienthoai/3'} className="btn mr-3">Sạc không dây</Link>
                            <Link to={'/dienthoai/4'} className="btn mr-3">Sạc nhanh</Link>
                        </Row>
                    </Container>
                </header>
            </div>
            <div className='m-auto' style={{ width: 1200 }}>
                <main className="mt-5 mb-5">
                    <Outlet />
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </main>


            </div>
            {showGoToTop && (
                <button
                    onClick={handleClickToTop}
                    style={{
                        position: 'fixed',
                        right: 20,
                        bottom: 20
                    }}>
                    <GoMoveToTop />
                </button>
            )}

        </>
    )
}

export default Mainlayout
