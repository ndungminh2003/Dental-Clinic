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

export const getOneStaff = createAsyncThunk(
  "staff/get-account",
  async (staff, thunkAPI) => {
    try {
      return await staffServices.getOneStaff(staff);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateStaffProfile = createAsyncThunk(
  "staff/change-staff-profile",
  async (staff, thunkAPI) => {
    try {
      return await staffServices.updateStaffProfile(staff);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const changeStaffPassword = createAsyncThunk(
  "staff/change-staff-password",
  async (staff, thunkAPI) => {
    try {
      return await staffServices.changeStaffPassword(staff);
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
      .addCase(getOneStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneStaff.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.medicine = action.payload;
        state.message = "success";
      })
      .addCase(getOneStaff.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      })
      .addCase(updateStaffProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStaffProfile.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.medicine = action.payload;
        state.message = "success";
      })
      .addCase(updateStaffProfile.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      })
      .addCase(changeStaffPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeStaffPassword.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.medicine = action.payload;
        state.message = "success";
      })
      .addCase(changeStaffPassword.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      })
      .addCase(resetState, () => initialState);
  },
});

export default staffSlice.reducer;
