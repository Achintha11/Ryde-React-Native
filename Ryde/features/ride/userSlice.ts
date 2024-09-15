import { LocationStore } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const createDatabaseUser = createAsyncThunk(
  "user/createDatabaseUser",
  async (user: { name: string; email: string; clerkId: string }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, user);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: LocationStore = {
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUserLocation: (
      state,
      action: PayloadAction<{
        latitude: number;
        longitude: number;
        address: string;
      }>
    ) => {
      state.userLatitude = action.payload.latitude;
      state.userLongitude = action.payload.longitude;
      state.userAddress = action.payload.address;
    },

    setDestinationLocation: (
      state,
      action: PayloadAction<{
        latitude: number;
        longitude: number;
        address: string;
      }>
    ) => {
      state.destinationLatitude = action.payload.latitude;
      state.destinationLongitude = action.payload.longitude;
      state.destinationAddress = action.payload.address;
    },
  },
});

export const { setDestinationLocation, setUserLocation } = userSlice.actions;
export default userSlice.reducer;
