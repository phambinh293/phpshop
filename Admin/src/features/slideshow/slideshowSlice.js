import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import slideshowService from "./slideshowService";


export const GetSlideShows = createAsyncThunk("slideshow/get-slideshows", async (thunkAPI) => {
    try {
        return await slideshowService.getSlideShows();
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})


export const GetASlideShow = createAsyncThunk("slideshow/get-slideshow", async (id, thunkAPI) => {
    try {
        return await slideshowService.getASlideShow(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const CreateSlideShow = createAsyncThunk("slideshow/create-slideshow", async (slideshowData, thunkAPI) => {
    try {
        return await slideshowService.createSlideShow(slideshowData);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const UpdateSlideShow = createAsyncThunk("slideshow/update-slideshow", async (id, thunkAPI) => {
    try {
        return await slideshowService.updateSlideShow(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const DeleteSlideShow = createAsyncThunk("slideshow/delete-slideshow", async (id, thunkAPI) => {
    try {
        return await slideshowService.deleteSlideShow(id);
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const resetState = createAction('Reset_all')


const initialState = {
    slideshows: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const slideshowSlice = createSlice({
    name: "slideshow",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetSlideShows.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(GetSlideShows.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.slideshows = action.payload;
            })
            .addCase(GetSlideShows.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(CreateSlideShow.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(CreateSlideShow.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.newslideshow = action.payload;
                if (state.isSuccess) {
                    toast.success("Create A slideshow is successfully!!!");
                }
            })
            .addCase(CreateSlideShow.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.success(action.error.message);
                }
            }).addCase(DeleteSlideShow.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(DeleteSlideShow.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedslideshow = action.payload;
                if (state.isSuccess) {
                    toast.success("Delete A slideshow is successfully!!!");
                }
            })
            .addCase(DeleteSlideShow.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something went wrong!!!");
                }
            }).addCase(GetASlideShow.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetASlideShow.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.Aslideshow = action.payload;
            })
            .addCase(GetASlideShow.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.success("Something went wrong!!!");
                }
            }).addCase(UpdateSlideShow.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(UpdateSlideShow.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedslideshow = action.payload;
                if (state.isSuccess) {
                    toast.success("Update A slideshow is successfully!!!");
                }
            })
            .addCase(UpdateSlideShow.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError) {
                    toast.error("Something went wrong!!!");
                }
            }).addCase(resetState, () => initialState);
    }
})

export default slideshowSlice.reducer;