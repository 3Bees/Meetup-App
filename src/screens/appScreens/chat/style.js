import React from "react";
import { Platform, StyleSheet } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { textColor, buttonColor } from "../../../constants/colors";
import { fontFamily } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: textColor.white,
  },
  headingtxt: {
    color: "#0384BB",
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(1.7),
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(5),
  },
  image: {
    height: responsiveWidth(25),
    width: responsiveWidth(25),
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  backstyle: {
    borderRadius: responsiveWidth(25 / 2),
    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  topflatlistview: {
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(2),
  },
  card: {
    backgroundColor: textColor.white,
    height: responsiveWidth(6),
    width: responsiveWidth(6),
    borderRadius: responsiveWidth(6 / 2),
    marginBottom: responsiveHeight(0.5),
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card1: {
    backgroundColor: textColor.white,
    height: responsiveWidth(4),
    width: responsiveWidth(4),
    borderRadius: responsiveWidth(6 / 2),
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lipsimage: {
    height: responsiveWidth(4),
    width: responsiveWidth(4),
  },
  lipsimage1: {
    height: responsiveWidth(2.5),
    width: responsiveWidth(2.5),
  },
  mesages: {
    flexDirection: "row",
    width: responsiveWidth(90),
    alignSelf: "center",
    marginTop: responsiveHeight(1),
    paddingBottom: responsiveHeight(0.5),
  },
  headerview: {
    // borderTopWidth:responsiveWidth(0.3),
    marginTop: responsiveHeight(1),
    // borderColor:textColor.lightgrey
  },
  Seperator: {
    borderBottomWidth: responsiveWidth(0.3),
    marginTop: responsiveHeight(1),
    borderColor: textColor.lightgrey,
    width: responsiveWidth(80),
    alignSelf: "flex-end",
  },
  image1: {
    height: responsiveWidth(12),
    width: responsiveWidth(12),
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  backstyle1: {
    borderRadius: responsiveWidth(15 / 2),
    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  nametxt: {
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2),
    marginTop: Platform.OS === "ios" ? responsiveHeight(0.5) : 0,
  },
  txt: {
    fontFamily: fontFamily.appTextLight,
    fontSize: responsiveFontSize(1.8),
    color: textColor.primary,
    marginTop: Platform.OS === "ios" ? responsiveHeight(1) : 0,
  },
  rbsheetbtn: {
    height: responsiveHeight(9),
    // justifyContent: "center",
    paddingLeft: responsiveWidth(5),
    // borderTopWidth: responsiveWidth(0.1),
    // borderTopColor: textColor.lightgrey,
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
  },
  rbsheetbtntxt2: {
   
    fontSize: responsiveFontSize(2),
    fontFamily: fontFamily.appTextRegular,
    marginLeft: responsiveWidth(4),
   
    paddingBottom: responsiveHeight(2.5),
    width:responsiveWidth(75)

  },
  unMatchText: {
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2),
    textAlign: "center",
    alignSelf: "center",
    color: textColor.primary,
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
  SafetyText: {
    fontFamily: fontFamily.appTextBold,
    textAlign: "center",
    fontSize: responsiveFontSize(2.5),
  },
  orangeCircle: {
    // borderColor: "orange",
    // borderWidth: responsiveWidth(0.5),
    height: responsiveWidth(7.5),
    width: responsiveWidth(7.5),
    borderRadius: responsiveWidth(7.5 / 2),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
    bottom:responsiveHeight(1)
  },
  rbsheetbtntxt: {
    fontSize: responsiveFontSize(2),
    fontFamily: fontFamily.appTextRegular,
    
    
  },
  txtView:{
    borderBottomWidth: responsiveWidth(0.2),
    borderBottomColor: textColor.lightgrey,
    paddingBottom: responsiveHeight(2.2),
    width:responsiveWidth(75),
    marginLeft: responsiveWidth(4),

  },
});
