import axios from "axios"
import { base_url,config } from "../../utils/axiosConfig";

const getCapacitiesShow = async()=>{
    const response = await axios.get(`${base_url}Capacities/GetCapacitiesShow`);
    if(response.data){
        return response.data;
    }
}

const getCapacities = async()=>{
    const response = await axios.get(`${base_url}Capacities`);
    if(response.data){
        return response.data;
    }
}

const getCapacity = async(id)=>{
    const response = await axios.get(`${base_url}Capacities/${id}`);
    if(response.data){
        return response.data;
    }
}

const createCapacity = async(data)=>{
    const response = await axios.post(`${base_url}Capacities`,data, config);
    if(response.data){
        return response.data;
    }
}

const deleteCapacity = async(id)=>{
    const response = await axios.delete(`${base_url}Capacities/${id}`, config);
    if(response.data){
        return response.data;
    }
}

const updateCapacity = async(capacityData)=>{
    const response = await axios.put(`${base_url}Capacities/${capacityData.id}`,capacityData.capacityData,config);
    if(response.data){
        return response.data;
    }
}


const capacityService = {
    getCapacitiesShow,
    getCapacities,
    deleteCapacity,
    createCapacity,
    getCapacity,
    updateCapacity,
};

export default capacityService;