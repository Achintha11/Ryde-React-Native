import { View, Text } from "react-native";
import React from "react";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => {
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full rounded-2xl"
      tintColor="black"
      mapType="mutedStandard"
      showsUserLocation={true}
      userInterfaceStyle="dark"
      showsPointsOfInterest={false}
    ></MapView>
  );
};

export default Map;