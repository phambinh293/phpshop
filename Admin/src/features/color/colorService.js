import axios from "axios"
import { base_url,config } from "../../utils/axiosConfig";

const getColors = async()=>{
    const response = await axios.get(`${base_url}Colors`);
    if(response.data){
        return response.data;
    }
}

const getColorsShow = async()=>{
    const response = await axios.get(`${base_url}Colors/GetColorsShow`);
    if(response.data){
        return response.data;
    }
}

const getAColor = async(id)=>{
    const response = await axios.get(`${base_url}Colors/${id}`);
    if(response.data){
        return response.data;
    }
}

const createColor = async(colorData)=>{
    const response = await axios.post(`${base_url}Colors`, colorData, config);
    if(response.data){
        return response.data;
    }
}

const deleteColor = async(id)=>{
    const response = await axios.delete(`${base_url}Colors/DeleteColor/${id}`,config);
    if(response.data){
        return response.data;
    }
}

const updateColor = async(colorData)=>{
    const response = await axios.put(`${base_url}Colors/${colorData.id}`,colorData.colorData,config);
    if(response.data){
        return response.data;
    }
}

const colorService = {
    getColors,
    createColor,
    deleteColor,
    getAColor,
    updateColor,
    getColorsShow,
};

export default colorService;