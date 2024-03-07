import axios from 'axios'
import { base_url, config } from '../../utils/axiosConfigure';

const checkCoupon = async (checkData) => {
    const response = await axios.post(`${base_url}Coupons/CheckCoupon`, checkData, config)
    if (response.data) {
        return response.data;
    }
}
const GetCoupon = async () => {
    const response = await axios.get(`${base_url}Coupons/GetCouponsActive`)
    if (response.data) {
        return response.data;
    }
}

const couponService = {
    checkCoupon,
    GetCoupon
}

export default couponService
