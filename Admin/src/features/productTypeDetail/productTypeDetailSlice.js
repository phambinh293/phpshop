import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productTypeDetailService from './productTypeDetailService';

export const GetProductTypeByPhoneId = createAsyncThunk("productTypesDetail/get-productTypesDetailByPhoneId", async (id, thunkAPI) => {
    try {
        return await productTypeDetailService.getProductTypeByPhoneId(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

const initalState = {
    productTypesDetails: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}
export const productTypeDetailSlice = createSlice({
    name: "productTypesDetail",
    initialState: initalState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetProductTypeByPhoneId.pending, (state) => {
            state.isLoading = true;
        }).addCase(GetProductTypeByPhoneId.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.productTypesDetails = action.payload;
        }).addCase(GetProductTypeByPhoneId.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })

    }
})
export default productTypeDetailSlice.reducer;