import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import invoiceService from "./invoiceServices";
const initialState = {
    invoice: [],
    error: false,
    loading: false,
    success: false,
    message: "",
  };

export const getInvoiceByRecordId = createAsyncThunk(
  "invoice/get-invoice-by-record-id",
  async (recordId,thunkAPI) => {
    try {
      return await invoiceService.getInvoiceByRecordId(recordId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addInvoice = createAsyncThunk(
  "invoice/add-invoice",
  async (invoice, thunkAPI) => {
    try {
      return await invoiceService.addInvoice(invoice);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateInvoiceStatus = createAsyncThunk(
  "invoice/update-invoice-status",
  async (invoiceId, thunkAPI) => {
    try {
      return await invoiceService.updateInvoiceStatus(invoiceId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const invoiceSlice = createSlice({
    name: "invoice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getInvoiceByRecordId.pending, (state) => {
          state.loading = true;
        })
        .addCase(getInvoiceByRecordId.fulfilled, (state, action) => {
          state.error = false;
          state.loading = false;
          state.success = true;
          state.invoice = action.payload;
          state.message = "success";
        })
        .addCase(getInvoiceByRecordId.rejected, (state, action) => {
          state.error = true;
          state.success = false;
          state.message = action.error;
          state.loading = false;
        })
        .addCase(addInvoice.pending, (state) => {
          state.loading = true;
        })
        .addCase(addInvoice.fulfilled, (state, action) => {
          state.error = false;
          state.loading = false;
          state.success = true;
          state.invoice = action.payload;
          state.message = "success";
        })
        .addCase(addInvoice.rejected, (state, action) => {
          state.error = true;
          state.success = false;
          state.message = action.error;
          state.loading = false;
        })
        .addCase(updateInvoiceStatus.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateInvoiceStatus.fulfilled, (state, action) => {
          state.error = false;
          state.loading = false;
          state.success = true;
          state.invoice = action.payload;
          state.message = "success";
        })
        .addCase(updateInvoiceStatus.rejected, (state, action) => {
          state.error = true;
          state.success = false;
          state.message = action.error;
          state.loading = false;
        });
    },
  });
  
  export default invoiceSlice.reducer;