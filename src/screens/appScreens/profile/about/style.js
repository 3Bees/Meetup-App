import React from "react";
import { Platform, StyleSheet } from "react-native";
import { appColor, bggradientColor, textColor, theamColor,buttonColor } from "../../../../constants/colors";
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
  LogoView: {
    marginTop: Platform.OS === 'android'? null: responsiveHeight(6),
    width: responsiveWidth(70),

    alignSelf: "center",
  },
  imageView: {
    height: responsiveHeight(8),
    width: responsiveWidth(70),
  },
  textView: {
    width: responsiveWidth(93),
    alignSelf: "center",
    marginTop: responsiveHeight(3)
  },
  textWelcome: {
    fontSize: responsiveFontSize(2.1),
    fontFamily: fontFamily.appTextRegular,
  },
  textWelcome3: {
    fontSize: responsiveFontSize(2.1),
    fontFamily: fontFamily.appTextRegular,
  },
  textWelcome2: {
    fontSize: responsiveFontSize(2.1),
    marginVertical:responsiveHeight(1),
    fontFamily: fontFamily.appTextRegular,
  },

  ImageBackground: {
    height: responsiveHeight(8),
    width: responsiveWidth(20),
    backgroundColor: "red",
  },
  iconView: {
    //       backgroundColor:'white',
    // marginVertical: responsiveHeight(10),
    marginHorizontal: responsiveWidth(2),
  },
  iconView2: {
    backgroundColor: "white",
    borderRadius: responsiveWidth(30),
    marginTop: responsiveHeight(2)
  },
  cardBack: {
    backgroundColor: appColor.appbackground,
    borderRadius: responsiveWidth(2),
    height: responsiveHeight(38), 
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center'
  },
  icon2:{
      backgroundColor: theamColor.lightblue,
      height: responsiveWidth(13),
      width: responsiveWidth(13),
      borderRadius: responsiveWidth(20),
      alignSelf:'center',
      // marginTop: responsiveHeight(5)
  },
  bigIcon:{
      height: responsiveWidth(23),
      width: responsiveWidth(23),
      borderRadius: responsiveWidth(25),
      backgroundColor: theamColor.lightblue
  },
  kissText:{
      fontSize: responsiveFontSize(2.2),
      fontFamily: fontFamily.appTextMedium,
      marginTop: responsiveHeight(1)
  },
  playButton:{
    backgroundColor: textColor.secondary,
    width: responsiveWidth(70),
    height: responsiveHeight(7),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: responsiveWidth(5),
    marginTop:responsiveHeight(2)
  },
  playtext:{
    fontFamily: fontFamily.appTextMedium,
    color: "white",
    fontSize: responsiveFontSize(2.4),

  },
  tennisBall: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theamColor.lightblue,
    borderRadius: responsiveWidth(25),
    width: responsiveWidth(13),
    height: responsiveWidth(13),
    // transform: [
    //   {
    //     scale: 1,
    //   },
    // ]
  },
  button1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theamColor.lightblue,
    borderRadius: responsiveWidth(20)/2,
    width: responsiveWidth(20),
    height: responsiveWidth(20),
  },
  button: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  buttonText: {
    fontSize: responsiveFontSize(1.5),
    color: '#333',
  },
  imageICon:{
    height: responsiveWidth(8),
    width: responsiveWidth(10)
  },
  imageICon2:{
    height: responsiveWidth(7),
    width: responsiveWidth(9)
  },
  hitch:{
    top: responsiveWidth(11) === 41.25 ? responsiveHeight(87):responsiveHeight(82)
  },
  kiss:{
    top:responsiveWidth(11) === 41.25 ? responsiveHeight(87):responsiveHeight(82)
  },
  ditch:{
    top:responsiveWidth(11) === 41.25 ? responsiveHeight(87):responsiveHeight(82)
  }
});