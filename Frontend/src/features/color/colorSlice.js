import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import colorService from './colorService';

export const GetColorsByPhoneId = createAsyncThunk("color/get-colorssByPhoneId", async (id, thunkAPI) => {
    try {
        const wishlist = await colorService.getColorsByPhoneId(id);
        return wishlist;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

const initialState = {
    colors: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}
export const colorSlice = createSlice({
    name: "color",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetColorsByPhoneId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetColorsByPhoneId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.colors = action.payload;
            })
            .addCase(GetColorsByPhoneId.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

    }
});

export default colorSlice.reducer;