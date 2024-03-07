import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import paymentService from './paymentService';

export const CreatePayment = createAsyncThunk("payment/create-payment", async (data, thunkAPI) => {
    try {
        const wishlist = await paymentService.createPayment(data);
        return wishlist;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

const initialState = {
    payments: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}
export const paymentSlice = createSlice({
    name: "payment",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CreatePayment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(CreatePayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.payments = action.payload;
            })
            .addCase(CreatePayment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

    }
});

export default paymentSlice.reducer;