import axios from "axios"
import { base_url,config } from "../../utils/axiosConfig";

const getCoupons = async()=>{
    const response = await axios.get(`${base_url}Coupons`);
    if(response.data){
        return response.data;
    }
}

const getACoupon = async(id)=>{
    const response = await axios.get(`${base_url}Coupons/${id}`);
    if(response.data){
        return response.data;
    }
}

const createCoupon = async(CouponData)=>{
    console.log(CouponData);
    const response = await axios.post(`${base_url}Coupons`, CouponData, config);
    if(response.data){
        return response.data;
    }
}

const deleteCoupon = async(id)=>{
    const response = await axios.delete(`${base_url}Coupons/${id}`,config);
    if(response.data){
        return response.data;
    }
}

const updateCoupon = async(CouponData)=>{
    const response = await axios.put(`${base_url}Coupons/${CouponData.id}`,CouponData.couponData,config);
    if(response.data){
        return response.data;
    }
}
const couponService = {
    getCoupons,
    createCoupon,
    deleteCoupon,
    getACoupon,
    updateCoupon
};

export default couponService;