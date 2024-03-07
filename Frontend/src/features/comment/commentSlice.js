import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import commentService from './commentService';
import { toast } from 'react-toastify';

export const GetCommentByProId = createAsyncThunk("comment/get-comment-by-proId", async (id, thunkAPI) => {
    try {
        const comment = await commentService.GetCommentByProId(id);
        return comment;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const CreateComment = createAsyncThunk("comment/create-comment", async (data, thunkAPI) => {
    try {
        const comment = await commentService.createComment(data);
        return comment;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

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
        builder
            .addCase(GetCommentByProId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetCommentByProId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.comments = action.payload;
            })
            .addCase(GetCommentByProId.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(CreateComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(CreateComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.comment = action.payload;
                toast.success("Comment is successfully!!!")
            })
            .addCase(CreateComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                toast.error(action.error.message)
            }).addCase(resetState, () => initialState);
    }
});

export default commentSlice.reducer;