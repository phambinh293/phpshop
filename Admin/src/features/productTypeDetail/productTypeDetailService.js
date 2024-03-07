import axios from "axios"
import { base_url,config } from "../../utils/axiosConfig";

const getProductTypeByPhoneId = async (id) => {
    const response = await axios.get(`${base_url}ProductTypeDetails/GetProductTypeByPhoneId/${id}`)
    if (response.data) {
        return response.data;
    }
}

const productTypeDetailService = {
    getProductTypeByPhoneId
}

export default productTypeDetailService
