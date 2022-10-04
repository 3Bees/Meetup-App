import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import {
  appColor,
  cardColor,
  iconColor,
  buttonColor,
  textColor,
} from "../../../constants/colors";
import { appImages } from "../../../assets/utility";
import { styles } from "./style";
import ImageView from "react-native-image-view";

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import RBSheet from "react-native-raw-bottom-sheet";
import { Icon } from "react-native-elements";
import { TextInput } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { fontFamily } from "../../../constants/fonts";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { Header } from "../../../components/header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../../../Backend/auth";

const AppScreen = (props) => {
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();

  const sign_out = async () => {
    AsyncStorage.removeItem("Token")
      .then(async () => {
        await logout().then(() => {
          props.navigation.replace("Auth");
        });
      })
      .catch(() => {
        props.navigation.replace("Auth");
      });
  };
  //
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={textColor.white} />
      <Header
        title={"Settings"}
        onPress1={() => props.navigation.goBack()}
        backIcon={"arrow-back-ios"}
        backIcontype={"material"}
        addicon={"arrow-back-ios"}
        addicontype={"material"}
        color={textColor.white}
        done={true}
      />
      <View>
        <TouchableOpacity
          style={styles.rbsheetbtn}
          onPress={() => {
            props.navigation.navigate("Addon");
          }}
        >
          <Text style={styles.rbsheetbtntxt}>Add Ons</Text>
          <Icon
            name={"chevron-small-right"}
            type={"entypo"}
            color={buttonColor.grey}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rbsheetbtn}
          onPress={() => {
            props.navigation.navigate("Subscription");
          }}
        >
          <Text style={styles.rbsheetbtntxt}>Upgrade Account</Text>
          <Icon
            name={"chevron-small-right"}
            type={"entypo"}
            color={buttonColor.grey}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.rbsheetbtn]}
          onPress={() => {
            props.navigation.navigate("ChangePas");
          }}
        >
          <Text style={styles.rbsheetbtntxt}>Change Password</Text>
          <Icon
            name={"chevron-small-right"}
            type={"entypo"}
            color={buttonColor.grey}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.rbsheetbtn]}
          onPress={() => {
            props.navigation.navigate("Notifacation");
          }}
        >
          <Text style={styles.rbsheetbtntxt}>Notifications Settings</Text>
          <Icon
            name={"chevron-small-right"}
            type={"entypo"}
            color={buttonColor.grey}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.rbsheetbtn]}
          onPress={() => {
            props.navigation.navigate("About", { nextRoute: "" });
          }}
        >
          <Text style={styles.rbsheetbtntxt}>About Keebo</Text>
          <Icon
            name={"chevron-small-right"}
            type={"entypo"}
            color={buttonColor.grey}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.rbsheetbtn]}
          onPress={() => {
            props.navigation.navigate("ContactUs");
          }}
        >
          <Text style={styles.rbsheetbtntxt}>Contact Us</Text>
          <Icon
            name={"chevron-small-right"}
            type={"entypo"}
            color={buttonColor.grey}
          />
        </TouchableOpacity>

        <View style={styles.resetbtnheader}>
          <TouchableOpacity style={styles.resetbtn1} onPress={() => sign_out()}>
            <Text style={styles.resetbtntxt}>LOGOUT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetbtn}>
            <Text style={styles.resetbtntxt2}>DELETE ACCOUNT</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logoview}>
          <Image
            source={appImages.KName1}
            style={{
              height: responsiveHeight(10),
              width: responsiveWidth(40),
              resizeMode: "contain",
            }}
          />
          <Text style={styles.versiontxt}>Version 1.2.3</Text>
        </View>
        <View style={styles.termsview}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("TermsCondition");
              refRBSheet.current.close();
            }}
          >
            <Text style={styles.termstxt}>Terms & Conditions</Text>
          </TouchableOpacity>
          <Icon name={"dot-single"} type={"entypo"} />
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Privacy");
              refRBSheet.current.close();
            }}
          >
            <Text style={styles.termstxt}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default AppScreen;
