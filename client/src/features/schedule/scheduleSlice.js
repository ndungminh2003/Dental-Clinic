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
);export const getFullslotSchedule = createAsyncThunk(
  "schedule/get-full-slot",
  async (thunkAPI) => {
    try {
      return await scheduleService.getFullslotSchedule();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getDentistSchedule = createAsyncThunk(
  "patient-record/get-dentist-schedule",
  async (dentistId, thunkAPI) => {
    try {
      return await scheduleService.getDentistSchedule(dentistId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createDentistSchedule = createAsyncThunk(
  "schedule/create",
  async (data, thunkAPI) => {
    try {
      return await scheduleService.createDentistSchedule(data);
    } catch (error) {
      console.log("reject here");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteDentistSchedule = createAsyncThunk(
  "schedule/cancel-schedule",
  async (schedule, thunkAPI) => {
    try {
      return await scheduleService.deleteDentistSchedule(schedule);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data);
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
        })
        .addCase(getFullslotSchedule.pending, (state) => {
          state.loading = true;
        })
        .addCase(getFullslotSchedule.fulfilled, (state, action) => {
          state.error = false;
          state.loading = false;
          state.success = true;
          state.schedule = action.payload;
          state.message = "success";
        })
        .addCase(getFullslotSchedule.rejected, (state, action) => {
          state.error = true;
          state.success = false;
          state.message = action.error;
          state.loading = false;
        })
        .addCase(getDentistSchedule.pending, (state) => {
          state.loading = true;
        })
        .addCase(getDentistSchedule.fulfilled, (state, action) => {
          state.error = false;
          state.loading = false;
          state.success = true;
          state.schedule = action.payload;
          state.message = "success";
        })
        .addCase(getDentistSchedule.rejected, (state, action) => {
          state.error = true;
          state.success = false;
          state.message = action.error;
          state.loading = false;
        })
        .addCase(deleteDentistSchedule.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteDentistSchedule.fulfilled, (state, action) => {
          state.error = false;
          state.loading = false;
          state.success = true;
          state.message = action.payload;
        })
        .addCase(deleteDentistSchedule.rejected, (state, action) => {
          state.error = true;
          state.success = false;
          state.message = action.payload;
          state.loading = false;
        })
        .addCase(createDentistSchedule.pending, (state) => {
          state.loading = true;
        })
        .addCase(createDentistSchedule.fulfilled, (state, action) => {
          state.error = false;
          state.loading = false;
          state.success = true;
          state.schedule = action.payload;
          state.message = "success";
        })
        .addCase(createDentistSchedule.rejected, (state, action) => {
          state.error = true;
          state.success = false;
          state.message = action.error;
          state.loading = false;
        });
    },
  });
  
  export default scheduleSlice.reducer;