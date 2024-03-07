import axios from "axios"
import { base_url, config } from "../../utils/axiosConfig";

const getRatings = async () => {
    const response = await axios.get(`${base_url}Ratings`);
    if (response.data) {
        return response.data;
    }
}

const getARating = async (id) => {
    const response = await axios.get(`${base_url}Ratings/GetRating${id}`);
    if (response.data) {
        return response.data;
    }
}

const deleteRating = async (id) => {
    const response = await axios.delete(`${base_url}Ratings/${id}`, config);
    if (response.data) {
        return response.data;
    }
}

const ratingService = {
    getRatings,
    getARating,
    deleteRating,
};

export default ratingService;