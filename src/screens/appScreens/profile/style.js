import React from "react";
import { Platform, StyleSheet } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import {
  buttonColor,
  cardColor,
  textColor,
  appColor,
} from "../../../constants/colors";
import { fontFamily } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    alignSelf: "flex-end",
  },
  cover: {
    flex: 1,
    //  paddingTop:responsiveHeight(1)
  },
  nametxt: {
    fontSize: responsiveFontSize(2.5),
    fontFamily: fontFamily.appTextBold,
    color: textColor.white,
    marginTop: responsiveHeight(1),
  },
  ringbtnimage2: {
    height: responsiveHeight(3),
    width: responsiveWidth(5),
    resizeMode: "contain",
  },
  card: {
    width: responsiveWidth(90),
    backgroundColor: cardColor.primary,
    borderRadius: responsiveWidth(3),
    alignSelf: "center",
    marginTop: responsiveHeight(2),
    padding: responsiveWidth(3),
    // shadowColor: textColor.secondary,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
  },
  resetbtn1: {
    marginVertical: responsiveHeight(2.5),
    backgroundColor: textColor.secondary,
    width: responsiveWidth(90),
    height: responsiveHeight(7),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: responsiveWidth(5),
  },
  resetbtntxt: {
    fontFamily: fontFamily.appTextMedium,
    color: "white",
    fontSize: responsiveFontSize(2.4),
  },
  txt: {
    color: textColor.primary,
    fontSize: responsiveFontSize(2.2),
    fontFamily: fontFamily.appTextRegular,
    paddingVertical: responsiveHeight(1),
  },
  biotxt: {
    color: textColor.secondary,
    marginBottom: responsiveHeight(1),
    fontFamily: fontFamily.appTextBold,
  },
  myphotoview: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: responsiveWidth(90),
    alignSelf: "center",
    marginTop: responsiveHeight(3),
  },
  image: {
    height: responsiveHeight(35),
    width: responsiveWidth(40),
    marginLeft: responsiveWidth(2),
    borderRadius: responsiveWidth(4),
  },
  dp: {
    height: responsiveWidth(120),
    width: responsiveWidth(100),
    borderRadius: responsiveWidth(5),
    alignSelf: "center",
    // marginTop: responsiveHeight(2),
  },
  circlecard2: {
    height: responsiveWidth(120),
    // backgroundColor:'red',
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    position: Platform.OS === "android" ? "absolute" : null,
    paddingHorizontal: responsiveWidth(3),
  },
  circlecard3: {
    height: responsiveWidth(100),
    // backgroundColor:'red',
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    position: Platform.OS === "android" ? "absolute" : null,
    right: 0,
    paddingHorizontal: responsiveWidth(3),
  },
  myphototxt: {
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(1.7),
  },
  Promptscard: {
    backgroundColor: cardColor.secondary,
    width: responsiveWidth(90),
    borderRadius: responsiveWidth(5),
    alignSelf: "center",
    marginTop: responsiveHeight(2),
    padding: responsiveWidth(3),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    marginBottom: responsiveHeight(2),
  },
  circlecard: {
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    borderRadius: responsiveWidth(10 / 2),
    backgroundColor: cardColor.primary,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: responsiveWidth(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  circlecardview: {
    flexDirection: "row",
    position: "absolute",
    width: responsiveWidth(100),
    justifyContent: "space-between",
    zIndex: 1,
    marginTop: responsiveHeight(4),
    alignSelf: "flex-end",
    paddingRight: responsiveWidth(5),
    paddingTop: Platform.OS === "ios" ? responsiveHeight(3) : 0,
  },
  rbsheetbtn: {
    borderTopWidth: responsiveWidth(0.3),
    height: responsiveHeight(7),
    paddingLeft: responsiveWidth(5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: responsiveWidth(5),
    borderBottomColor: buttonColor.grey,
    borderTopColor: buttonColor.grey,
  },
  rbsheetbtntxt: {
    fontFamily: fontFamily.appTextRegular,
    fontSize: responsiveFontSize(2),
    color: textColor.primary,
  },
  termsview: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: responsiveHeight(2),
  },
  termstxt: {
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2),
  },
  logoview: {
    alignSelf: "center",
    marginTop: responsiveHeight(4),
    alignItems: "center",
  },
  versiontxt: {
    color: textColor.secondary,
    textAlign: "center",
    marginTop: responsiveHeight(0.5),
  },
  unMatchText: {
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2),
    width: responsiveWidth(70),
    textAlign: "center",
    alignSelf: "center",
    marginTop: responsiveHeight(8),
  },
  unMatchText1: {
    fontSize: responsiveFontSize(1.5),
    color: textColor.lightgrey,
    width: responsiveWidth(70),
    alignSelf: "center",
    textAlign: "center",
    marginTop: responsiveHeight(1),
  },
  btnGroup: {
    flexDirection: "row",
    width: responsiveWidth(90),
    alignSelf: "center",
    // backgroundColor: "red",

    justifyContent: "center",
    marginTop: responsiveHeight(2),
  },
  noBtn: {
    backgroundColor: buttonColor.grey,
    width: responsiveWidth(30),
    height: responsiveHeight(6),
    justifyContent: "center",
    alignItems: "center",
    marginRight: responsiveWidth(3),
    borderRadius: responsiveWidth(5),
  },
  yesBtn: {
    backgroundColor: textColor.secondary,
    width: responsiveWidth(30),
    height: responsiveHeight(6),
    justifyContent: "center",
    alignItems: "center",
    // marginRight: responsiveWidth(3),
    borderRadius: responsiveWidth(5),
  },
  yesTxt: {
    fontFamily: fontFamily.appTextBold,
    color: "white",
  },
  noTxt: {
    fontFamily: fontFamily.appTextBold,
  },
  subContainer: {
    backgroundColor: "#fff",
    elevation: 10,
    flex: 0.9,
    borderTopEndRadius: responsiveWidth(9),
    borderTopStartRadius: responsiveWidth(9),
  },
  infoheading: {
    color: textColor.secondary,
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2),
  },
  detailsview11: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsview: {
    marginTop: responsiveHeight(2),
    width: responsiveWidth(80),
    alignSelf: "center",
    borderWidth: responsiveWidth(0.3),
    borderColor: appColor.background,
    borderRadius: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    height: responsiveHeight(10),
    backgroundColor: "white",
  },
  detailsview1: {
    marginTop: responsiveHeight(2),
    width: responsiveWidth(80),
    alignSelf: "center",
    borderWidth: responsiveWidth(0.3),
    borderColor: appColor.background,
    borderRadius: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    height: responsiveHeight(10),
    backgroundColor: "white",
  },
  addtexts: {
    color: textColor.secondary,
    fontFamily: fontFamily.appTextMedium,
    fontSize: responsiveFontSize(1.9),
  },
  pickersview: {
    marginTop: responsiveHeight(2),
    width: responsiveWidth(80),
    alignSelf: "center",
    flexDirection: "row",
  },
  halfpicker: {
    borderWidth: responsiveWidth(0.3),
    borderColor: appColor.background,
    borderRadius: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    height: responsiveHeight(10),
    width: responsiveWidth(37.5),
    flexDirection: "row",
    backgroundColor: "white",
  },
  DOB: {
    borderWidth: responsiveWidth(0.3),
    borderColor: appColor.background,
    borderRadius: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    height: responsiveHeight(10),
    width: responsiveWidth(37.5),
    marginLeft: responsiveWidth(5),
    backgroundColor: "white",
  },
  textInputLableText: {
    width: responsiveWidth(32),
    height: responsiveHeight(8),
    // marginTop: responsiveHeight(3.5),
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: responsiveHeight(0.4),
    // backgroundColor:'red',
    bottom: 5,
  },
  inputIOS: {
    fontSize: responsiveFontSize(2),
    paddingVertical: 2,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 4,
    color: "black",
    backgroundColor: "transparent",
    width: responsiveWidth(35),
    height: responsiveHeight(10.2),
    // bottom:responsiveHeight(0.6),
    // top:responsiveHeight(3.2),
    // backgroundColor:'red',
    paddingRight: 0, // to ensure the text is never behind the icon
  },
  inpotAndroid: {
    fontSize: responsiveFontSize(2),
    paddingVertical: 2,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 4,
    color: "black",
    backgroundColor: "transparent",
    width: responsiveWidth(27),
    height:
      Platform.OS === "ios" ? responsiveHeight(10.2) : responsiveHeight(10.2),
    // bottom:responsiveHeight(0.6),
    // top:responsiveHeight(3.2),
    // backgroundColor:'red',
    paddingRight: 0,
  },
});
