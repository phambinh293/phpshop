import axios from 'axios'
import { base_url } from '../../utils/axiosConfigure';

const getPhones = async () => {
    const response = await axios.get(`${base_url}Phones`)
    if (response.data) {
        return response.data;
    }
}

const getAPhone = async (id) => {
    const response = await axios.get(`${base_url}Phones/${id}`)

    if (response.data) {
        return response.data;
    }
}


const phoneService = {
    getPhones,
    getAPhone
}

export default phoneService
