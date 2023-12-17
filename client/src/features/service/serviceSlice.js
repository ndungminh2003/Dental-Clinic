import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import serviceService from "./serviceServices";
const initialState = {
    service: [],
    error: false,
    loading: false,
    success: false,
    message: "",
  };

export const getAllService = createAsyncThunk(
    "service/get-all",
    async (thunkAPI) => {
      try {
        return await serviceService.getAllService();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);
export const getServiceUseByRecordId = createAsyncThunk(
  "service/get-service-use-by-record-id",
  async (recordId,thunkAPI) => {
    try {
      return await serviceService.getServiceUseByRecordId(recordId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const serviceSlice = createSlice({
    name: "service",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllService.pending, (state) => {
          state.loading = true;
        })
        .addCase(getAllService.fulfilled, (state, action) => {
          state.error = false;
          state.loading = false;
          state.success = true;
          state.service = action.payload;
          state.message = "success";
        })
        .addCase(getAllService.rejected, (state, action) => {
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
  
  export default serviceSlice.reducer;