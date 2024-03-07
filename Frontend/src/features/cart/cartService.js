import axios from 'axios'
import { base_url, config } from '../../utils/axiosConfigure';

const getCart = async (id) => {
    const response = await axios.get(`${base_url}Carts/${id}`, config)
    if (response.data) {
        return response.data;
    }
}

const addCart = async (cartData) => {
    const response = await axios.post(`${base_url}Carts`, cartData, config)
    if (response.data) {
        return response.data;
    }
}

const updateCart = async (cartData) => {
    const response = await axios.put(`${base_url}Carts/${cartData.id}`, cartData, config)
    if (response.data) {
        return response.data;
    }
}

const deleteCart = async (id) => {
    const response = await axios.delete(`${base_url}Carts/${id}`, config)
    if (response.data) {
        return response.data;
    }
}

const cartService = {
    getCart,
    addCart,
    deleteCart,
    updateCart,
}

export default cartService
