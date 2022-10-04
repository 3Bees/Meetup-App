/** @format */

import {
  Login,
  Splash,
  forgetPassword,
  SignUp,
  Verfication,
  EditProfile,
  ProfilePictures,
  AddPromts,
  About,
  Subscription,
  Payment,
  Paymentinfo,
  Payment1,
  AddOn,
  Premium11,
} from "../../screens";
import React from "react";
import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { textColor } from "../../constants/colors";
import SCREENS from "./screens";

const AuthStack = createStackNavigator();
const AuthApp = () => {
  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={textColor.secondary}
        barStyle={"light-content"}
      />
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
          animationTypeForReplace: "push",
        }}
        initialRouteName={SCREENS.SPLASH}
      >
        <AuthStack.Screen name={SCREENS.SPLASH} component={Splash} />
        <AuthStack.Screen
          options={{
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
          name={SCREENS.LOGIN}
          component={Login}
        />
        <AuthStack.Screen
          name={SCREENS.FORGET_PASSWORD}
          component={forgetPassword}
        />
        <AuthStack.Screen name={SCREENS.SIGNUP} component={SignUp} />
        <AuthStack.Screen name={SCREENS.VERFICATION} component={Verfication} />
        <AuthStack.Screen name={SCREENS.EDIT_PROFILE} component={EditProfile} />
        <AuthStack.Screen
          name={SCREENS.PROFILE_PICTURES}
          component={ProfilePictures}
        />
        <AuthStack.Screen name={SCREENS.ADD_PROMTS} component={AddPromts} />
        <AuthStack.Screen name={SCREENS.ABOUT} component={About} />
      </AuthStack.Navigator>
    </>
  );
};

export default AuthApp;
