import React from "react";
import { StyleSheet,Platform } from "react-native";
import { appColor, textColor } from "../../../constants/colors";
import { fontFamily } from "../../../constants/fonts";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.appbackground,
  },
  titleview: {
    alignItems: "center",
    marginTop: responsiveHeight(4),
  },
  subtitleview: {
    marginTop: Platform.OS==='android'? responsiveHeight(4):responsiveHeight(6),
    flexDirection: "row",
    
    alignItems: "center",
    justifyContent:'space-between'
  },
  title: {
    fontSize: responsiveFontSize(6),
    color: textColor.white,
  },
  subtitle: {
    fontSize: responsiveFontSize(2.8),
    color: textColor.white,
    fontFamily: fontFamily.appTextBold,
  },
  PhoneInputview: {
    marginTop:Platform.OS==='android'? responsiveHeight(5):responsiveHeight(3.5),
    width: responsiveWidth(90),
    borderWidth: responsiveWidth(0.3),
    borderColor: appColor.background,
    borderRadius: responsiveWidth(4),
    alignSelf: "center",
    height: responsiveHeight(9),
    paddingHorizontal: responsiveWidth(3),
    // paddingTop: responsiveWidth(1),
  },
  PhoneInputtext: {
    color: textColor.white,
    fontSize: responsiveFontSize(2.4),
  },
  phoneInput: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: responsiveHeight(1),
  },
  phoneInputicon: {
    marginRight: responsiveWidth(2),
    // marginTop: responsiveHeight(1),
    // paddingLeft: responsiveWidth(5),
  },
  phoneInputlabel: {
    fontSize: responsiveFontSize(1.4),
    color: textColor.white,
    fontFamily: fontFamily.appTextBold,
    marginTop: responsiveHeight(1),
  },
  passwordview: {
    marginTop: responsiveHeight(2.5),
    width: responsiveWidth(90),
    borderWidth: responsiveWidth(0.3),
    borderColor: appColor.background,
    borderRadius: responsiveWidth(4),
    alignSelf: "center",
    height: responsiveHeight(8),
    paddingHorizontal: responsiveWidth(3),
  },
  passwordinput: {
    color: textColor.white,
    fontSize: responsiveFontSize(1.8),
    marginBottom: responsiveHeight(2),
  },
  remembermetextview: {
    flexDirection: "row",
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(2.5),
    alignItems: "center",
  },
  remembermetext: {
    color: textColor.white,
    fontSize: responsiveFontSize(1.6),
    marginLeft: responsiveWidth(2),
    fontFamily: fontFamily.appTextRegular,
  },
  buttons1: {
    backgroundColor: 'white',
    width: responsiveWidth(70),
    height: responsiveHeight(7),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: responsiveWidth(5),
      flexDirection: "row",
    marginTop: responsiveHeight(25),
    flexDirection: "row",
  },
  passwordupdatedtext: {
    fontSize: responsiveFontSize(2.5),
    color: textColor.primary,
    fontFamily: fontFamily.appTextBold,
    textAlign: "center",
    marginTop: responsiveHeight(2),
  },
  ContniueTxt: {
    fontSize: responsiveFontSize(1.8),
    color: textColor.primary,
    textAlign: "center",
    marginTop: responsiveHeight(3),
  },
  continuetologintext: {
    fontFamily: fontFamily.appTextMedium,
    color: 'black',
    fontSize: responsiveFontSize(2.4),
    textTransform:'uppercase'
  },
  buttons: {
    width: responsiveWidth(70),
    height: responsiveHeight(7),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: appColor.appbackground,
    borderRadius: responsiveWidth(5),
    marginTop: responsiveHeight(6),
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rbtextsview: {
    marginHorizontal: responsiveWidth(5),
  },
  continuetext: {
    fontFamily: fontFamily.appTextMedium,
    color: "white",
    fontSize: responsiveFontSize(2.4),
    textTransform:'uppercase'
  },
  ContniueTxt1: {
    fontSize: responsiveFontSize(1.8),
    color: textColor.placholderColor,
    fontFamily: fontFamily.appTextRegular,
    textAlign: "center",
    marginTop: responsiveHeight(2.5),
  },
  circlecheck: {
    alignSelf: "center",
  },
  iconcheck: {
    height: responsiveWidth(4.5),
    width: responsiveWidth(4.5),
    resizeMode: "contain",
  },
  subtitle1: {
    fontSize: responsiveFontSize(2.8),
    color: textColor.white,
    fontFamily: fontFamily.appTextBold,
    textAlign: "center",
    marginTop: responsiveHeight(6),
  },
});
