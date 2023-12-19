import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import medicineService from "./medicineServices";

export const deleteMedicine = createAsyncThunk(
  "medicine/delete",
  async (medicineId, thunkAPI) => {
    try {
      return await medicineService.deleteMedicine(medicineId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateMedicine = createAsyncThunk(
  "medicine/update",
  async (data, thunkAPI) => {
    try {
      return await medicineService.updateMedicine(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createMedicine = createAsyncThunk(
  "medicine/create",
  async (data, thunkAPI) => {
    try {
      return await medicineService.createMedicine(data);
    } catch (error) {
      console.log("reject here");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const medicineSlice = createSlice({
  name: "medicine",
  initialState: {
    medicine: [],
    error: false,
    loading: false,
    success: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMedicine.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMedicine.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.createMedicine = action.payload;
        state.message = "success";
      })
      .addCase(createMedicine.rejected, (state, action) => {
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
