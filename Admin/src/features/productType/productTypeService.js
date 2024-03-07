import axios from "axios"
import { base_url,config } from "../../utils/axiosConfig";

const getProductTypes = async()=>{
    const response = await axios.get(`${base_url}ProductTypes`);
    if(response.data){
        return response.data;
    }
}

const getAProductType = async(id)=>{
    const response = await axios.get(`${base_url}ProductTypes/${id}`);
    if(response.data){
        return response.data;
    }
}

const createProductType = async(productTypeData)=>{
    const response = await axios.post(`${base_url}ProductTypes`, productTypeData, config);
    if(response.data){
        return response.data;
    }
}

const deleteProductType = async(id)=>{
    const response = await axios.delete(`${base_url}ProductTypes/${id}`,config);
    if(response.data){
        return response.data;
    }
}

const updateProductType = async(productTypeData)=>{
    const response = await axios.put(`${base_url}ProductTypes/${productTypeData.id}`,productTypeData.productTypeData,config);
    if(response.data){
        return response.data;
    }
}
const productTypeService = {
    getProductTypes,
    getAProductType,
    createProductType,
    deleteProductType,
    updateProductType
};

export default productTypeService;