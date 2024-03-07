import axios from 'axios'
import { base_url, config } from '../../utils/axiosConfig';

const getProducts = async () => {
    const response = await axios.get(`${base_url}Products`)
    if (response.data) {
        return response.data;
    }
}

const getAProduct = async (id) => {
    const response = await axios.get(`${base_url}Products/${id}`)
    if (response.data) {
        return response.data;
    }
}

const createProduct = async(productData)=>{
    const response = await axios.post(`${base_url}Products`, productData, config);
    if(response.data){
        return response.data;
    }
}

const updateProduct = async(productData)=>{
    console.log(productData);
    const response = await axios.put(`${base_url}Products/${productData.id}`, productData.productData, config);
    if(response.data){
        return response.data;
    }
}

const deleteProduct = async(id)=>{
    const response = await axios.delete(`${base_url}Products/${id}`, config);
    if(response.data){
        return response.data;
    }
}

const productService = {
    getProducts,
    createProduct,
    getAProduct,
    deleteProduct,
    updateProduct,
}

export default productService
