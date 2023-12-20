import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import prescribeMedicineService from "./prescribeMedicineServices";
const initialState = {
  prescribeMedicine: [],
  error: false,
  loading: false,
  success: false,
  message: "",
};

export const getPrescribeMedicineByRecordId = createAsyncThunk(
  "prescribeMedicine/get-prescribe-medicine-by-record-id",
  async (recordId, thunkAPI) => {
    try {
      return await prescribeMedicineService.getPrescribeMedicineByRecordId(
        recordId
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createPrescribeMedicine = createAsyncThunk(
  "prescribeMedicine/create",
  async (data, thunkAPI) => {
    try {
      console.log("in here");
      return await prescribeMedicineService.createPrescribeMedicine(data);
    } catch (error) {
      console.log("reject here");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const prescribeMedicineSlice = createSlice({
  name: "prescribeMedicine",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPrescribeMedicineByRecordId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPrescribeMedicineByRecordId.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.prescribeMedicine = action.payload;
        state.message = "success";
      })
      .addCase(getPrescribeMedicineByRecordId.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      })
      .addCase(createPrescribeMedicine.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPrescribeMedicine.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.prescribeMedicine = action.payload;
        state.message = "success";
      })
      .addCase(createPrescribeMedicine.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      });
  },
});

export default prescribeMedicineSlice.reducer;
