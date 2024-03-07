import axios from "axios"
import { base_url,config } from "../../utils/axiosConfig";

const uploadImg = async(data)=>{
    const formData = new FormData();
    formData.append('file', data[0]);
    const response = await axios.post(`${base_url}UploadImages`, formData);
    if(response.data){
        return response.data;
    }
}

const deleteImg = async(id)=>{
    const response = await axios.delete(`${base_url}UploadImages/${id}`);
    if(response.data){
        return response.data;
    }
}

const uploadService = {
    uploadImg,
    deleteImg
};

export default uploadService;