import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import staffServices from "./staffServices";

const initialState = {
  staff: [],
  error: false,
  loading: false,
  success: false,
  message: "",
};

export const createStaffAccount = createAsyncThunk(
  "staff/create-account",
  async (staff, thunkAPI) => {
    try {
      return await staffServices.createStaffAccount(staff);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const staffSlice = createSlice({
  name: "staff",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStaffAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStaffAccount.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.medicine = action.payload;
        state.message = "success";
      })
      .addCase(createStaffAccount.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      })
      .addCase(resetState, () => initialState);
  },
});

export default staffSlice.reducer;
