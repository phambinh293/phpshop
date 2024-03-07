import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import couponService from "./couponService";


export const GetCoupons = createAsyncThunk("coupon/get-coupons", async (thunkAPI) => {
    try {
        return await couponService.getCoupons();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})


export const GetACoupon = createAsyncThunk("coupon/get-coupon", async (id, thunkAPI) => {
    try {
        return await couponService.getACoupon(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const CreateCoupon = createAsyncThunk("coupon/create-coupon", async (couponData, thunkAPI) => {
    try {
        return await couponService.createCoupon(couponData);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const UpdateCoupon = createAsyncThunk("coupon/update-coupon", async (couponData, thunkAPI) => {
    try {
        return await couponService.updateCoupon(couponData);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const DeleteCoupon = createAsyncThunk("coupon/delete-coupon", async (couponData, thunkAPI) => {
    try {
        return await couponService.deleteCoupon(couponData);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const resetState = createAction('Reset_all')


const initialState = {
    coupons: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const couponSlice = createSlice({
    name: "coupon",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetCoupons.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(GetCoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.coupons = action.payload;
            })
            .addCase(GetCoupons.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(CreateCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(CreateCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.newCoupon = action.payload;
                if (state.isSuccess) {
                    toast.success("Create A Coupon is successfully!!!");
                }
            })
            .addCase(CreateCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(DeleteCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(DeleteCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCoupon = action.payload;
                if (state.isSuccess) {
                    toast.success("Delete A Coupon is successfully!!!");
                }
            })
            .addCase(DeleteCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.success("Something went wrong!!!");
                }
            }).addCase(GetACoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetACoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.ACoupon = action.payload;
            })
            .addCase(GetACoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.success("Something went wrong!!!");
                }
            }).addCase(UpdateCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(UpdateCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCoupon = action.payload;
                if (state.isSuccess) {
                    toast.success("Update A Coupon is successfully!!!");
                }
            })
            .addCase(UpdateCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.success("Something went wrong!!!");
                }
            }).addCase(resetState, () => initialState);
    }
})

export default couponSlice.reducer;