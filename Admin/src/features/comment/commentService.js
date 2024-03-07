import axios from "axios"
import { base_url, config } from "../../utils/axiosConfig";

const getComments = async () => {
    const response = await axios.get(`${base_url}Comments`);
    if (response.data) {
        return response.data;
    }
}

const getAComment = async (id) => {
    const response = await axios.get(`${base_url}Comments/${id}`);
    if (response.data) {
        return response.data;
    }
}

const createComment = async (CommentData) => {
    const response = await axios.post(`${base_url}Comments`, CommentData, config);
    if (response.data) {
        return response.data;
    }
}

const deleteComment = async (id) => {
    const response = await axios.delete(`${base_url}Comments/${id}`, config);
    if (response.data) {
        return response.data;
    }
}

const updateComment = async (CommentData) => {
    const response = await axios.put(`${base_url}Comments/${CommentData.id}`, CommentData.CommentData, config);
    if (response.data) {
        return response.data;
    }
}
const commentService = {
    getComments,
    createComment,
    deleteComment,
    getAComment,
    updateComment
};

export default commentService;