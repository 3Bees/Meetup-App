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
  subtitleview: {
    alignItems: "center",
    marginTop:Platform.OS==='android'? responsiveHeight(4):responsiveHeight(6),
    flexDirection: "row",
    marginHorizontal: responsiveWidth(5),
  },

  subtitle: {
    fontSize: responsiveFontSize(2.2),
    color: textColor.primary,
    fontWeight: "bold",
  },
  coverview: {
    alignItems: "center",
    //marginTop: responsiveHeight(5),
    backgroundColor:textColor.lightgrey,
   marginLeft:responsiveWidth(2),
    height: responsiveHeight(30),
    width: responsiveWidth(30),
    alignItems:'center',
    justifyContent:'center',
    resizeMode: 'cover'

  },
  buttons: {
    backgroundColor: textColor.secondary,
    width: responsiveWidth(70),
    height: responsiveHeight(7),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: responsiveWidth(5),
  
    marginTop:Platform.OS==='android'? responsiveHeight(6):responsiveHeight(3),
    marginBottom:Platform.OS==='android'? responsiveHeight(1):responsiveHeight(4),
    flexDirection: "row",
   
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
    color: textColor.placholderColor,
    marginTop: responsiveHeight(10),
    width:responsiveWidth(65)
  },
  addtexts: {
    color: appColor.appbackground,
    
  },
  crossbtn:{
    backgroundColor:'red',
    height:responsiveWidth(10),
    width:responsiveWidth(10),
    borderRadius: responsiveWidth(10/2),
    alignItems:'center',
    justifyContent:'center',
    position: "absolute",
    zIndex:1,
    top:responsiveHeight(23),
    left:responsiveWidth(17)
  },
  dpimage: {height:responsiveHeight(30),width:responsiveWidth(30),marginTop:responsiveHeight(5),marginLeft:responsiveWidth(3),alignItems:'flex-end',justifyContent:'flex-end',paddingRight:responsiveWidth(3),paddingBottom:responsiveHeight(1)},
  tile: {
   
  },
  text: {
    fontSize: 28,
    color: 'blue',
    fontWeight: 'bold',
  },
});
