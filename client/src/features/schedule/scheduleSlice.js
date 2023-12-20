import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import scheduleService from "./scheduleServices";
const initialState = {
    schedule: [],
    error: false,
    loading: false,
    success: false,
    message: "",
  };

export const getAllScheduleAvailable = createAsyncThunk(
    "schedule/get-all",
    async (thunkAPI) => {
      try {
        return await scheduleService.getAllScheduleAvailable();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const createDentistSchedule = createAsyncThunk(
  "schedule/create",
  async (data, thunkAPI) => {
    try {
      console.log("in here");
      return await scheduleService.createDentistSchedule(data);
    } catch (error) {
      console.log("reject here");
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const scheduleSlice = createSlice({
    name: "schedule",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllScheduleAvailable.pending, (state) => {
          state.loading = true;
        })
        .addCase(getAllScheduleAvailable.fulfilled, (state, action) => {
          state.error = false;
          state.loading = false;
          state.success = true;
          state.schedule = action.payload;
          state.message = "success";
        })
        .addCase(getAllScheduleAvailable.rejected, (state, action) => {
          state.error = true;
          state.success = false;
          state.message = action.error;
          state.loading = false;
        });
    },
  });
  
  export default scheduleSlice.reducer;