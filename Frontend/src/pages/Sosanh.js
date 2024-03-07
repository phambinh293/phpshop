import React, { useEffect, useRef, useState } from 'react'
import { Button, Container, Row, Table, Modal, Col, FormControl } from 'react-bootstrap'
import { FaPlus, FaSearch } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { GetAPhone, GetPhones } from '../features/phone/phoneSlice';
import formatNumber from '../utils/formatNumber';

const Sosanh = () => {
    const dispatch = useDispatch();
    const productState = useSelector(state => state?.phone?.phones);
    const [productList, setProductList] = useState(productState)
    const [searchTerm, setSearchTerm] = useState('');
    const searchBoxRef = useRef(null);
    
    useEffect(() => {
        dispatch(GetPhones());
    }, [dispatch]);
    
    const APhone = useSelector(state => state?.phone?.A_Phone);
    const [Phone1, setPhone1] = useState();
    const [Phone2, setPhone2] = useState();
    const handleAddPhone = (e) => {
        dispatch(GetAPhone(e))
        handleClose()
    };

    useEffect(() => {
        if (Phone1 === undefined) {
            setPhone1(APhone);
        }
        if (Phone1 !== undefined) {
            setPhone2(APhone);
        }
    }, [APhone]);
    const handleDeletePhone = (e) => {
        if (e === 1) {
            setPhone1(Phone2)
            setPhone2(undefined)
        }
        else if (e === 2)
            setPhone2(undefined)
    }
    //Hiên thị modal danh sách sp
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setProductList(productState.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        ))
    };

  
    return (
        <div>
            <Container>
                <Row className=''>
                    <h6 className='font-weight-bold text-center w-100' style={{ textTransform: 'uppercase' }}>
                        So sánh {Phone1?.name} {Phone2?.name ?('và'):('')} {Phone2?.name}
                    </h6>
                </Row>
                <Row className='d-flex justify-content-end w-100'>
                    {Phone1 ? (
                        <div className='p-3 text-center' style={{ width: '40%', marginBottom: '10px' }}>
                            <div className='d-flex justify-content-end'>
                                <TiDelete style={{ fontSize: '20px' }} onClick={() => { handleDeletePhone(1) }} />
                            </div>
                            <div className='  bg-transparent' border='1' >
                                <Link className="card-link" style={{ textDecoration: 'none', divor: 'inherit' }}>
                                    <div className='border-0 '>
                                        <img className='card-image mb-3' variant="top" src={Phone1?.fileHinh} alt='zxczxc' />
                                        <div>
                                            <div>{ Phone1?.name }</div>
                                            <p className='text-danger font-size-bold amount'>
                                                {
                                                    formatNumber(Phone1?.price)
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ):(
                    <div style={{ width: '40%', marginBottom: '10px' }} className=' p-3 text-center d-flex justify-content-center align-items-center '>
                        <Button
                            className='bg-transparent text-info p-3'
                            style={{ borderStyle: 'dashed' }}
                            onClick={handleShow}
                        >
                            <FaPlus style={{ fontSize: '30px' }} />
                            <p>Thêm sản phẩm</p>
                        </Button>
                    </div>
                    )}
                    {Phone2 ? (
                        <div className='p-3 text-center' style={{ width: '40%', marginBottom: '10px' }}>
                            <div className='d-flex justify-content-end'>
                                <TiDelete style={{ fontSize: '20px' }} onClick={() => { handleDeletePhone(2) }} />
                            </div>
                            <div className='  bg-transparent' border='1' >
                                <Link className="card-link" style={{ textDecoration: 'none', divor: 'inherit' }}>
                                    <div className='border-0 '>
                                        <img className='card-image mb-3' variant="top" src={Phone2?.fileHinh} alt='zxczxc' />
                                        <div>
                                            <div>{ Phone2?.name}</div>
                                            <p className='text-danger font-size-bold amount'>
                                                {
                                                    formatNumber(Phone2?.price)
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div style={{ width: '40%', marginBottom: '10px' }} className=' p-3 text-center d-flex justify-content-center align-items-center '>
                            <Button
                                className='bg-transparent text-info p-3'
                                style={{ borderStyle: 'dashed' }}
                                onClick={handleShow}
                            >
                                <FaPlus style={{ fontSize: '30px' }} />
                                <p>Thêm sản phẩm</p>
                            </Button>
                        </div>
                    )}
                    
                    
                </Row>

                <Row>
                    <h4 className='text-uppercase'>Thông tin cơ bản</h4>
                </Row>
                <Row className='w-100'>
                    <Table striped bordered>
                        <tbody>
                            <tr>
                                <td style={{ width: '20%' }}>Màn hình:</td>
                                <td style={{ width: '40%' }}>{Phone1?.loaiMan} {Phone1?.kichThuoc} {Phone1?.loaiMan}</td>
                                <td style={{ width: '40%' }}>{Phone2?.loaiMan} {Phone2?.kichThuoc} {Phone2?.loaiMan}</td>
                            </tr>
                            <tr>
                                <td style={{ width: '20%' }}>Camera sau:</td>
                                <td style={{ width: '40%' }}>{Phone1?.cameraSau}</td>
                                <td style={{ width: '40%' }}>{Phone2?.cameraSau}</td>
                            </tr>
                            <tr>
                                <td style={{ width: '20%' }}>Camera trước:</td>
                                <td style={{ width: '40%' }}>{Phone1?.cameraTruoc}</td>
                                <td style={{ width: '40%' }}>{Phone2?.cameraTruoc}</td>
                            </tr>
                            <tr>
                                <td style={{ width: '20%' }}>Chip:</td>
                                <td style={{ width: '40%' }}>{Phone1?.cpu}</td>
                                <td style={{ width: '40%' }}>{Phone2?.cpu}</td>
                            </tr>
                            <tr>
                                <td style={{ width: '20%' }}>RAM:</td>
                                <td style={{ width: '40%' }}>{Phone1?.ram}</td>
                                <td style={{ width: '40%' }}>{Phone2?.ram}</td>
                            </tr>
                            <tr>
                                <td style={{ width: '20%' }}>Dung lượng lưu trữ:</td>
                                <td style={{ width: '40%' }}>{Phone1?.rom}</td>
                                <td style={{ width: '40%' }}>{Phone2?.rom}</td>
                            </tr>

                            <tr>
                                <td style={{ width: '20%' }}>Pin, Sạc:</td>
                                <td style={{ width: '40%' }}>{Phone1?.pin}</td>
                                <td style={{ width: '40%' }}>{Phone2?.pin}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>
            <Modal
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                size='xl'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tìm sản phẩm để so sánh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container style={{ height: '75vh', overflow: 'scroll' }}>
                        <Row>
                            <div className="searchBox w-100 mr-3" ref={searchBoxRef}>
                                <div className="d-flex ml-2 mr-2 w-25 mb-2" role="search">
                                    <div className="d-flex bg-light" style={{ width: '100%' }}>
                                        <FaSearch className='mt-1 mr-2' style={{ fontSize: '28px' }} />
                                        <FormControl
                                            id="text-search"
                                            type="search"
                                            placeholder="Bạn tìm gì"
                                            aria-label="Bạn tìm gì"
                                            value={searchTerm}
                                            onChange={handleSearch}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Row>
                        <Row>
                            {
                                productState && productList?.map((item, index) => {
                                    return (
                                        <Col xl={3} md={4} sm={6} className='' key={index}>
                                            <div to={`/dtdd/${item.productId}`} className="card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <div className='p-3'>
                                                    <img className='card-image' width={"100%"} src={item?.fileHinh} alt={item.name} />
                                                    <div className='mt-4'>
                                                        <p className='text-title'>{item.name}</p>
                                                        <div>
                                                            <p className='text-price  font-size-bold amount' >
                                                                {formatNumber(item.price)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Button className='w-100' onClick={() =>{ handleAddPhone(item.id)}}>
                                                        <FaPlus/> So sánh ngay
                                                    </Button>
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })

                            }
                        </Row>
                    </Container>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default Sosanh
