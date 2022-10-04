import React from "react";
import { Platform, StyleSheet } from "react-native";
import { appColor, textColor, theamColor } from "../../../constants/colors";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { fontFamily } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: textColor.white,
  },
  subtitleview: {
    alignItems: "center",
    marginTop:Platform.OS==="android"? responsiveHeight(4):responsiveHeight(6),
  },

  subtitle: {
    fontSize: responsiveFontSize(2.2),
    color: textColor.primary,
    fontWeight: "bold",
  },
  coverview: {
    alignItems: "center",
    marginTop: responsiveHeight(5),
  },
  profileview: {
    alignItems: "center",
    marginTop: responsiveHeight(1),
    height: responsiveWidth(50),
    width: responsiveWidth(50),
    borderRadius: responsiveWidth(25),
    overflow: "hidden",
    borderWidth: responsiveWidth(1),
    borderColor: textColor.white,
    justifyContent: "center",
    backgroundColor: theamColor.grey1,
    alignSelf: "center",
  },
  addtexts: {
    color: textColor.secondary,
    fontFamily: fontFamily.appTextMedium,
    fontSize:responsiveFontSize(1.9)
  },
  detailsview: {
    marginTop: responsiveHeight(3),
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
  pickersview: {
    marginTop: responsiveHeight(2),
    width: responsiveWidth(90),
    alignSelf: "center",
    flexDirection: "row",
  },
  inputIOS: {
    fontSize: responsiveFontSize(1.7),
    borderColor: "white",
    color: textColor.secondary,
  },
  inputAndroid: {
    fontSize: responsiveFontSize(1.7),
    borderColor: "white",
    color: textColor.secondary,
  },
  DOB: {
    borderWidth: responsiveWidth(0.3),
    borderColor: appColor.background,
    borderRadius: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    height: responsiveHeight(10),
    width: responsiveWidth(42.5),
    marginLeft: responsiveWidth(5),
  },
  datetext: {
    marginTop: responsiveHeight(2),
    marginRight: responsiveWidth(6),
    fontSize: responsiveFontSize(2),
  },
  bioview: {
    width: responsiveWidth(90),
    alignSelf: "center",
    marginTop: responsiveHeight(2),
    borderWidth: responsiveWidth(0.3),
    borderColor: appColor.background,
    borderRadius: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1),
  },
  biotext: {
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
    color: textColor.primary,
  },
  buttons: {
   
    marginTop: responsiveHeight(4),
    marginBottom: responsiveHeight(6),
    backgroundColor: textColor.secondary,
    width: responsiveWidth(70),
    height: responsiveHeight(7),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: responsiveWidth(5),
    flexDirection: "row",
    
  },
  continuetext: {
    fontFamily: fontFamily.appTextMedium,
    color: "white",
    fontSize: responsiveFontSize(2.4),
    textTransform:'uppercase'
  },
  coverprofileview: {
    backgroundColor: theamColor.grey1,
    borderWidth: responsiveWidth(0.1),
    borderColor: theamColor.greyborder,
    height: responsiveHeight(35),
    marginTop: responsiveHeight(2.5),
  },
  profilestrokeview: {
    height: responsiveHeight(),
    backgroundColor: textColor.white,
    width: responsiveWidth(20),
  },
  halfpicker: {
    borderWidth: responsiveWidth(0.3),
    borderColor: appColor.background,
    borderRadius: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    height: responsiveHeight(10),
    width: responsiveWidth(42.5),
    flexDirection:'row'
  },
  textInputLableText: {
    width: responsiveWidth(32),
    height: responsiveHeight(8),
    // marginTop: responsiveHeight(3.5),
    flexDirection: "row",
    justifyContent: "space-between",
    bottom:Platform.OS === 'ios' ? responsiveHeight(0.4):null,
    top:Platform.OS === 'ios' ? responsiveHeight(0):responsiveHeight(2),

    // backgroundColor:'red',
    position:Platform.OS === 'ios' ? null:'absolute'

  },
  cambutton: {
    alignItems: "center",
  },
  addtexts1: {
    fontFamily: fontFamily.appTextMedium,
    marginTop: responsiveHeight(0.5),
  },
  modalView: {
    marginTop: responsiveHeight(30),
    margin: 70,
    backgroundColor: "white",
    borderRadius:3,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  maletxt:{
    fontSize: responsiveFontSize(2.5),
    fontFamily: fontFamily.appTextRegular,
  }
});
