import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import appointmentReducer from "../features/appointment/appointmentSlice";
import medicineReducer from "../features/medicine/medicineSlice"
import patientRecordReducer from "../features/patientRecord/patientRecordSlice"
import dentistReducer from "../features/dentist/dentistSlice"
import scheduleReducer from "../features/schedule/scheduleSlice";
import serviceReducer from "../features/service/serviceSlice";
import prescribeMedicineReducer from "../features/prescribeMedicine/prescribeMedicineSlice";
import invoiceReducer from "../features/invoice/invoiceSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  appointment: appointmentReducer,
  medicine: medicineReducer,
  patientRecord: patientRecordReducer,
  dentist: dentistReducer,
  schedule: scheduleReducer,
  service: serviceReducer,
  prescribeMedicine: prescribeMedicineReducer,
  invoice:  invoiceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
