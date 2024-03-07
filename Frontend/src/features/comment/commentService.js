import axios from 'axios'
import { base_url, config } from '../../utils/axiosConfigure';

const GetCommentByProId = async (id) => {
    const response = await axios.get(`${base_url}Comments/GetComments/${id}`)
    if (response.data) {
        return response.data;
    }
}

const createComment = async (data) => {
    const response = await axios.post(`${base_url}Comments`, data, config)
    if (response.data) {
        return response.data;
    }
}

const commentService = {
    GetCommentByProId,
    createComment,
}

export default commentService
