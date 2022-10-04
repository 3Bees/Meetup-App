/** @format */

import {
  Home,
  Profile,
  Chat,
  Game,
  OtherProfile,
  About,
  ContactUs,
  AddOn,
  ChangePas,
  Notifacation,
  GiftedChat,
  LocationDetail,
  ProfileImage,
  TermsCondition,
  Edit,
  Subscription,
  Payment,
  Paymentinfo,
  Payment1,
  Report,
  AddPromts,
  EditPrompts,
  Premium11,
  EditProfilePictures,
  Privacy,
  Userprofile,
  Settings
} from "../../screens";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

import { Icon } from "react-native-elements";
import React from "react";
import { View, StatusBar, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  appColor,
  cardColor,
  iconColor,
  textColor,
} from "../../constants/colors";

import FA from "react-native-vector-icons/FontAwesome";
import FA5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import { appImages } from "../../assets/utility";

const tabBarHeight = responsiveHeight(8);
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator(); //Notification
const ChatStack = createStackNavigator(); //Notification
const SettingsStack = createStackNavigator(); //Settings

const MainApp = createStackNavigator();

const MainTab = createBottomTabNavigator();

const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"Home"}
    >
      <HomeStack.Screen name={"Home"} component={Home} />
    </HomeStack.Navigator>
  );
};
const ChatStackScreens = () => {
  return (
    <ChatStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"Chat"}
    >
      <ChatStack.Screen name={"Chat"} component={Chat} />
    </ChatStack.Navigator>
  );
};
const ProfileStackScreens = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"Userprofile"}
    >
      <ProfileStack.Screen name={"Userprofile"} component={Userprofile} />
    </ProfileStack.Navigator>
  );
};
const SettingsStackScreens = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"Settings"}
    >
      <SettingsStack.Screen name={"Settings"} component={Settings} />
    </SettingsStack.Navigator>
  );
};

const MainTabScreens = (props) => {
  return (
    <MainTab.Navigator
      barStyle={{ backgroundColor: appColor.primary }}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: iconColor.secondary,
        inactiveTintColor: iconColor.secondary,
        allowFontScaling: true,
        style: {
          backgroundColor: cardColor.primary,
          paddingBottom: responsiveHeight(1.5),
          //  backgroundColor: iconColor.secondary,
          //  borderTopLeftRadius: responsiveWidth(6),
          //  borderTopRightRadius: responsiveWidth(6),
          height: tabBarHeight,
        },
      }}
      initialRouteName={"Home"}
    >
      <MainTab.Screen
        name={"Chat"}
        component={ChatStackScreens}
        options={(props) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  height: tabBarHeight,
                  justifyContent: "flex-end",
                  width: responsiveWidth(17),
                  paddingBottom: responsiveHeight(2),
                }}
              >
                {focused ? (
                  <Image
                    source={appImages.chatblueIcon}
                    style={{
                      height: responsiveWidth(7),
                      width: responsiveWidth(7),
                      resizeMode: "contain",
                    }}
                  />
                ) : (
                  <Image
                    source={appImages.chatblack}
                    style={{
                      height: responsiveWidth(7),
                      width: responsiveWidth(7),
                      resizeMode: "contain",
                    }}
                  />
                )}
              </View>
            );
          },
        })}
      />
      <MainTab.Screen
        name={"Home"}
        component={HomeStackScreens}
        initialRouteName={"Home"}
        options={() => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  height: tabBarHeight,
                  justifyContent: "flex-end",
                  width: responsiveWidth(15),
                  paddingBottom: responsiveHeight(2),
                }}
              >
                {focused ? (
                  <Image
                    source={appImages.DSolid}
                    style={{
                      height: responsiveWidth(7),
                      width: responsiveWidth(7),
                      resizeMode: "contain",
                    }}
                  />
                ) : (
                  <Image
                    source={appImages.DBorder}
                    style={{
                      height: responsiveWidth(7),
                      width: responsiveWidth(7),
                      resizeMode: "contain",
                    }}
                  />
                )}
              </View>
            );
          },
        })}
      />

      <MainTab.Screen
        name={"Userprofile"}
        component={ProfileStackScreens}
        options={(props) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  height: tabBarHeight,
                  justifyContent: "center",
                  width: responsiveWidth(15),
                }}
              >
                {focused ? (
                  <Image
                    source={appImages.personblueIcon}
                    style={{
                      height: responsiveWidth(7),
                      width: responsiveWidth(7),
                      resizeMode: "contain",
                      marginTop: responsiveHeight(0.5),
                    }}
                  />
               
                ) : (
                  <Image
                    source={appImages.personblueIcon22}
                    style={{
                      height: responsiveWidth(7),
                      width: responsiveWidth(7),
                      resizeMode: "contain",
                      marginTop: responsiveHeight(0.5),
                      left:responsiveWidth(0.6)
                    }}
                  />
                )}
              </View>
            );
          },
        })}
      />

      {/* <MainTab.Screen
        name={"Settings"}
        component={SettingsStackScreens}
        options={(props) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  height: tabBarHeight,
                  justifyContent: "center",
                  width: responsiveWidth(15),
                }}
              >
                {focused ? (
                  // <Image
                  //   source={appImages.personblueIcon}
                  //   style={{
                  //     height: responsiveWidth(7),
                  //     width: responsiveWidth(7),
                  //     resizeMode: "contain",
                  //     marginTop: responsiveHeight(0.7),
                  //   }}
                  // />
                  <Icon
                    type={"ionicon"}
                    name={"settings"}
                    color={textColor.secondary}
                    size={responsiveFontSize(3.5)}
                    style={{ marginTop: responsiveHeight(0.5) }}
                  />
                ) : (
                  // <Image
                  //   source={appImages.personblackIcon}
                  //   style={{
                  //     height: responsiveWidth(7),
                  //     width: responsiveWidth(7),
                  //     resizeMode: "contain",
                  //     marginTop: responsiveHeight(0.7),
                  //   }}
                  // />
                  <Icon
                    type={"ionicon"}
                    name={"settings"}
                    color={textColor.lightgrey}
                    size={responsiveFontSize(3.5)}
                    style={{ marginTop: responsiveHeight(0.5) }}
                  />
                )}
              </View>
            );
          },
        })}
      /> */}
    </MainTab.Navigator>
  );
};

const App = () => {
  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={textColor.white}
        barStyle={"dark-content"}
      />
      <MainApp.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: false }}
        initialRouteName={"Main"}
      >
        <MainApp.Screen name={"Main"} component={MainTabScreens} />
        <MainApp.Screen
          name={"Game"}
          component={Game}
          options={{ gestureEnabled: false }}
        />
        <MainApp.Screen name={"Profile"} component={Profile} />
        <MainApp.Screen name={"SettingsStackScreens"} component={SettingsStackScreens} />
        <MainApp.Screen name={"OtherProfile"} component={OtherProfile} />
        <MainApp.Screen name={"About"} component={About} />
        <MainApp.Screen name={"ContactUs"} component={ContactUs} />
        <MainApp.Screen name={"Addon"} component={AddOn} />
        <MainApp.Screen name={"ChangePas"} component={ChangePas} />
        <MainApp.Screen name={"Notifacation"} component={Notifacation} />
        <MainApp.Screen name={"GiftedChat"} component={GiftedChat} />
        <MainApp.Screen name={"LocationDetail"} component={LocationDetail} />
        <MainApp.Screen name={"ProfileImage"} component={ProfileImage} />
        <MainApp.Screen name={"TermsCondition"} component={TermsCondition} />
        <MainApp.Screen name={"Edit"} component={Edit} />
        <MainApp.Screen name={"Subscription"} component={Subscription} />
        <MainApp.Screen name={"Payment"} component={Payment} />
        <MainApp.Screen name={"Paymentinfo"} component={Paymentinfo} />
        <MainApp.Screen name={"Payment1"} component={Payment1} />
        <MainApp.Screen name={"Report"} component={Report} />
        <MainApp.Screen name={"EditPrompts"} component={EditPrompts} />
        <MainApp.Screen name={"Premium"} component={Premium11} />
        <MainApp.Screen name={"Privacy"} component={Privacy} />
        <MainApp.Screen
          name={"EditProfilePictures"}
          component={EditProfilePictures}
        />
      </MainApp.Navigator>
    </>
  );
};
export default App;
