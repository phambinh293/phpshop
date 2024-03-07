import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import couponService from "./commentService";


export const GetComments = createAsyncThunk("comment/get-comments", async (thunkAPI) => {
    try {
        return await couponService.getComments();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})


export const GetAComment = createAsyncThunk("comment/get-comment", async (id, thunkAPI) => {
    try {
        return await couponService.getAComment(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const CreateComment = createAsyncThunk("comment/create-comment", async (commentData, thunkAPI) => {
    try {
        return await couponService.createComment(commentData);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const UpdateComment = createAsyncThunk("comment/update-comment", async (commentData, thunkAPI) => {
    try {
        return await couponService.updateComment(commentData);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const DeleteComment = createAsyncThunk("comment/delete-comment", async (commentData, thunkAPI) => {
    try {
        return await couponService.deleteComment(commentData);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const resetState = createAction('Reset_all')


const initialState = {
    comments: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const commentSlice = createSlice({
    name: "comment",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetComments.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(GetComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.coupons = action.payload;
            })
            .addCase(GetComments.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(CreateComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(CreateComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.newCoupon = action.payload;
                if (state.isSuccess) {
                    toast.success("Create A Coupon is successfully!!!");
                }
            })
            .addCase(CreateComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(DeleteComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(DeleteComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCoupon = action.payload;
                if (state.isSuccess) {
                    toast.success("Delete A Coupon is successfully!!!");
                }
            })
            .addCase(DeleteComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.success("Something went wrong!!!");
                }
            }).addCase(GetAComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetAComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.ACoupon = action.payload;
            })
            .addCase(GetAComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.success("Something went wrong!!!");
                }
            }).addCase(UpdateComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(UpdateComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCoupon = action.payload;
                if (state.isSuccess) {
                    toast.success("Update A Comment is successfully!!!");
                }
            })
            .addCase(UpdateComment.rejected, (state, action) => {
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

export default commentSlice.reducer;