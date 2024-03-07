import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getWishlist } from '../features/wishlists/wishlistSlice';
import formatNumber from '../utils/formatNumber'
const DanhSachYeuThich = () => {
    const authState = useSelector(state => state?.auth?.user?.userDto);
    const dispatch = useDispatch();
    // const wishlistState = useSelector(state => state?.auth?.wishlist);
    const wishlistState = useSelector(state => state?.wishlist?.wishlist);
    useEffect(() => {
        dispatch(getWishlist(authState.id));
    }, [dispatch, authState.id]);

    return (
        <>
            <Helmet>
                <title>Danh sách yêu thích | PHBshop</title>
            </Helmet>
            <div>
                <h6>Sản phẩm yêu thích</h6>
                <Container className='mt-3'>
                    <Row>

                        {
                            wishlistState && wishlistState?.map((item, index) => {
                                return (
                                    <div className='col-xl-3 col-md-4 col-sm-5' key={index}>
                                        <Link to={`/dtdd/${item.productId}`} className="card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div className='p-3'>
                                                <img className='card-image' width={"100%"} src={item.phone.fileHinh} alt='iphone15promax' />
                                                <div className='mt-4'>
                                                    <p className='text-title'>{ item.phone.name}</p>
                                                    <div>
                                                        <p className='text-price  font-size-bold amount' >
                                                            {formatNumber(item.phone.price)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                        



                    </Row>
                </Container>
            </div>
        </>
    )
}

export default DanhSachYeuThich
