import Axios from "../../app/axiosConfig";
import serviceUseService from "./serviceUseServices";
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

const initialState = {
  serviceUse: [],
  error: false,
  loading: false,
  success: false,
  message: "",
};

export const getServiceUseByRecordId = createAsyncThunk(
  "serviceUse/get-service-use",
  async (recordId, thunkAPI) => {
    try {
      return await serviceUseService.getServiceUseByRecordId(recordId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createServiceUse = createAsyncThunk(
  "serviceUse/create",
  async (data, thunkAPI) => {
    try {
      console.log("in here");
      return await serviceUseService.createServiceUse(data);
    } catch (error) {
      console.log("reject here");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const serviceUseSlice = createSlice({
  name: "service",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createServiceUse.pending, (state) => {
        state.loading = true;
      })
      .addCase(createServiceUse.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.service = action.payload;
        state.message = "success";
      })
      .addCase(createServiceUse.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      })
      .addCase(getServiceUseByRecordId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServiceUseByRecordId.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.service = action.payload;
        state.message = "success";
      })
      .addCase(getServiceUseByRecordId.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      });
  },
});

export default serviceUseSlice.reducer;