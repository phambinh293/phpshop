import axios from "axios"
import { base_url } from "../../utils/axiosConfigure";

const getSlideshows = async()=>{
    const response = await axios.get(`${base_url}Slideshows`);
    if(response.data){
        return response.data;
    }
}

const slideshowService = {
    getSlideshows,
};

export default slideshowService;