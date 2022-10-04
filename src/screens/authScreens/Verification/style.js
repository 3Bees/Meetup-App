import React from "react";
import { StyleSheet, Platform } from "react-native";
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
  subtitleview: {
    alignItems: "center",
    marginTop: Platform.OS === "android" ? responsiveHeight(4) : responsiveHeight(6),
  },

  subtitle: {
    fontSize: responsiveFontSize(2.2),
    color: textColor.white,
    fontFamily: fontFamily.appTextBold,
  },

  buttons: {
    backgroundColor: 'white',
    width: responsiveWidth(70),
    height: responsiveHeight(7),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: responsiveWidth(5),
    marginTop: responsiveHeight(1),
    // marginBottom:Platform.OS==='android'? responsiveHeight(1):responsiveHeight(4),
    flexDirection: "row",
  },
  codeFieldRoot: { marginTop: responsiveHeight(7) },
  cell: {
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    borderWidth: responsiveWidth(0.3),
    borderColor: 'white',
    color:'white',
    borderRadius: responsiveWidth(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 20,
    alignSelf: 'center'
  },
  buttonsview: {
    marginTop: responsiveHeight(8),
  },
  confirmationtext: {
    color: textColor.white,
    fontSize: responsiveFontSize(1.8),
    textAlign: "center",
    fontFamily: fontFamily.appTextBold,
    width: responsiveWidth(90),
    alignSelf: "center",
  },
  confirmationtextview: {
    marginTop: responsiveHeight(6),
  },
  confirmationview: {
    marginTop: responsiveHeight(1),

  },
  buttonsview1: {
    marginTop: responsiveHeight(2),
  },
  reconfirmview: {
    marginTop: responsiveHeight(20),
    alignItems: "center",
  },
  reconfirmtext: {
    color: textColor.white,
    fontSize: responsiveFontSize(1.9),
    fontFamily: fontFamily.appTextRegular,
  },
  reconfirmtext1: {
    color: textColor.white,
    marginTop: responsiveHeight(1),
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2),
    textDecorationLine: "underline",
  },
  passwordupdatedtext: {
    fontSize: responsiveFontSize(2.5),
    color: textColor.primary,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: responsiveHeight(2),
  },
  ContniueTxt: {
    fontSize: responsiveFontSize(1.8),
    color: textColor.placholderColor,
    textAlign: "center",
    marginTop: responsiveHeight(3),
  },
  continuetologintext: {
    color: textColor.secondary,
  },
  rbtextsview: {
    marginHorizontal: responsiveWidth(5),
  },
  continuetext: {
    color: textColor.white,
  },
  ContniueTxt1: {
    fontSize: responsiveFontSize(1.6),
    color: textColor.placholderColor,
    textAlign: "center",
    marginTop: responsiveHeight(2.5),
  },
  buttons1: {
    width: responsiveWidth(70),
    height: responsiveHeight(7),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: appColor.appbackground,
    borderRadius: responsiveWidth(5),
    marginTop: responsiveHeight(2),
    flexDirection: "row",
  },
  PhoneInputview: {
    marginTop: responsiveHeight(4),
    width: responsiveWidth(90),
    borderWidth: responsiveWidth(0.3),
    borderColor: appColor.background,
    borderRadius: responsiveWidth(4),
    alignSelf: "center",
    height: responsiveHeight(8),
    paddingHorizontal: responsiveWidth(3),
  },
  phoneInputlabel: {
    fontSize: responsiveFontSize(1.5),
    color: appColor.appbackground,
    marginBottom: responsiveHeight(1),
    marginTop: responsiveHeight(1),
    // height: responsiveHeight(2),
  },
  PhoneInputtext: {
    color: textColor.primary,
    fontSize: responsiveFontSize(1.5),
  },
  phoneInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneInputicon: {
    marginRight: responsiveWidth(2),
    // marginTop: responsiveHeight(1),
    // paddingLeft: responsiveWidth(5),
  },
  verifytext: {
    fontFamily: fontFamily.appTextMedium,
    color: "black",
    fontSize: responsiveFontSize(2.4),
    textTransform: 'uppercase'
  },
});
