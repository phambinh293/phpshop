import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ratingService from './ratingService';
import { toast } from 'react-toastify';

export const GetRatingsForProduct = createAsyncThunk("rating/get-ratings", async (id, thunkAPI) => {
    try {
        const comment = await ratingService.getRangtingsForProduct(id);
        return comment;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const CreateRating = createAsyncThunk("rating/create-rating", async (data, thunkAPI) => {
    try {
        const comment = await ratingService.createRating(data);
        return comment;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

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
    extraReducers: (builder) => {
        builder
            .addCase(GetRatingsForProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetRatingsForProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.ratings = action.payload;
            })
            .addCase(GetRatingsForProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(CreateRating.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(CreateRating.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.rating = action.payload;
                if(state.isSuccess){
                    toast.success("Rating is successfully!!!")
                }
            })
            .addCase(CreateRating.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError){
                    toast.error(action.error.message)
                }
            })

    }
});

export default ratingSlice.reducer