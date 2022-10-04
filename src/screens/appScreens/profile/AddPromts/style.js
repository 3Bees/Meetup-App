import React from "react";
import { Platform, StyleSheet } from "react-native";
import {
  appColor,
  textColor,
  theamColor,
  bggradientColor,
} from "../../../../constants/colors";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { fontFamily } from "../../../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  subtitleview: {
    alignItems: "center",
    marginTop: Platform.OS === 'android' ? responsiveHeight(4) : responsiveHeight(6),
    flexDirection: "row",
    marginHorizontal: responsiveWidth(5),
    marginBottom: responsiveHeight(1),
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
  holdtext: {
    textAlign: "center",
    color: textColor.primary,
    fontFamily: fontFamily.appTextLight,marginTop:responsiveHeight(3)
  },
  flatlistMainview: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: responsiveWidth(90),
    alignSelf: "center",
    backgroundColor: "#E5F2F8",
    marginTop: responsiveHeight(1.5),
    alignItems: "center",

    borderRadius: responsiveWidth(4),
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
  //  bottom:responsiveHeight(5),
  //   position: 'absolute',
  // backgroundColor:'red',
    // marginTop:Platform.OS === 'android' ? responsiveHeight(22) : null,
    alignSelf: 'center',
    bottom:Platform.OS === 'android' ? null : responsiveHeight(1),

  },
  buttons1: {
    width: responsiveWidth(70),
    height: responsiveHeight(7),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theamColor.lightgrey1,

    borderRadius: responsiveWidth(5),
    marginTop: responsiveHeight(3),
    flexDirection: "row",
  },
  flatlisttopview: {
    marginTop: responsiveHeight(5),
  },
  AddPromtstext: {
    color: textColor.primary,
    textTransform:'uppercase',
    fontFamily: fontFamily.appTextBold,
  },
  rbtexts: {
    color: appColor.appbackground,
    fontSize: responsiveFontSize(2),
    fontFamily: fontFamily.appTextBold,
    marginTop: responsiveHeight(1),
  },
  flatlistMainview1: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: responsiveWidth(90),
    alignSelf: "center",
    backgroundColor: theamColor.lightblue,
    marginTop: responsiveHeight(1.7),
    // padding: 10,
    paddingHorizontal: responsiveWidth(3),
    borderRadius: responsiveWidth(4),
    alignItems: "center",
    paddingRight: responsiveWidth(3),
    height: responsiveHeight(8),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 1,
  },
  hairline: {
    width: responsiveWidth(100),
    height: responsiveHeight(0.1),
    backgroundColor: theamColor.grey1,
    marginTop: responsiveHeight(4),
  },
  starimage: {
    height: responsiveHeight(3),
    resizeMode: "contain",
  },
  detail: {
    fontSize: responsiveFontSize(1.9),
    fontFamily: fontFamily.appTextRegular,
  },
  modalview: {
    width: responsiveWidth(90),
    alignSelf: "center",
    marginTop: responsiveHeight(2),
    backgroundColor: "red",
    borderWidth: responsiveWidth(0.3),
    borderColor: textColor.lightgrey,
    borderRadius: responsiveWidth(6),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    height: responsiveHeight(10),
  },
  modalsubview: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  warningtext: {
    fontSize: responsiveFontSize(2.5),
    fontFamily: fontFamily.appTextBold,
    color: textColor.white,
    justifyContent: "center",
    marginTop: responsiveHeight(1.4),
  },
  buttonview: {
    flexDirection: "row",
  },
  iconyesno: {
    height: responsiveHeight(6),
    width: responsiveWidth(12),
    resizeMode: "contain",
    marginRight: responsiveWidth(2),
  },
  iconyesno1: {
    height: responsiveHeight(6),
    width: responsiveWidth(13),
    resizeMode: "contain",
  },

  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    borderRadius: 10,
    // height: 60,
    margin: 5,
    marginBottom: responsiveHeight(0.75),
    // backgroundColor:"red"
  },
  rowFrontVisible: {
    backgroundColor: bggradientColor.c1,
    borderRadius: 10,
    height: 60,
    padding: 10,
    marginBottom: 15,
    width: responsiveWidth(90),
    alignSelf: "center",
    flexDirection: "row",
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 15,
    width: responsiveWidth(90),
    alignSelf: "center",
  },
  backRightBtn: {
    alignItems: "flex-end",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: "#1f65ff",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  trash: {
    height: 25,
    width: responsiveWidth(85),
    // marginLeft: 7,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "yellow",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: textColor.secondary,
    marginBottom: 5,
  },
  details: {
    fontSize: 12,
    color: "#999",
  },
  item: {
    flexDirection: "column",
    height: responsiveHeight(9),
    alignItems: "flex-start",
  },
  input: {
    flex: 1,
    width: "100%",
  },
  rPrompt: {
    fontFamily: fontFamily.appTextBold,
    color: textColor.white,
    fontSize: responsiveFontSize(2),
  },
  circle: {
    backgroundColor: "rgba(255,102,102,0.75)",
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    borderRadius: responsiveWidth(7.5),
    justifyContent: "center",
    marginLeft: responsiveWidth(3),
  },
});
