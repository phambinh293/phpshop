import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

export const GetProductsByProductType = createAsyncThunk(
  "product/get-product-by-product-type",
  async (id, thunkAPI) => {
    try {
      return await productService.GetProductsByProductType(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const GetProductsByBrand = createAsyncThunk(
  "product/get-product-by-product-brand",
  async (id, thunkAPI) => {
    try {
      return await productService.GetProductsByBrand(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const GetProductForUser = createAsyncThunk(
  "product/get-product-forUser",
  async (data, thunkAPI) => {
    try {
      return await productService.getProductForUser(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const resetState = createAction('Reset_all')

const initalState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const productSlice = createSlice({
  name: "product",
  initialState: initalState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetProductsByProductType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetProductsByProductType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
          state.productforType = action.payload;
      })
      .addCase(GetProductsByProductType.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(GetProductsByBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetProductsByBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productbrand = action.payload;
      })
      .addCase(GetProductsByBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
        .addCase(GetProductForUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(GetProductForUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.A_Product = action.payload;
        })
        .addCase(GetProductForUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(resetState, () => initalState);
  },
});

export default productSlice.reducer;
