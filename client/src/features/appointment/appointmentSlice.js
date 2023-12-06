import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import appointmentService from "./appointmentServices";

const initialState = {
  appointment: [],
  error: false,
  loading: false,
  success: false,
  message: "",
};

export const getAllAppointment = createAsyncThunk(
  "appointment/get-all",
  async (thunkAPI) => {
    try {
      return await appointmentService.getAllAppointment();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAppointment.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.appointment = action.payload;
        state.message = "success";
      })
      .addCase(getAllAppointment.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      });
  },
});

export default appointmentSlice.reducer;
