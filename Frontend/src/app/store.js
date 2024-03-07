import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/users/userSlice";
import slideshowReducer from '../features/slideshow/slideshowSlice';
import productReducer from "../features/products/productSlice";
import wishlistReducer from "../features/wishlists/wishlistSlice"
import phoneReducer from '../features/phone/phoneSlice';
import capacityReducer from '../features/capacity/capacitySlice';
import colorReducer from '../features/color/colorSlice';
import brandReducer from '../features/brand/brandSlice';
import cartReducer from '../features/cart/cartSlice';
import commentReducer from '../features/comment/commentSlice';
import ratingReducer from '../features/rating/ratingSlice';
import invoiceReducer from '../features/invoice/invoiceSlice';
import couponReducer from '../features/coupon/couponSlice';
import paymentReducer from '../features/payment/paymentSlice';

export const store = configureStore({
    reducer: {
        auth:authReducer,
        slideshow: slideshowReducer,
        product: productReducer,
        wishlist: wishlistReducer,
        phone: phoneReducer,
        capacity: capacityReducer,
        color: colorReducer,
        brand: brandReducer,
        cart: cartReducer,
        comment: commentReducer,
        rating: ratingReducer,
        invoice: invoiceReducer,
        coupon: couponReducer,
        payment: paymentReducer
    }
})