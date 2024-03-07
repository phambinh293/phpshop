import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import cartService from './cartService';
import { toast } from 'react-toastify';

export const GetCart = createAsyncThunk("cart/get-carts", async (id, thunkAPI) => {
    try {
        return await cartService.getCart(id);;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const AddCart = createAsyncThunk("cart/add-cart", async (cartData, thunkAPI) => {
    try {
        return await cartService.addCart(cartData);;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const UpdateCart = createAsyncThunk("cart/update-cart", async (cartData, thunkAPI) => {
    try {
        return await cartService.updateCart(cartData);;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const DeleteCart = createAsyncThunk("cart/delete-cart", async (id, thunkAPI) => {
    try {
        return await cartService.deleteCart(id);;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const resetState = createAction('Reset_all')

const initialState = {
    carts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}
export const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.carts = action.payload;
            })
            .addCase(GetCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(AddCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(AddCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cart = action.payload;
                if (state.isSuccess) {
                    toast.success("Thêm vào giỏ hàng thành công")
                }
            })
            .addCase(AddCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error(action.error.message)
                }
            })
            .addCase(DeleteCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(DeleteCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCart = action.payload;
            })
            .addCase(DeleteCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error(action.error.message)
                }
            }).addCase(UpdateCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(UpdateCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCart = action.payload;
                if (state.isSuccess) {
                    toast.success("Update is successfully!!!")
                }
            })
            .addCase(UpdateCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error(action.error.message)
                }
            }).addCase(resetState, () => initialState);

    }
});

export default cartSlice.reducer;