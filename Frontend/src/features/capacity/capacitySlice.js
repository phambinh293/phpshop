import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import capacityService from './capacityService';

export const GetCapacitiesByPhoneId = createAsyncThunk("capacity/get-capacitiesByPhoneId", async (id, thunkAPI) => {
    try {
        const capacities = await capacityService.getCapacitiesByPhoneId(id);
        return capacities;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

const initialState = {
    capacities: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}
export const capacitySlice = createSlice({
    name: "capacity",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetCapacitiesByPhoneId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetCapacitiesByPhoneId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.capacities = action.payload;
            })
            .addCase(GetCapacitiesByPhoneId.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

    }
});

export default capacitySlice.reducer;