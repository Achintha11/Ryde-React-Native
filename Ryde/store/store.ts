import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/ride/userSlice";
import driverReducer from "@/features/driver/driverSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    driver: driverReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
