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
    marginTop: Platform.OS === 'ios' ? responsiveHeight(6.5): responsiveHeight(4),
    marginHorizontal: responsiveWidth(5),
    flexDirection: "row",
  },

  subtitle: {
    fontSize: responsiveFontSize(2.2),
    color: textColor.primary,
    fontFamily: fontFamily.appTextBold,
    marginLeft: responsiveWidth(26),
  },
  buttons: {
    width: responsiveWidth(70),
    height: Platform.OS === "ios" ? responsiveHeight(6) : responsiveHeight(7),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: appColor.appbackground,
    borderRadius: responsiveWidth(6),
    marginTop: responsiveHeight(12),
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
  flatlistMainview: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: responsiveWidth(90),
    alignSelf: "center",
    backgroundColor: "#E5F2F8",
    marginTop: responsiveHeight(1.5),
    alignItems: "center",
    borderWidth: responsiveWidth(0.1),
    borderColor: textColor.lightgrey,
    borderRadius: responsiveWidth(6),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    height: responsiveHeight(10),
  },
  Title: {
    color: appColor.appbackground,
    marginBottom: responsiveHeight(1),
    fontFamily: fontFamily.appTextBold,
  },
  bottomview: {
    marginTop: responsiveHeight(25),
  },
  hairline: {
    width: responsiveWidth(90),
    height: responsiveHeight(0.1),
    backgroundColor: appColor.appbackground,
    marginTop: responsiveHeight(3),
    alignSelf: "center",
  },
  freesubview: {
    backgroundColor: appColor.cardbackground,
    height: responsiveHeight(19),
    width: responsiveWidth(90),
    alignSelf: "center",
    marginTop: responsiveHeight(1.5),
    borderRadius: responsiveWidth(4),
  },
  bgimage: {
    borderWidth: responsiveWidth(0.01),
    borderColor: textColor.lightgrey,
    borderRadius: responsiveWidth(6),
    height: responsiveHeight(37),
    width: responsiveWidth(90),
    marginTop: responsiveHeight(0.2),
    marginLeft: responsiveWidth(0.5),
  },
  freelogoimage: {
    height: responsiveHeight(4.5),
    width: responsiveWidth(9),
    resizeMode: "contain",
    justifyContent: "center",
    marginTop: responsiveHeight(2),
  },
  keebofreetext: {
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(2),
    textAlign: "center",
    marginLeft: responsiveWidth(2),
  },
  pricetext: {
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2.5),
    marginTop: responsiveHeight(2),
    textAlign: "center",
    color: appColor.appbackground,
  },
  detailstext: {
    fontFamily: fontFamily.appTextRegular,
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(2),
    // textAlign: "center",
    color: textColor.placholderColor,
    lineHeight: responsiveHeight(3.5),
    marginLeft: responsiveWidth(5),
  },
  premiumsubview: {
    height: responsiveHeight(38),
    width: responsiveWidth(92),
    alignSelf: "center",
    alignItems: "center",
    marginTop: responsiveHeight(3),
    borderWidth: responsiveWidth(0.01),
    borderColor: textColor.lightgrey,
    borderRadius: responsiveWidth(6),
  },
  pricetext1: {
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2.5),
    marginTop: responsiveHeight(2),
    textAlign: "center",
    color: textColor.white,
  },
  detailstext1: {
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(2),
    textAlign: "center",
    color: textColor.white,
    lineHeight: responsiveHeight(3),
  },
  keebofreetext1: {
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(2),
    textAlign: "center",
    color: textColor.white,
  },
  titleview: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: responsiveWidth(90),
    alignSelf: "center",
    marginTop: responsiveHeight(6),
  },
  title1: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: fontFamily.appTextBold,
  },
  title2: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: fontFamily.appTextBold,
    color: appColor.appbackground,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: responsiveWidth(80),
    alignSelf: "center",
    marginTop: responsiveHeight(1),
  },
  logoview: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleview1: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: responsiveWidth(90),
    alignSelf: "center",
    marginTop: responsiveHeight(2),
  },
  flatlisttopview: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: responsiveWidth(90),
    alignSelf: "center",
    paddingHorizontal: responsiveWidth(4),
    borderWidth: responsiveWidth(0.03),
    borderColor: appColor.background,
    borderRadius: responsiveWidth(4),
    height: responsiveHeight(7),
    marginTop: responsiveHeight(1.5),
    alignItems: "center",
  },
  flatlistfirstview: {
    flexDirection: "row",
  },
  numberofitems: {
    marginLeft: responsiveWidth(2),
  },
  subtotalview: {
    width: responsiveWidth(90),
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: responsiveHeight(2.5),
  },
  titletext: {
    fontFamily: fontFamily.appTextRegular,
    fontSize: responsiveFontSize(1.8),
  },
  titleprice: {
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(1.8),
  },
  titletext1: {
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2.3),
  },
  titleprice1: {
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2.3),
  },
});