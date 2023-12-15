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
        });
    },
  });
  
  export default invoiceSlice.reducer;