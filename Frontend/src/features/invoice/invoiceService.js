import axios from 'axios'
import { base_url, config } from '../../utils/axiosConfigure';

const getAllInvoice = async (id) => {
    const response = await axios.get(`${base_url}Invoices/${id}`, config)
    if (response.data) {
        return response.data;
    }
}
const getAInvoice = async (id) => {
    const response = await axios.get(`${base_url}Invoices/GetAInvoice/${id}`, config)
    if (response.data) {
        return response.data;
    }
}
const createInvoice = async (invoiceData) => {
    const response = await axios.post(`${base_url}Invoices`,invoiceData, config)
    if (response.data) {
        return response.data;
    }
}
const GetInvoicesByStatus = async (invoiceData) => {
    console.log(invoiceData);
    const response = await axios.get(`${base_url}Invoices/GetInvoicesByStatus/${invoiceData.id}/${invoiceData.status}`, config)
    if (response.data) {
        console.log(response.data);
        return response.data;
    }
}
const updateStatusInvoice = async(data)=>{
    const response = await axios.put(`${base_url}Invoices/UpdateStatusInvoice/${data.id}/${data.status}`, "",config);
    if(response.data){
        return response.data;
    }
}
const invoiceService = {
    getAllInvoice,
    getAInvoice,
    createInvoice,
    GetInvoicesByStatus,
    updateStatusInvoice
}

export default invoiceService
