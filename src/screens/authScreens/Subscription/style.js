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
    marginTop:
      Platform.OS === "ios" ? responsiveHeight(6.5) : responsiveHeight(4),
    marginHorizontal: responsiveWidth(5),
    flexDirection: "row",
    justifyContent: "space-between",
  },

  subtitle: {
    fontSize: responsiveFontSize(2.2),
    color: textColor.primary,
    fontFamily: fontFamily.appTextBold,
  },
  buttons: {
    backgroundColor: textColor.secondary,
    width: responsiveWidth(70),
    height: responsiveHeight(7),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: responsiveWidth(5),
    marginTop: responsiveHeight(3),
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
    width: responsiveWidth(100),
    height: responsiveHeight(0.1),
    backgroundColor: theamColor.grey1,
    marginTop: responsiveHeight(4),
  },
  freesubview: {
    backgroundColor: appColor.cardbackground,
    width: responsiveWidth(90),
    alignSelf: "center",
    alignItems: "center",
    borderWidth: responsiveWidth(0.01),
    borderColor: textColor.lightgrey,
    borderRadius: responsiveWidth(6),
    marginTop: responsiveHeight(3),
    paddingBottom:responsiveHeight(3)
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
    marginTop: responsiveHeight(3),
    height: responsiveHeight(8),
    width: responsiveWidth(23),
    resizeMode: "contain",
  },
  freelogoimage2: {
    height: responsiveHeight(6),
    width: responsiveWidth(12),
    resizeMode: "contain",
  },
  keebofreetext: {
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(2),
    textAlign: "center",
  },
  pricetext: {
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2.5),
    marginTop: responsiveHeight(0.5),
    textAlign: "center",
    color: appColor.appbackground,
  },
  detailstext: {
    fontFamily: fontFamily.appTextRegular,
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(0.5),
    marginBottom: responsiveHeight(0.5),
    textAlign: "center",
    color: textColor.placholderColor,
    lineHeight: responsiveHeight(3.5),
  },
  premiumsubview: {
    height: Platform.OS === 'ios' ? responsiveHeight(35) : responsiveHeight(35),
    width: responsiveWidth(90),
    alignSelf: "center",
    alignItems: "center",
    marginTop: responsiveHeight(3),
    borderWidth: responsiveWidth(0.01),
    borderColor: textColor.lightgrey,
    borderRadius: responsiveWidth(6),
    backgroundColor: appColor.cardbackground
  },
  premiumsubview2: {
    height: responsiveHeight(32),
    width: responsiveWidth(88),
    alignSelf: "center",
    alignItems: "center",
    borderRadius: responsiveWidth(6),
    paddingTop:responsiveHeight(1.5)
  },
  pricetext1: {
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2.5),
    textAlign: "center",
    color: textColor.secondary,
  },
  detailstext1: {
    fontFamily: fontFamily.appTextRegular,
    fontSize: responsiveFontSize(2),
    textAlign: "center",
    color: '#8e8e8e',
    lineHeight: responsiveHeight(3),
    marginTop:responsiveHeight(1.6),

  },
  keebofreetext1: {
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(1),
    textAlign: "center",
    color:textColor.lightblack
  },
});
