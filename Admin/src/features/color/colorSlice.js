import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import colorService from "./colorService";


export const GetColors = createAsyncThunk("color/get-colors", async(thunkAPI) =>{
    try{
        return await colorService.getColors();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const GetColorsShow = createAsyncThunk("color/get-colorsShow", async(thunkAPI) =>{
    try{
        return await colorService.getColorsShow();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const GetAColor = createAsyncThunk("color/get-color", async(id,thunkAPI) =>{
    try{
        return await colorService.getAColor(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const CreateColor = createAsyncThunk("color/create-color", async(colorData,thunkAPI) =>{
    try{
        return await colorService.createColor(colorData);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const UpdateColor = createAsyncThunk("color/update-color", async(colorData,thunkAPI) =>{
    try{
        return await colorService.updateColor(colorData);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const DeleteColor = createAsyncThunk("color/delete-color", async(id,thunkAPI) =>{
    try{
        return await colorService.deleteColor(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const resetState = createAction('Reset_all')

const initialState = {
    colors: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const colorSlice = createSlice({
    name: "color",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(GetColors.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetColors.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.colors = action.payload;
        })
        .addCase(GetColors.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message;
        }).addCase(CreateColor.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(CreateColor.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.newColor = action.payload;
            if(state.isSuccess) {
                toast.success("Create Color is successfully!!!");
            }
        })
        .addCase(CreateColor.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message;
            if(state.isError) {
                toast.error("Create Color was not successfully!!!");
            }
        }).addCase(DeleteColor.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(DeleteColor.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            if(state.isSuccess) {
                toast.success("Delete Color is successfully!!!");
            }
        })
        .addCase(DeleteColor.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message; 
            if(state.isError){
                toast.error("Something went wrong!!!");
            }
        }).addCase(GetAColor.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetAColor.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.Acolor = action.payload;
        })
        .addCase(GetAColor.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message; 
            if(state.isError){
                toast.error("Something went wrong!!!");
            }
        }).addCase(UpdateColor.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(UpdateColor.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedColor = action.payload;
            if(state.isSuccess){
                toast.success("Update color is successfully!!!");
            }
        })
        .addCase(UpdateColor.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message; 
            if(state.isError){
                toast.error("Something went wrong!!!");
            }
        }).addCase(GetColorsShow.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetColorsShow.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.colorShow = action.payload;
        })
        .addCase(GetColorsShow.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message; 
        }).addCase(resetState, () => initialState);
    }
})

export default colorSlice.reducer;