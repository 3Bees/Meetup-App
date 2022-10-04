import color from "color";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import {
  appColor,
  buttonColor,
  cardColor,
  textColor,
} from "../../../../constants/colors";
import { fontFamily } from "../../../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ImageView: {
    height: responsiveHeight(10),
    width: responsiveWidth(20),
    borderRadius: responsiveWidth(20 + 10 / 2),
    alignSelf: "center",
    bottom: responsiveHeight(7),
    position: "relative",
  },
  cover: {
    height: responsiveHeight(100),
    width: "100%",
    paddingTop: Platform.OS === "ios" ? responsiveHeight(3) : 0,
  },
  textWrapper: {
    alignSelf: "center",
    width: responsiveWidth(90),
    // backgroundColor: "red",
    marginTop: responsiveHeight(8),
    alignItems: "center",
  },
  nametxt: {
    // textAlign: "center",
    fontSize: responsiveFontSize(2.5),
    fontFamily: fontFamily.appTextBold,
    color: textColor.white,
    marginTop: responsiveHeight(1),
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
  txt: {
    color: textColor.primary,
    fontSize: responsiveFontSize(2),
    fontFamily: fontFamily.appTextRegular,
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
    height: responsiveHeight(25),
    width: responsiveWidth(30),
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
  myphototxt: {
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(1.7),
    color: textColor.secondary,
  },
  Promptscard: {
    backgroundColor: cardColor.secondary,
    width: responsiveWidth(90),
    borderRadius: responsiveWidth(5),
    alignSelf: "center",
    marginTop: responsiveHeight(2.5),
    padding: responsiveWidth(3),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    marginBottom: responsiveHeight(3),
  },
  circlecard: {
    height: responsiveWidth(11),
    width: responsiveWidth(11),
    borderRadius: responsiveWidth(11 / 2),
    backgroundColor: cardColor.primary,
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
  circlecard4: {
    height: responsiveWidth(17),
    width: responsiveWidth(17),
    borderRadius: responsiveWidth(17 / 2),
    backgroundColor: cardColor.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: textColor.secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor:textColor.secondary,
    borderWidth:0.3
  },
  circlecard2: {
    height: responsiveHeight(120),
    width: responsiveWidth(50),
    // backgroundColor:'pink',
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    position: Platform.OS === "android" ? "absolute" : "absolute",
    paddingHorizontal: responsiveWidth(3),
  },
  circlecard3: {
    height: responsiveWidth(120),
    width: responsiveWidth(50),
    // backgroundColor:'red',
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    position: Platform.OS === "android" ? "absolute" : "absolute",
    right: 0,
    paddingHorizontal: responsiveWidth(3),
  },
  circlecardview: {
    flexDirection: "row",
    position: "absolute",
    zIndex: 1,
    marginTop: responsiveHeight(2),
    justifyContent: "space-between",
    alignSelf: "center",
    width: responsiveWidth(95),
    // backgroundColor:'red',
    paddingTop: Platform.OS === "ios" ? responsiveHeight(5) : 0,
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
  txtView:{
    borderBottomWidth: responsiveWidth(0.2),
    borderBottomColor: textColor.lightgrey,
    paddingBottom: responsiveHeight(2.2),
    width:responsiveWidth(75),
    marginLeft: responsiveWidth(4),

  },
  rbsheetbtntxt: {
    fontSize: responsiveFontSize(2),
    fontFamily: fontFamily.appTextRegular,
    
    
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
  unMatchText: {
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2),
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
  baloon: {
    // backgroundColor: textColor.white,
    borderRadius: responsiveWidth(4),
    position: "absolute",
    alignSelf: "center",
    // height: responsiveHeight(8),
    width: responsiveWidth(50),
    marginLeft: responsiveWidth(25),
    bottom:10,
    shadowColor: "#000",
    flexDirection: "row",
    justifyContent: "space-around",
    // alignItems: 'flex-end',
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.20,
    // shadowRadius: 1.41,
    // elevation: 5,
    // top: responsiveHeight(6),
    zIndex: 10,
    right: 0
  },
  emojicircle:{ 
    height: responsiveWidth(10), 
    width: responsiveWidth(10), 
    backgroundColor: 'white', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: responsiveWidth(5),
        top: responsiveHeight(2.7),

  shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation:2,
  },
  circle: {
    height: responsiveWidth(7),
    width: responsiveWidth(7),
    borderRadius: responsiveWidth(7 / 2),
    backgroundColor: cardColor.primary,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    marginTop: responsiveHeight(1),
  },
  emoji: {
    backgroundColor: "white",
    height: responsiveWidth(8),
    width: responsiveWidth(8),
    borderRadius: responsiveWidth(8 / 2),
    position: "absolute",
    top:
      Platform.OS === "android" ? responsiveHeight(7) : responsiveHeight(5.5),
    right: 0,
    zIndex: 3,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emoji1: {
    backgroundColor: "white",
    height: responsiveWidth(6),
    width: responsiveWidth(6),
    borderRadius: responsiveWidth(6 / 2),

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
  matchDate: {
    height: responsiveHeight(5),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginLeft: responsiveWidth(2),
    marginTop: Platform.OS === 'android' ? responsiveHeight(1.5) : responsiveHeight(1),
    borderRadius: 5,
    alignSelf:'center'
  },
  infoheading: {
    color: textColor.secondary,
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2),
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
    marginBottom: responsiveHeight(1),
   
  },
  continuetext: {
    fontFamily: fontFamily.appTextMedium,
    color: "white",
    fontSize: responsiveFontSize(2.4),
    textTransform:'uppercase'
  },
  detailsview2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'space-between'
  },
  detailsview: {
    flexDirection: "row",
    alignItems: "center",
  },
});
