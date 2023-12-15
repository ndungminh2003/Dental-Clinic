import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import dentistService from "./dentistServices";

const initialState = {
  dentist: [],
  error: false,
  loading: false,
  success: false,
  message: "",
};

export const getAllDentist = createAsyncThunk(
  "dentist/get-all",
  async (thunkAPI) => {
    try {
      return await dentistService.getAllDentist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const appointmentSlice = createSlice({
    name: "dentist",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllDentist.pending, (state) => {
          state.loading = true;
        })
        .addCase(getAllDentist.fulfilled, (state, action) => {
          state.error = false;
          state.loading = false;
          state.success = true;
          state.dentist = action.payload;
          state.message = "success";
        })
        .addCase(getAllDentist.rejected, (state, action) => {
          state.error = true;
          state.success = false;
          state.message = action.error;
          state.loading = false;
        })
    },
  });
  
  export default appointmentSlice.reducer;