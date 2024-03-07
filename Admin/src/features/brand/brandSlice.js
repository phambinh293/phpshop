import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import brandService from "./brandService";


export const GetBrands = createAsyncThunk("brand/get-brands", async(thunkAPI) =>{
    try{
        return await brandService.getBrands();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const GetBrandsShow = createAsyncThunk("brand/get-brandsShow", async(thunkAPI) =>{
    try{
        return await brandService.getBrandsShow();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const GetABrand = createAsyncThunk("brand/get-brand", async(id,thunkAPI) =>{
    try{
        return await brandService.getABrand(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const CreateBrand = createAsyncThunk("brand/create-brand", async(brandData,thunkAPI) =>{
    try{
        return await brandService.createBrand(brandData);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const UpdateBrand = createAsyncThunk("brand/update-brand", async(brandData,thunkAPI) =>{
    try{
        return await brandService.updateBrand(brandData);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const DeleteBrand = createAsyncThunk("brand/delete-brand", async(id,thunkAPI) =>{
    try{
        return await brandService.deleteBrand(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const resetState = createAction('Reset_all')

const initialState = {
    brands: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const brandSlice = createSlice({
    name: "brand",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(GetBrands.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetBrands.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.brands = action.payload;
        })
        .addCase(GetBrands.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(CreateBrand.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(CreateBrand.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.newBrand = action.payload;
            if(state.isSuccess){
                toast.success("Create Brand is successfully!!!");
            }
        })
        .addCase(CreateBrand.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message;
            if(state.isError){
                toast.error(action.error.message);
            }
        }).addCase(DeleteBrand.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(DeleteBrand.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            if(state.isSuccess){
                toast.success("Delete Brand is successfully!!!");
            }
        })
        .addCase(DeleteBrand.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message;
            if(state.isError){
                toast.error(action.error.message);
            }
        }).addCase(GetABrand.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetABrand.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.ABrand = action.payload;
        })
        .addCase(GetABrand.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message;
            if(state.isError){
                toast.error(action.error.message);
            }
        }).addCase(UpdateBrand.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(UpdateBrand.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updateBrand = action.payload;
            if(state.isSuccess){
                toast.success("Update Brand is successfully!!!");
            }
        })
        .addCase(UpdateBrand.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message;
            if(state.isError){
                toast.error(action.error.message);
            }
        }).addCase(GetBrandsShow.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetBrandsShow.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.brandShow = action.payload;
        })
        .addCase(GetBrandsShow.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message;
            if(state.isError){
                toast.error(action.error.message);
            }
        }).addCase(resetState, () => initialState);
    }
})

export default brandSlice.reducer;