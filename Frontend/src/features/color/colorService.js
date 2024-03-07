import axios from 'axios'
import { base_url } from '../../utils/axiosConfigure';

const getColorsByPhoneId = async (id) => {
    const response = await axios.get(`${base_url}Colors/GetColorByPhoneId/${id}`)
    if (response.data) {
        return response.data;
    }
}


const colorService = {
    getColorsByPhoneId,
}

export default colorService
