import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import invoiceService from "./invoiceService";


export const GetInvoices = createAsyncThunk("invoice/get-invoices", async(thunkAPI) =>{
    try{
        return await invoiceService.getInvoices();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const GetAInvoice = createAsyncThunk("invoice/get-invoice", async(id, thunkAPI) =>{
    try{
        return await invoiceService.getAInvoice(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const UpdateStatusInvoice = createAsyncThunk("invoice/update-status-invoices", async(data, thunkAPI) =>{
    try{
        return await invoiceService.updateStatusInvoice(data);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const GetSalesOfYear = createAsyncThunk("invoice/get-sales", async(thunkAPI) =>{
    try{
        return await invoiceService.getSalesOfYear();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const resetState = createAction('Reset_all')

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
    extraReducers: (builder)=>{
        builder.addCase(GetInvoices.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetInvoices.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.invoices = action.payload;
        })
        .addCase(GetInvoices.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(UpdateStatusInvoice.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(UpdateStatusInvoice.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedInvoice = action.payload;
            if(state.isSuccess){
                toast.success("Update status is successfullly!!!");
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
        }).addCase(GetAInvoice.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetAInvoice.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.AInvoice = action.payload;
        })
        .addCase(GetAInvoice.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(GetSalesOfYear.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetSalesOfYear.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.sales = action.payload;
        })
        .addCase(GetSalesOfYear.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(resetState, () => initialState);
    }
})

export default invoiceSlice.reducer;