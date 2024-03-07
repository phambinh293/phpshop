import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import phoneService from "./phoneService";



export const GetPhones = createAsyncThunk("phone/get-phones", async(thunkAPI) =>{
    try{
        return await phoneService.getPhones();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const GetPhonesShow = createAsyncThunk("phone/get-phonesShow", async(thunkAPI) =>{
    try{
        return await phoneService.getPhonesShow();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const GetAPhone = createAsyncThunk("phone/get-Phone", async(id,thunkAPI) =>{
    try{
        return await phoneService.getAPhone(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const CreatePhone = createAsyncThunk("phone/create-phone", async(phoneData,thunkAPI) =>{
    try{
        return await phoneService.createPhone(phoneData);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const UpdatePhone = createAsyncThunk("phone/update-Phone", async(phoneData,thunkAPI) =>{
    try{
        return await phoneService.updatePhone(phoneData);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const DeletePhone = createAsyncThunk("phone/delete-phone", async(id,thunkAPI) =>{
    try{
        return await phoneService.deletePhone(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const resetState = createAction('Reset_all')

const initialState = {
    phones: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const phoneSlice = createSlice({
    name: "phone",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(GetPhones.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetPhones.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.phones = action.payload;
        })
        .addCase(GetPhones.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(CreatePhone.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(CreatePhone.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.newPhone = action.payload;
            if(state.isSuccess){
                toast.success("Create Phone is successfully!!!");
            }
        })
        .addCase(CreatePhone.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message;
            if(state.isError){
                toast.error(action.error.message);
            }
        }).addCase(DeletePhone.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(DeletePhone.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            if(state.isSuccess){
                toast.success("Delete Phone is successfully!!!");
            }
        })
        .addCase(DeletePhone.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message;
            if(state.isError){
                toast.error(action.error.message);
            }
        }).addCase(GetAPhone.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetAPhone.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.APhone = action.payload;
        })
        .addCase(GetAPhone.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message;
            if(state.isError){
                toast.error(action.error.message);
            }
        }).addCase(UpdatePhone.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(UpdatePhone.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatePhone = action.payload;
            if(state.isSuccess){
                toast.success("Update Phone is successfully!!!");
            }
        })
        .addCase(UpdatePhone.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message;
            if(state.isError){
                toast.error(action.error.message);
            }
        }).addCase(GetPhonesShow.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetPhonesShow.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.phoneShow = action.payload;
        })
        .addCase(GetPhonesShow.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message;
        }).addCase(resetState, () => initialState);
    }
})

export default phoneSlice.reducer;