import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import patientRecordService from "./patientRecordServices";
const initialState = {
  patientRecord: [],
  newPatientRecord: {},
  error: false,
  loading: false,
  success: false,
  message: "",
};

export const getAllPatientRecord = createAsyncThunk(
  "patient-record/get-all",
  async (thunkAPI) => {
    try {
      return await patientRecordService.getAllPatientRecord();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createPatientRecord = createAsyncThunk(
  "patient-record/create",
  async (data, thunkAPI) => {
    try {
      return await patientRecordService.createPatientRecord(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const patientRecordSlice = createSlice({
  name: "patient-record",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPatientRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPatientRecord.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.patientRecord = action.payload;
        state.message = "success";
      })
      .addCase(getAllPatientRecord.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      })

      .addCase(createPatientRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPatientRecord.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.newPatientRecord = action.payload;
        state.message = "success";
      })
      .addCase(createPatientRecord.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      });
  },
});

export default patientRecordSlice.reducer;
