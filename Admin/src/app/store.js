import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import brandReducer from '../features/brand/brandSlice';
import colorReducer from '../features/color/colorSlice';
import invoiceReducer from '../features/invoice/invoiceSlice';
import couponReducer from '../features/coupon/couponSlice';
import productReducer from '../features/product/productSlice';
import productTypeReducer from '../features/productType/productTypeSlice';
import phoneReducer from '../features/phone/phoneSlice';
import productTypeDetailReducer from '../features/productTypeDetail/productTypeDetailSlice';
import capacityReducer from '../features/capacity/capacitySlice';
import uploadReducer from '../features/uploadImage/uploadSlice';
import commentReducer from '../features/comment/commentSlice';
import slideshowReducer from '../features/slideshow/slideshowSlice';
import ratingReducer from '../features/rating/ratingSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        brand: brandReducer,
        color: colorReducer,
        invoice: invoiceReducer,
        coupon: couponReducer,
        product: productReducer,
        productType: productTypeReducer,
        phone: phoneReducer,
        productTypeDetail: productTypeDetailReducer,
        capacity: capacityReducer,
        upload: uploadReducer,
        comment: commentReducer,
        slideshow: slideshowReducer,
        rating: ratingReducer,
    }
})