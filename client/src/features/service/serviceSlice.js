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

export const deleteService = createAsyncThunk(
  "service/delete",
  async (serviceId, thunkAPI) => {
    try {
      return await serviceService.deleteService(serviceId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateService = createAsyncThunk(
  "service/update",
  async (data, thunkAPI) => {
    try {
      return await serviceService.updateService(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const createService = createAsyncThunk(
  "service/create",
  async (data, thunkAPI) => {
    try {
      console.log("in here");
      return await serviceService.createService(data);
    } catch (error) {
      console.log("reject here");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");


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
        .addCase(deleteService.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteService.fulfilled, (state, action) => {
          state.error = false;
          state.loading = false;
          state.success = true;
          state.service = action.payload;
          state.message = "success";
        })
        .addCase(deleteService.rejected, (state, action) => {
          state.error = true;
          state.success = false;
          state.message = action.error;
          state.loading = false;
        })
        .addCase(updateService.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateService.fulfilled, (state, action) => {
          state.error = false;
          state.loading = false;
          state.success = true;
          state.service = action.payload;
          state.message = "success";
        })
        .addCase(updateService.rejected, (state, action) => {
          state.error = true;
          state.success = false;
          state.message = action.error;
          state.loading = false;
        })
        .addCase(createService.pending, (state) => {
          state.loading = true;
        })
        .addCase(createService.fulfilled, (state, action) => {
          state.error = false;
          state.loading = false;
          state.success = true;
          state.service = action.payload;
          state.message = "success";
        })
        .addCase(createService.rejected, (state, action) => {
          state.error = true;
          state.success = false;
          state.message = action.error;
          state.loading = false;
        });
    },
  });
  
  export default serviceSlice.reducer;