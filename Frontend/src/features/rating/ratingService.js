import axios from 'axios'
import { base_url, config } from '../../utils/axiosConfigure';

const getRangtingsForProduct = async (id) => {
    const response = await axios.get(`${base_url}Ratings/GetRatings/${id}`)
    if (response.data) {
        return response.data;
    }
}

const createRating = async (data) => {
    const response = await axios.post(`${base_url}Ratings`,data, config)
    if (response.data) {
        return response.data;
    }
}


const ratingService = {
    getRangtingsForProduct,
    createRating,
}

export default ratingService
