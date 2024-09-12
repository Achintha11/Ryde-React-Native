import { DriverStore, MarkerData } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: DriverStore = {
  drivers: [],
  selectedDriver: null,
};

const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    setSelectedDriver: (state, action: PayloadAction<number>) => {
      state.selectedDriver = action.payload;
    },
    setDrivers: (state, action: PayloadAction<MarkerData[]>) => {
      state.drivers = action.payload;
    },
    clearSelectedDriver: (state) => {
      state.selectedDriver = null;
    },
  },
});

export const { setSelectedDriver, setDrivers, clearSelectedDriver } =
  driverSlice.actions;
export default driverSlice.reducer;
