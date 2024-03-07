import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import wishlistService from './wishlistService';
import { toast } from 'react-toastify';

export const getWishlist = createAsyncThunk("wishlist/get-wishlist", async (id, thunkAPI) => {
    try {
        const wishlist = await wishlistService.getWishlist(id);
        return wishlist;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});
export const CreateWishList = createAsyncThunk("wishlist/post-wishlist", async (wishlistData, thunkAPI) => {
    try {
        return await wishlistService.createWishList(wishlistData);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

const initialState = {
    wishlist: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}
export const wishlist = createSlice({
    name: "wishlist",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishlist = action.payload;
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(CreateWishList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(CreateWishList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.newWishlist = action.payload;
                if (state.isSuccess) {
                    toast.success("Đã thêm vào danh sách yêu thích");
                }
               
            })
            .addCase(CreateWishList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
                if (state.isError) {
                    toast.error(action.error.message);
                }
            })
    }
});

export default wishlist.reducer;