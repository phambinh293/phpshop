import axios from 'axios'
import { base_url, config } from '../../utils/axiosConfigure';

const createPayment = async (data) => {
    const response = await axios.post(`${base_url}Stripe/Payment`,data,config)
    if (response.data) {
        return response.data;
    }
}


const paymentService = {
    createPayment,
}

export default paymentService
