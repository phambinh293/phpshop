import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const UploadImg = createAsyncThunk('upload/images', async(data, thunkAPI) =>{
    try{
        return await uploadService.uploadImg(data);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const DeleteImg = createAsyncThunk('delete/images', async(id, thunkAPI) =>{
    try{
        return await uploadService.deleteImg(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const resetUploadState = createAction('Reset_all')

const initialState = {
    images: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const uploadSlice = createSlice({
    name: "images",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(UploadImg.pending, (state) => {
            state.isLoading = true;
        }).addCase(UploadImg.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.images = action.payload;
        }).addCase(UploadImg.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(DeleteImg.pending, (state) => {
            state.isLoading = true;
        }).addCase(DeleteImg.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.images = [];
        }).addCase(DeleteImg.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        }).addCase(resetUploadState, () => initialState);
    }
})

export default uploadSlice.reducer;