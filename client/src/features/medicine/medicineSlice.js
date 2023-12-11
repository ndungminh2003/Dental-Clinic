import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import medicineService from "./medicineServices";

const initialState = {
  medicine: [],
  error: false,
  loading: false,
  success: false,
  message: "",
};

export const getAllMedicine = createAsyncThunk(
  "medicine/get-all",
  async (thunkAPI) => {
    try {
      return await medicineService.getAllMedicine();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteMedicine = createAsyncThunk(
  "medicine/delete",
  async (thunkAPI) => {
    try {
      return await medicineService.deleteMedicine();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateMedicine = createAsyncThunk(
  "medicine/update",
  async (data, thunkAPI) => {
    try {
      return await medicineService.updateMedicine('',data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const medicineSlice = createSlice({
  name: "medicine",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMedicine.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMedicine.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.medicine = action.payload;
        state.message = "success";
      })
      .addCase(getAllMedicine.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      })
      .addCase(deleteMedicine.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMedicine.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.deleteMedicine = action.payload;
        state.message = "success";
      })
      .addCase(deleteMedicine.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      })
      .addCase(updateMedicine.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMedicine.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.updateMedicine = action.payload;
        state.message = "success";
      })
      .addCase(updateMedicine.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      });
  },
});

export default medicineSlice.reducer;
