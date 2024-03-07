import axios from "axios"
import { base_url,config } from "../../utils/axiosConfig";

const getInvoices = async()=>{
    const response = await axios.get(`${base_url}Invoices`,config);
    if(response.data){
        return response.data;
    }
}

const getAInvoice = async(id)=>{
    const response = await axios.get(`${base_url}Invoices/GetAInvoice/${id}`,config);
    if(response.data){
        return response.data;
    }
}

const updateStatusInvoice = async(data)=>{
    const response = await axios.put(`${base_url}Invoices/UpdateStatusInvoice/${data.id}/${data.status}`, "",config);
    if(response.data){
        return response.data;
    }
}

const getSalesOfYear = async()=>{
    const response = await axios.get(`${base_url}Invoices/GetSalesForYear`,config);
    if(response.data){
        return response.data;
    }
}

const invoiceService = {
    getInvoices,
    updateStatusInvoice,
    getAInvoice,
    getSalesOfYear,
};

export default invoiceService;