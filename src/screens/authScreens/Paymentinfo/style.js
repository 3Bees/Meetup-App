import React from "react";
import { Platform, StyleSheet } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { textColor, theamColor, appColor } from "../../../constants/colors";
import { fontFamily } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: textColor.white,
  },
  subtitleview: {
    alignItems: "center",
    marginTop: Platform.OS === 'ios'? responsiveHeight(6.5) : responsiveHeight(4),
    marginHorizontal: responsiveWidth(5),
    flexDirection: "row",
  },

  subtitle: {
    fontSize: responsiveFontSize(2.2),
    color: textColor.primary,
    fontFamily: fontFamily.appTextBold,
    marginLeft: responsiveWidth(23),
  },
  buttons: {
    backgroundColor: textColor.secondary,
    width: responsiveWidth(70),
    height: responsiveHeight(7),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: responsiveWidth(5),
    marginTop: responsiveHeight(4),
    flexDirection: "row",
    marginBottom: responsiveHeight(1),
  },
  continuetext: {
    fontFamily: fontFamily.appTextMedium,
    color: "white",
    fontSize: responsiveFontSize(2.4),
    textTransform:'uppercase'
  },
  backbutton: {
    marginRight: responsiveWidth(22),
  },
  hairline: {
    width: responsiveWidth(100),
    height: responsiveHeight(0.2),
    backgroundColor: theamColor.grey1,
    marginTop: responsiveHeight(3),
  },
  detailsview: {
    marginTop: responsiveHeight(7),
    width: responsiveWidth(90),
    alignSelf: "center",
    borderWidth: responsiveWidth(0.3),
    borderColor: appColor.background,
    borderRadius: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    height: responsiveHeight(10),
  },
  detailsview1: {
    marginTop: responsiveHeight(2),
    width: responsiveWidth(90),
    alignSelf: "center",
    borderWidth: responsiveWidth(0.3),
    borderColor: appColor.background,
    borderRadius: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    height: responsiveHeight(10),
  },
  addtexts: {
    color: textColor.secondary,
    fontFamily: fontFamily.appTextMedium,
    fontSize: responsiveFontSize(1.5),
  },
  inputview: {
    marginTop: responsiveHeight(2),
    width: responsiveWidth(42.5),
    alignSelf: "center",
    borderWidth: responsiveWidth(0.3),
    borderColor: appColor.background,
    borderRadius: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    height: responsiveHeight(10),
  },
  viewbottom: {
    width: responsiveWidth(90),
    flexDirection: "row",
    alignSelf: "center",
  },
  inputview1: {
    marginTop: responsiveHeight(2),
    width: responsiveWidth(42.5),
    alignSelf: "center",
    borderWidth: responsiveWidth(0.3),
    borderColor: appColor.background,
    borderRadius: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    marginLeft: responsiveWidth(5),
    height: responsiveHeight(10),
  },
});
