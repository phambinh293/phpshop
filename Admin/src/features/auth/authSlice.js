import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import authServer from "./authServer";


export const login = createAsyncThunk("auth/login", async(userData,thunkAPI) =>{
    try{
        return await authServer.login(userData);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const RegisterAdmin = createAsyncThunk("auth/register-admin", async(userData,thunkAPI) =>{
    try{
        return await authServer.registerAdmin(userData);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const GetAllUsers = createAsyncThunk("auth/get-allUsers", async(userData,thunkAPI) =>{
    try{
        return await authServer.getAllUsers();
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

const getCustomerfromLocalStorage = localStorage.getItem('customer')? JSON.parse(localStorage.getItem("customer")):null;

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('customer');
    localStorage.removeItem('token');
});

const initialState = {
    user: getCustomerfromLocalStorage,
    wishlist: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const authSlice = createSlice({
    name:"auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(login.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
            if(state.isSuccess){
                toast.info("Login is Successfully!!!");
            }
        })
        .addCase(login.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            // if(state.isError){
            //     toast.error(action.error.message);
            // }
        }).addCase(GetAllUsers.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(GetAllUsers.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.users = action.payload;
        })
        .addCase(GetAllUsers.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(logoutUser.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(logoutUser.fulfilled, (state, action)=>{
            state.user = null;
            state.wishlist = []; // Xóa danh sách mong muốn nếu cần
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            toast.success("Logged out successfully");
        })
        .addCase(logoutUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(RegisterAdmin.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(RegisterAdmin.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.registerAdmin = action.payload;
            toast.success("Register is successfully!!!");
        })
        .addCase(RegisterAdmin.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            toast.error(action.error.message);
        })
    }
})

export default authSlice.reducer;