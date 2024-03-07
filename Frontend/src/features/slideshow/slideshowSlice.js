import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import slideshowService from "./slideshowService";

export const getAllSlideshow = createAsyncThunk("slideshow/get-all", async(thunkAPI) =>{
    try{
        return await slideshowService.getSlideshows();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})


const initialState = {
    slideshows: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const slideshowSlice = createSlice({
    name:"slideshow",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getAllSlideshow.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllSlideshow.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.slideshows = action.payload;
        })
        .addCase(getAllSlideshow.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})

export default slideshowSlice.reducer;