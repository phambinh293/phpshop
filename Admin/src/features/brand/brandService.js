import axios from "axios"
import { base_url,config } from "../../utils/axiosConfig";

const getBrands = async()=>{
    const response = await axios.get(`${base_url}Brands`);
    if(response.data){
        return response.data;
    }
}

const getBrandsShow = async()=>{
    const response = await axios.get(`${base_url}Brands/Show`);
    if(response.data){
        return response.data;
    }
}

const getABrand = async(id)=>{
    const response = await axios.get(`${base_url}Brands/${id}`);
    if(response.data){
        return response.data;
    }
}

const createBrand = async(BrandData)=>{
    const response = await axios.post(`${base_url}Brands`, BrandData, config);
    if(response.data){
        return response.data;
    }
}

const deleteBrand = async(id)=>{
    const response = await axios.delete(`${base_url}Brands/${id}`,config);
    if(response.data){
        return response.data;
    }
}

const updateBrand = async(BrandData)=>{
    const response = await axios.put(`${base_url}Brands/${BrandData.id}`,BrandData.brandData,config);
    if(response.data){
        return response.data;
    }
}
const brandService = {
    getBrands,
    getABrand,
    createBrand,
    deleteBrand,
    updateBrand,
    getBrandsShow,
};

export default brandService;