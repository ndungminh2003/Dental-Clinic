import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import appointmentService from "./appointmentServices";

const initialState = {
  appointment: [],
  error: false,
  loading: false,
  success: false,
  message: "",
};

export const getOneAppointment = createAsyncThunk(
  "appointment/get-one",
  async (thunkAPI) => {
    try {
      return await appointmentService.getOneAppointment();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllAppointment = createAsyncThunk(
  "appointment/get-all",
  async (thunkAPI) => {
    try {
      return await appointmentService.getAllAppointment();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const makeAppointment = createAsyncThunk(
  "appointment/make-appointment",
  async (appointment, thunkAPI) => {
    try {
      return await appointmentService.makeAppointment(appointment);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCustomerAppointment = createAsyncThunk(
  "appointment/get-customer-appointment",
  async (customerId, thunkAPI) => {
    try {
      return await appointmentService.getCustomerAppointment(customerId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getDentistAppointment = createAsyncThunk(
  "appointment/get-dentist-appointment",
  async (dentistId, thunkAPI) => {
    try {
      return await appointmentService.getDentistAppointment(dentistId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  "appointment/cancel-appointment",
  async (appointment, thunkAPI) => {
    try {
      return await appointmentService.cancelAppointment(appointment);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAppointmentStatus = createAsyncThunk(
  "appointment/update-appointment-status",
  async (appointment, thunkAPI) => {
    try {
      return await appointmentService.updateAppointmentStatus(appointment);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAppointment.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.appointment = action.payload;
        state.message = "success";
      })
      .addCase(getAllAppointment.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      })
      .addCase(getOneAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneAppointment.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.appointment = action.payload;
        state.message = "success";
      })
      .addCase(getOneAppointment.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      })
      .addCase(makeAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(makeAppointment.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.appointment = action.payload;
        state.message = "success";
      })
      .addCase(makeAppointment.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      })
      .addCase(getCustomerAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomerAppointment.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.appointment = action.payload;
        state.message = "success";
      })
      .addCase(getCustomerAppointment.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      })
      .addCase(getDentistAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDentistAppointment.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.appointment = action.payload;
        state.message = "success";
      })
      .addCase(getDentistAppointment.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      })
      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.message = action.payload;
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      })
      .addCase(updateAppointmentStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.message = action.payload;
      })
      .addCase(updateAppointmentStatus.rejected, (state, action) => {
        state.error = true;
        state.success = false;
        state.message = action.error;
        state.loading = false;
      });
  },
});

export default appointmentSlice.reducer;
