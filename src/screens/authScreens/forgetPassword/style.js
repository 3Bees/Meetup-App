import React from "react";
import { StyleSheet } from "react-native";
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
    marginTop: responsiveHeight(4),
    flexDirection: "row",
    width: responsiveWidth(90),
    alignSelf: "center",
  },

  subtitle: {
    fontSize: responsiveFontSize(2.2),
    color: textColor.white,
    fontFamily: fontFamily.appTextBold,
    marginLeft: responsiveWidth(16),
  },
  PhoneInputview: {
    marginTop: responsiveHeight(7),
    width: responsiveWidth(90),
    borderWidth: responsiveWidth(0.3),
    borderColor: appColor.background,
    borderRadius: responsiveWidth(4),
    alignSelf: "center",
    height: responsiveHeight(8),
    paddingHorizontal: responsiveWidth(3),
  },
  PhoneInputtext: {
    color: textColor.white,
    fontSize: responsiveFontSize(1.8),
  },
  phoneInput: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: responsiveHeight(1),
  },
  phoneInputicon: {
    marginRight: responsiveWidth(2),
    // paddingLeft: responsiveWidth(5),
  },
  phoneInputlabel: {
    fontSize: responsiveFontSize(1.5),
    color: textColor.white,
    marginTop: responsiveHeight(1),
    height: responsiveHeight(2),
    fontWeight: "bold",
  },
  passwordview: {
    marginTop: responsiveHeight(1),
    width: responsiveWidth(90),
    borderWidth: responsiveWidth(0.3),
    borderColor: appColor.background,
    borderRadius: responsiveWidth(4),
    alignSelf: "center",
    height: responsiveHeight(8),
    paddingHorizontal: responsiveWidth(3),
    // paddingTop: responsiveWidth(1.1),
    paddingBottom: responsiveHeight(2.8),
    marginBottom: responsiveHeight(2),
  },
  passwordinput: {
    // marginBottom: responsiveHeight(2),
    color: textColor.white,
    fontSize: responsiveFontSize(1.8),
  },
  buttons: {
    width: responsiveWidth(70),
    height: responsiveHeight(7),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: textColor.white,
    borderRadius: responsiveWidth(5),
    marginTop: responsiveHeight(1),
    flexDirection: "row",
  },
  buttonsview: {
    marginTop: responsiveHeight(3.5),
  },
  confirmationtext: {
    color: textColor.white,
    fontSize: responsiveFontSize(1.8),
    textAlign: "center",
    fontFamily: fontFamily.appTextBold,
  },
  confirmationtextview: {
    marginTop: responsiveHeight(6),
  },
  confirmationview: {
    marginTop: responsiveHeight(1),
  },
  newpasswordtextview: {
    marginTop: responsiveHeight(8),
    alignItems: "center",
    marginBottom: responsiveHeight(2),
  },
  newpasswordtext: {
    fontSize: responsiveFontSize(1.9),
    color: textColor.white,
    fontFamily: fontFamily.appTextBold,
  },
  buttonsview1: {
    marginTop: responsiveHeight(2),
  },
  passwordupdatedtext: {
    fontSize: responsiveFontSize(2.5),
    color: textColor.primary,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: responsiveHeight(2),
  },
  ContniueTxt: {
    fontSize: responsiveFontSize(1.9),
    color: textColor.primary,
    textAlign: "center",
    marginTop: responsiveHeight(3),
    fontFamily: fontFamily.appTextRegular,
  },
  buttons1: {
    width: responsiveWidth(70),
    height: responsiveHeight(7),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: appColor.appbackground,
    borderRadius: responsiveWidth(5),
    marginTop: responsiveHeight(1),
    flexDirection: "row",
  },
  continuetologintext: {
    color: textColor.white,
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(1.9),
  },
  circlecheck: {
    alignSelf: "center",
  },
  buttonsview11: {
    marginTop: responsiveHeight(8),
  },
  resettext: {
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(1.9),
  },
});
