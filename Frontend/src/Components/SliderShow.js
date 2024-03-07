import Carousel from 'react-bootstrap/Carousel';
import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { getAllSlideshow } from '../features/slideshow/slideshowSlice';

function SliderShow() {
    const dispatch = useDispatch()
    const slideshowState = useSelector(state => state?.slideshow?.slideshows)
    useEffect(()=>{
        dispatch(getAllSlideshow())
    },[])
    return (
        <Carousel data-bs-theme="dark">
            {
                slideshowState && slideshowState?.map((item,index) => {
                    return (
                        <Carousel.Item key={index}>
                        <img
                            className="d-block w-100 img-fluid"
                            src= {item?.url}
                            alt="Slide"
                            style={{ height: '400px' }}
                        />
                    </Carousel.Item>
                    )
                })
            }
            
        </Carousel>
    );
}

export default SliderShow;