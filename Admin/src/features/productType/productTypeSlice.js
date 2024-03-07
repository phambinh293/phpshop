import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import productTypeService from "./productTypeService";


export const GetProductTypes = createAsyncThunk("productType/get-productTypes", async(thunkAPI) =>{
    try{
        return await productTypeService.getProductTypes();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})


export const GetAProductType = createAsyncThunk("productType/get-productType", async(id,thunkAPI) =>{
    try{
        return await productTypeService.getAProductType(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const CreateProductType = createAsyncThunk("productType/create-productType", async(productTypeData,thunkAPI) =>{
    try{
        return await productTypeService.createProductType(productTypeData);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const DeleteProductType = createAsyncThunk("productType/delete-productType", async(id,thunkAPI) =>{
    try{
        return await productTypeService.deleteProductType(id);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const UpdateProductType = createAsyncThunk("productType/update-productType", async(productTypeData,thunkAPI) =>{
    try{
        return await productTypeService.updateProductType(productTypeData);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})


export const resetState = createAction('Reset_all')

const initialState = {
    productTypes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const productTypeSlice = createSlice({
    name: "productType",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(GetProductTypes.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetProductTypes.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.productTypes = action.payload;
        })
        .addCase(GetProductTypes.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(CreateProductType.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(CreateProductType.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.newProductType = action.payload;
            if(state.isSuccess){
                toast.success("Create Product Type is successfully!!!")
            }
        })
        .addCase(CreateProductType.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError){
                toast.error(action.error.message)
            }
        }).addCase(DeleteProductType.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(DeleteProductType.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            if(state.isSuccess){
                toast.success("Delete Product Type is successfully!!!")
            }
        })
        .addCase(DeleteProductType.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError){
                toast.error(action.error.message)
            }
        }).addCase(GetAProductType.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetAProductType.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.AProductType = action.payload;
        })
        .addCase(GetAProductType.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError){
                toast.error(action.error.message)
            }
        }).addCase(UpdateProductType.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(UpdateProductType.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedProductType = action.payload;
            if(state.isSuccess){
                toast.success("Update Product Type is successfully!!!")
            }
        })
        .addCase(UpdateProductType.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError){
                toast.error(action.error.message)
            }
        }).addCase(resetState, () => initialState);
    }
})

export default productTypeSlice.reducer;