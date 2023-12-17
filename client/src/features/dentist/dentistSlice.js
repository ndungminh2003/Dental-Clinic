import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import dentistServices from "./dentistServices";

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
      return await dentistServices.getAllDentist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createDentistAccount = createAsyncThunk(
  "dentist/create-account",
  async (dentist, thunkAPI) => {
    try {
      return await dentistServices.createDentistAccount(dentist);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const dentistSlice = createSlice({
  name: "dentist",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDentistAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDentistAccount.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.medicine = action.payload;
        state.message = "success";
      })
      .addCase(createDentistAccount.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      })
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
      .addCase(resetState, () => initialState);
  },
});

export default dentistSlice.reducer;
