import axios from "axios"
import { base_url,config } from "../../utils/axiosConfig";

const getPhones = async()=>{
    const response = await axios.get(`${base_url}Phones`);
    if(response.data){
        return response.data;
    }
}

const getPhonesShow = async()=>{
    const response = await axios.get(`${base_url}Phones/GetPhonesShow`);
    if(response.data){
        return response.data;
    }
}

const getAPhone = async(id)=>{
    const response = await axios.get(`${base_url}Phones/${id}`);
    if(response.data){
        return response.data;
    }
}

const createPhone = async(phoneData)=>{
    const response = await axios.post(`${base_url}Phones`, phoneData, config);
    if(response.data){
        return response.data;
    }
}

const deletePhone = async(id)=>{
    const response = await axios.delete(`${base_url}Phones/${id}`,config);
    if(response.data){
        return response.data;
    }
}

const updatePhone = async(phoneData)=>{
    const response = await axios.put(`${base_url}Phones/${phoneData.id}`,phoneData.phoneData,config);
    if(response.data){
        return response.data;
    }
}
const phoneService = {
    getPhones,
    getAPhone,
    createPhone,
    deletePhone,
    updatePhone,
    getPhonesShow,
};

export default phoneService;