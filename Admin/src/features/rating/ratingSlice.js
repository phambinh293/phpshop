import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import ratingService from "./ratingService";


export const GetRatings = createAsyncThunk("rating/get-ratings", async(thunkAPI) =>{
    try{
        return await ratingService.getRatings();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const GetARating = createAsyncThunk("rating/get-rating", async(id,thunkAPI) =>{
    try{
        return await ratingService.getARating(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const DeleteRating = createAsyncThunk("rating/delete-rating", async(id,thunkAPI) =>{
    try{
        return await ratingService.deleteRating(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const resetState = createAction('Reset_all')

const initialState = {
    ratings: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const ratingSlice = createSlice({
    name: "rating",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(GetRatings.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetRatings.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.ratings = action.payload;
        })
        .addCase(GetRatings.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(DeleteRating.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(DeleteRating.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            if(state.isSuccess){
                toast.success("Delete Rating is successfully!!!");
            }
        })
        .addCase(DeleteRating.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message;
            if(state.isError){
                toast.error(action.error.message);
            }
        }).addCase(GetARating.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetARating.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.Arating = action.payload;
        })
        .addCase(GetARating.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message;
            if(state.isError){
                toast.error(action.error.message);
            }
        }).addCase(resetState, () => initialState);
    }
})

export default ratingSlice.reducer;