import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import phoneService from './phoneService';

export const GetPhones = createAsyncThunk("phone/get-phones", async (thunkAPI) => {
    try {
        const wishlist = await phoneService.getPhones();
        return wishlist;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});
export const GetAPhone = createAsyncThunk("phone/get-phone", async (id, thunkAPI) => {
    try {
        return await phoneService.getAPhone(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

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
    extraReducers: (builder) => {
        builder
            .addCase(GetPhones.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetPhones.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.phones = action.payload;
            })
            .addCase(GetPhones.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(GetAPhone.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetAPhone.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.A_Phone = action.payload;
            })
            .addCase(GetAPhone.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
           
    }
});

export default phoneSlice.reducer;