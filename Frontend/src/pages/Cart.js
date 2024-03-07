import React, { useEffect, useState } from 'react'
import { Button, Col, Container, FormControl, Image, InputGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { BsCartXFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteCart, GetCart, UpdateCart, resetState } from '../features/cart/cartSlice';
import formatNumber from '../utils/formatNumber';
const Cart = () => {
    const dispatch = useDispatch()
    const userState = useSelector(state => state?.auth?.user?.userDto)
    const cartState = useSelector(state => state?.cart?.carts)
    const [productUpdateDetails, setProductUpdateDetails] = useState(null);
    const [sum, setSum] = useState();

    useEffect(() => {
        dispatch(GetCart(userState?.id))
    }, [])

    useEffect(()=>{
        if(productUpdateDetails!==null){
            dispatch(UpdateCart({id: productUpdateDetails?.id,userId: productUpdateDetails?.userId,productId: productUpdateDetails?.productId, quantity: productUpdateDetails?.quantity}))
            setTimeout(() => {
                dispatch(GetCart(userState?.id))
            }, 300);
        }
    },[productUpdateDetails])

    useEffect(() => {
        let dem = 0
        for (let i = 0; i < cartState.length; i++) {
            dem += cartState[i]?.quantity * cartState[i]?.product?.price;
        }
        setSum(dem)
    }, [cartState])

    const deleteAProductCart = (e) => {
        dispatch(DeleteCart(e))
        setTimeout(() => {
            dispatch(GetCart(userState?.id))
        }, 300)
    }
    return (
        <>
            <Helmet>
                <title>Giỏ hàng | PHBshop</title>
            </Helmet>
            {/* Cart rỗng */}
            {
                cartState.length <= 0 && (
                    <div className='text-center p-5' style={{ display: "block" }}>
                        <div className='icon-cart'><BsCartXFill /></div>
                        <p>Không có sản phẩm nào trong giỏ hàng</p>
                        <Link to="/" className='btn btn-outline-primary w-50 bg-light text-primary bold'>Về trang chủ</Link>
                    </div>
                )
            }
            {/* Có sản phẩm */}
            {
                cartState.length > 0 && (
                    <div className='d-flex justify-content-center w-75 m-auto py-5'>
                        <Container>
                            {
                                cartState.map((item, index) => {
                                    return (
                                        <Row key={index} className=' pb-2 mb-4  border-bottom border-info'>
                                            <Col xl={4} md={4} sm={4} className='p-2'>
                                                <Image src={item?.product?.phone?.fileHinh} width={'100px'} height={'100px'} />
                                            </Col>
                                            <Col xl={5} md={5} sm={5}>
                                                <h5>{item?.product?.phone?.name}</h5>
                                                <span>Màu: {item?.product?.color?.colorName}</span>
                                                <p>Bộ nhớ: {item?.product?.capacity?.totalCapacity} GB</p>
                                                <p className='text-danger amount'>{formatNumber(item?.product?.price)}</p>

                                            </Col>
                                            <Col xl={3} md={3} sm={3} className='text-right d-flex flex-column'>
                                                <MdDeleteForever
                                                    onClick={() => deleteAProductCart(item?.id)}
                                                    style={{ fontSize: '30px' }}
                                                    className='mb-4 ml-auto'
                                                />
                                                <InputGroup className='w-50 ml-auto'>
                                                    <FormControl
                                                        type="number"
                                                        value={item?.quantity}
                                                        onChange={(e) => setProductUpdateDetails({ id: item?.id, userId: item?.userId, productId: item?.productId, quantity: e.target.value })}
                                                        min={1}
                                                    />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                    )
                                })
                            }


                            <Row className='pb-2 mb-4  border-bottom border-info'>
                                <Col className='text-left'>
                                    Tạm tính ({cartState.length} sản phẩm)
                                </Col>
                                <Col className='text-right text-danger amount'>
                                    {formatNumber( sum)}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Link to="/cart/thanh-toan" className='w-100 p-2 btn btn-secondary'>ĐẶT HÀNG</Link>
                                </Col>
                            </Row>

                        </Container>
                    </div>
                )
            }
        </>
    )
}

export default Cart
