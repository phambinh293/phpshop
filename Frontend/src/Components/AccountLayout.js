import React, { } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { RiProfileFill } from "react-icons/ri"
import { FaClipboardList } from "react-icons/fa"
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../features/users/userSlice';

const AccountLayout = () => {
    const authState = useSelector(state => state?.auth?.user?.userDto);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/');
    };

    return (
        <div>
            <Container>
                <Row className='justify-content-between'>
                    <Col xl={3} className=''>
                        <h6>Anh/Chị <strong>{authState?.name}</strong></h6>
                        <div className='text-left'>
                            <Link to="/user" variant='light' className='w-100 text-left btn mb-2'>
                                <FaClipboardList className='mr-2 h4 text-success' />
                                Đơn hàng đã mua
                            </Link>

                            <Link to="/user/san-pham-yeu-thich" variant='light' className='w-100 text-left btn mb-2'>
                                <FaHeart className='mr-2 h4 text-danger' />Sản phẩm yêu thích
                            </Link>
                            <Link to="/user/thong-tin-tai-khoan" variant='light' className='w-100 text-left btn mb-2'>
                                <RiProfileFill className='mr-2 h4 text-info' />Thông tin và số địa chỉ
                            </Link>
                            <Link to="/user/doi-mat-khau" variant='light' className='w-100 text-left btn mb-2'>
                                <RiProfileFill className='mr-2 h4 text-info' />Đổi mật khảu
                            </Link>
                        </div>
                        <Button variant='light' className='w-100  border border-danger' onClick={handleLogout}>
                            Đăng xuất
                        </Button>
                    </Col>
                    <Col xl={9} className='p-0'>
                        <Outlet />
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default AccountLayout
