import { View, Text } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/typedHooks";
import RideLayout from "@/components/RideLayout";
import GoogleTextInput from "@/components/GoogleTextInput";
import { icons } from "@/constants";
import {
  setDestinationLocation,
  setUserLocation,
} from "@/features/ride/userSlice";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const FindRide = () => {
  const dispatch = useAppDispatch();
  const { userAddress, destinationAddress } = useAppSelector(
    (store) => store.user
  );
  return (
    <RideLayout title="Ride">
      <View className="my-1">
        <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => dispatch(setUserLocation(location))}
        />
      </View>

      <View className="mb-2">
        <Text className="text-lg font-JakartaSemiBold mb-3">To</Text>
        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="transparent"
          handlePress={(location) => dispatch(setDestinationLocation(location))}
        />
      </View>
      <CustomButton
        title="Find now"
        onPress={() => router.push("./confirm-ride")}
      />
    </RideLayout>
  );
};

export default FindRide;
