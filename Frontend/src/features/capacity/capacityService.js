import axios from 'axios'
import { base_url } from '../../utils/axiosConfigure';

const getCapacitiesByPhoneId = async (id) => {
    const response = await axios.get(`${base_url}Capacities/GetCapacityByPhoneId/${id}`)
    if (response.data) {
        return response.data;
    }
}


const capacityService = {
    getCapacitiesByPhoneId,
}

export default capacityService
