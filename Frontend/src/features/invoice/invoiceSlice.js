import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import invoiceService from './invoiceService';
import { toast } from 'react-toastify';

export const GetAllInvoice = createAsyncThunk("invoice/get-invoices", async (id, thunkAPI) => {
    try {
        const invoice = await invoiceService.getAllInvoice(id);
        return invoice;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});
export const GetAInvoice = createAsyncThunk("invoice/get-invoice", async (id, thunkAPI) => {
    try {
        const invoice = await invoiceService.getAInvoice(id);
        return invoice;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const CreateInvoice = createAsyncThunk("invoice/create-invoice", async (id, thunkAPI) => {
    try {
        const invoice = await invoiceService.createInvoice(id);
        return invoice;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});
export const GetInvoicesByStatus = createAsyncThunk("invoice/Get-invoice-by-status", async (invoiceData, thunkAPI) => {
    try {
        const invoice = await invoiceService.GetInvoicesByStatus(invoiceData);
        return invoice;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});
export const UpdateStatusInvoice = createAsyncThunk("invoice/update-status-invoices", async(data, thunkAPI) =>{
    try{
        return await invoiceService.updateStatusInvoice(data);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

const initialState = {
    invoices: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}
export const invoiceSlice = createSlice({
    name: "invoice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllInvoice.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetAllInvoice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.invoices = action.payload;
            })
            .addCase(GetAllInvoice.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(CreateInvoice.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(CreateInvoice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.invoices = action.payload;
                if (state.isSuccess) {
                    toast.success("Tạo hóa đơn thành công!")
                }
            })
            .addCase(CreateInvoice.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error(action.error.message)
                }
            })
            .addCase(GetAInvoice.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetAInvoice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.detail_invoice = action.payload;
            })
            .addCase(GetAInvoice.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(GetInvoicesByStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetInvoicesByStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.invoiceByStatus = action.payload;
            })
            .addCase(GetInvoicesByStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(UpdateStatusInvoice.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(UpdateStatusInvoice.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedInvoice = action.payload;
                if(state.isSuccess){
                    toast.success("Cập nhật trạng thái đơn hàng thành công!!!");
                }
            })
            .addCase(UpdateStatusInvoice.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isSuccess){
                    toast.err(action.error.message);
                }
            })

    }
});

export default invoiceSlice.reducer;