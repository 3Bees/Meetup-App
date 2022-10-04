import React from "react";
import { Platform, StyleSheet } from "react-native";
import { appColor, textColor } from "../../../../constants/colors";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { fontFamily } from "../../../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: textColor.white,
  },
  userimage: {
    width: responsiveWidth(35),
    height: responsiveWidth(35),
    resizeMode: "contain",
    alignSelf: "center",
    marginTop:  responsiveHeight(5),
    top:Platform.OS === 'ios' ? responsiveHeight(2):null
    
  },
  editiconView: {
    height: responsiveWidth(12),
    width: responsiveWidth(12),
    borderRadius: responsiveWidth(12 / 2),
    backgroundColor: "white",
    alignSelf: "flex-end",
    marginRight: responsiveWidth(-1),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  NameView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: responsiveHeight(1),
    top:Platform.OS === 'ios' ? responsiveHeight(2):null

  },
  nameText: {
    fontSize: responsiveFontSize(3.5),
    fontFamily: fontFamily.appTextBold,
    // marginLeft: responsiveWidth(10),
  },
  parent: {
    height: "58%",
    width: "100%",
    transform: [{ scaleX: 2 }],
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,
    overflow: "hidden",
  },
  child: {
    flex: 1,
    transform: [{ scaleX: 0.5 }],
    backgroundColor: "white",
    // alignItems: "center",
    // justifyContent: "center",
  },
  ICONview: {
    height: responsiveWidth(8),
    width: responsiveWidth(8),
    borderRadius: responsiveWidth(4),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: responsiveWidth(1),
    borderColor: textColor.lightgrey,
    marginLeft: responsiveWidth(5),
    borderStyle: "dotted",
  },
  iconsView: {
    height: responsiveWidth(16),
    width: responsiveWidth(16),
    borderRadius: responsiveWidth(16 / 2),
    backgroundColor: "white",
    // alignSelf: "flex-end",
    // marginRight: responsiveWidth(-3),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  multiiconsViews: {
    width: responsiveWidth(80),
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: responsiveHeight(5),
  },
  camView: {
    height: responsiveWidth(20),
    width: responsiveWidth(20),
    borderRadius: responsiveWidth(20 / 2),
    // backgroundColor: "white",
    // alignSelf: "flex-end",
    // marginRight: responsiveWidth(-3),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    alignSelf: "center",
  },
  addiconView: {
    height: responsiveWidth(6),
    width: responsiveWidth(6),
    borderRadius: responsiveWidth(3),
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "white",
    bottom: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  iconsLabel: {
    color: textColor.lightgrey,
    fontSize: responsiveFontSize(2),
    fontFamily: fontFamily.appTextBold,
    marginTop: responsiveHeight(1),
  },
  iconMainview: {
    alignItems: "center",
  },
  camButton: {
    position: "absolute",
    bottom: responsiveHeight(5),
    alignSelf: "center",
    alignItems: "center",
  },
  bottommainView: {
    flexDirection: "row",
    width: responsiveWidth(70),
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: responsiveHeight(1),
  },
  boosticon: {
    resizeMode: "contain",
    height: responsiveHeight(5),
    width: responsiveWidth(9),
  },
  button: {
    backgroundColor: textColor.secondary,
    width: responsiveWidth(70),
    height: responsiveHeight(7),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: responsiveWidth(5),
    marginTop:responsiveHeight(2)
  },
  boostCount:{ 
    fontSize: responsiveFontSize(4), 
    position: 'absolute',
    left:responsiveWidth(33),
    fontFamily:fontFamily.appTextBold,
    color:'white'
  },
  buttontxt: {
    fontFamily: fontFamily.appTextMedium,
    color: "white",
    fontSize: responsiveFontSize(2.4),
  },
  Modalbg: {
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

    // backgroundColor: "red",
    // borderRadius:responsiveWidth(10),
    // marginLeft: responsiveWidth(5),
  },
  image: {
    height: responsiveHeight(7),
    marginTop:responsiveHeight(2),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    resizeMode:'contain'
  },
  Modalbg2: {
    height: Platform.OS === "ios" ? responsiveHeight(90) : responsiveHeight(95),
    width: responsiveWidth(95),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? responsiveHeight(2) : null,

    // backgroundColor: "transparent",
    // borderRadius:responsiveWidth(10),
    // marginLeft: responsiveWidth(5),
  },
  boostTxt: {
    width: responsiveWidth(80),
    height: responsiveHeight(15),
    bottom: responsiveHeight(4),
    // backgroundColor:'green',
    // alignSelf: "center",
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2.3),
    textAlign: "center",
  },
  boostTxt2: {
    width: responsiveWidth(80),
    height: responsiveHeight(18),
    bottom: responsiveHeight(0.8),

    // backgroundColor:'green',
    // alignSelf: "center",
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2.3),
    textAlign: "center",
  },
  btnGroup: {
    width: "95%",
    alignSelf: "center",
    // backgroundColor: "yellow",
    position: "absolute",
    bottom: responsiveHeight(21.3),
    justifyContent: "center",
  },
  yesBtn: {
    backgroundColor: textColor.secondary,
    width: "70%",
    height: responsiveHeight(7),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: responsiveWidth(5),
  },
  yesTxt: {
    fontFamily: fontFamily.appTextMedium,
    color: "white",
    fontSize: responsiveFontSize(2.4),
  },
  noBtn: {
    width: responsiveWidth(70),
    height: responsiveHeight(8),
    // backgroundColor:'red',
    top: responsiveHeight(0.6),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: responsiveWidth(5),
  },
  noTxt: {
    fontFamily: fontFamily.appTextMedium,
    color: "gray",
    fontSize: responsiveFontSize(2.2),
  },
});
