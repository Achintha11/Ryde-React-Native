import {
  View,
  Text,
  ScrollView,
  Image,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import Modal, { ReactNativeModal } from "react-native-modal";
import { useAppDispatch } from "@/hooks/typedHooks";
import { createDatabaseUser } from "@/features/ride/userSlice";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const deviceWidth = Dimensions.get("screen").width;
  const deviceHeight = Dimensions.get("screen").height;

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        dispatch(
          createDatabaseUser({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId!,
          })
        );
        //Todo : create a database user
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "verification failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: "failed",
        error: err.errors[0].longMessage,
      });
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView className="flex-1 bg-white">
          <View className="relative w-full h-[250px]">
            <Image
              source={images.signUpCar}
              className="z-0 w-full h-[250px]"
              resizeMode="cover"
            />

            <Text className="absolute text-2xl font-JakartaBold bottom-5 left-5">
              Create Your Account
            </Text>
          </View>

          <View className="p-5 ">
            <InputField
              label="Name"
              placeholder="Enter your Name"
              icon={icons.person}
              value={form.name}
              onChangeText={(value) => setForm({ ...form, name: value })}
            />
            <InputField
              label="Email"
              placeholder="Enter your Email"
              icon={icons.email}
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
            />
            <InputField
              label="Password"
              placeholder="Enter your Password"
              icon={icons.lock}
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
            />
            <CustomButton
              title="Sign Up"
              onPress={onSignUpPress}
              className="mt-6"
            />

            <OAuth />

            <Link
              href="/sign-in"
              className="text-sm text-center mt-10 text-general-200 font-JakartaSemiBold"
            >
              <Text>Already have a Account ? </Text>
              <Text className="text-primary-500"> Log In</Text>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ReactNativeModal
        deviceHeight={deviceHeight}
        deviceWidth={deviceWidth}
        backdropOpacity={0.6}
        isVisible={
          verification.state === "pending" || verification.state === "failed"
        }
        onModalHide={() => {
          if (verification.state === "success") {
            setShowSuccessModal(true);
          }
        }}
      >
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Text className="text-2xl font-JakartaExtraBold mb-2">
            Verification
          </Text>
          <Text className="mb-5 font-Jakarta">
            We've sent a verification code to {form.email}
          </Text>
          <InputField
            keyboardType="numeric"
            icon={icons.lock}
            label="Code"
            placeholder="Enter your Verification Code"
            value={verification.code}
            onChangeText={(value) =>
              setVerification({ ...verification, code: value })
            }
          />

          {verification.error && (
            <Text className="text-red-500 text-sm mt-1">
              {verification.error}
            </Text>
          )}

          <CustomButton
            title="Verify Email"
            onPress={onPressVerify}
            className="mt-5 bg-green-500"
          />
        </View>
      </ReactNativeModal>

      {/* Verification modal */}
      <ReactNativeModal
        deviceHeight={deviceHeight}
        deviceWidth={deviceWidth}
        backdropOpacity={0.6}
        coverScreen
        isVisible={showSuccessModal}
      >
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Image
            source={images.check}
            className="w-[110px] h-[110px] mx-auto my-5"
          />
          <Text className="text-center font-JakartaBold text-2xl ">
            Verified
          </Text>
          <Text className="text-center text-gray-400 mt-2 ">
            Your have successfully verified your account
          </Text>
          <CustomButton
            title="Continue"
            onPress={() => router.replace("/(root)/(tabs)/home")}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </>
  );
};

export default SignUp;
