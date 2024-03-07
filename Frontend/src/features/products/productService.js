import axios from 'axios'
import { base_url } from '../../utils/axiosConfigure';



const GetProductsByProductType = async (id) => {
    const response = await axios.get(`https://localhost:7056/api/ProductTypeDetails/GetProductsByProductType/${id}`)

    if (response.data) {
        return response.data;
    }
}
const GetProductsByBrand = async (id) => {
    const response = await axios.get(`https://localhost:7056/api/Phones/GetPhoneByBrand/${id}`)

    if (response.data) {
        return response.data;
    }
}

const getProductForUser = async (data) => {
    const response = await axios.get(`${base_url}Products/GetAProductForUser/${data.phoneId}/${data.colorId}/${data.capacityId}`)

    if (response.data) {
        return response.data;
    }
}
const productService = {
    GetProductsByProductType,
    GetProductsByBrand,
    getProductForUser,
}

export default productService
