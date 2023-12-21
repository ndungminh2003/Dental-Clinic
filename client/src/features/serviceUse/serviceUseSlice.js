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

const getServiceUseByRecordId = async (recordId) => {
  try{
    const response = await Axios.get("service-use/get-service-use",
    { params: { recordId } }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
};

export const createServiceUse = createAsyncThunk(
  "service/create",
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
      });
  },
});

export default serviceUseSlice.reducer;