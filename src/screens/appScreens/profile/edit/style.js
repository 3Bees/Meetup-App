import React from "react";
import { Platform, StyleSheet } from "react-native";
import { appColor, textColor, theamColor } from "../../../../constants/colors";
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
    marginTop: responsiveHeight(4),
  },

  subtitle: {
    fontSize: responsiveFontSize(2.2),
    color: textColor.primary,
    fontWeight: "bold",
  },
  coverview: {
    alignItems: "center",
    marginTop: Platform.OS === 'android' ? responsiveHeight(5):responsiveHeight(2),
    flexDirection:'row',
    justifyContent:'space-between'
  },
  profileview: {
    alignItems: "center",
    marginTop: responsiveHeight(4),
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
  addtexts1: {
    color: textColor.white,
    fontFamily: fontFamily.appTextMedium,
    marginLeft:responsiveWidth(1.5)
  },
  circlecard: {
    height: responsiveWidth(9),
    width: responsiveWidth(9),
    borderRadius: responsiveWidth(9 / 2),
    backgroundColor: 'white',
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
  detailsview: {
    marginTop: responsiveHeight(7),
    width: responsiveWidth(90),
    alignSelf: "center",
    borderWidth: responsiveWidth(0.3),
    borderColor: appColor.background,
    borderRadius: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    height: responsiveHeight(10),
    backgroundColor:'white'
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
    backgroundColor:'white'

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
    backgroundColor:'white'

  },
  nametxt: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: fontFamily.appTextBold,
    color: textColor.white,
    textAlign:'center',
    marginTop: responsiveHeight(1),
  },
  circlecard2: {
    height: responsiveWidth(100),
    // backgroundColor:'red',
    alignItems: "center",
    justifyContent: "center",
    zIndex:1,
    position:Platform.OS==='android'?'absolute':null,
    paddingHorizontal:responsiveWidth(3)

  },
  circlecard3: {
    height: responsiveWidth(100),
    // backgroundColor:'red',
    alignItems: "center",
    justifyContent: "center",
    zIndex:1,
    position:Platform.OS==='android'?'absolute':null,
    right:0,
    paddingHorizontal:responsiveWidth(3)

  },
  dp: {
    height: responsiveWidth(100),
    width: responsiveWidth(90),
    borderRadius: responsiveWidth(5),
    alignSelf: "center",
    marginTop: responsiveHeight(4),
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
    backgroundColor: textColor.secondary,
    width: responsiveWidth(65),
    height: responsiveHeight(7),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: responsiveWidth(5),
    marginTop: responsiveHeight(4),
    marginBottom: responsiveHeight(6),
   
  },
  continuetext: {
    fontFamily: fontFamily.appTextMedium,
    color: "white",
    fontSize: responsiveFontSize(2.4),
  },
  coverprofileview: {
    // backgroundColor: theamColor.grey1,
    flex:1
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
    flexDirection: "row",
    backgroundColor:'white'

  },
  textInputLableText: {
    width: responsiveWidth(32),
    height: responsiveHeight(8),
    // marginTop: responsiveHeight(3.5),
    flexDirection: "row",
    justifyContent: "space-between",
    bottom:responsiveHeight(0.4),
    // backgroundColor:'red',
    bottom:5
    
  },
  cambutton: {
    alignItems: "center",
    flexDirection:'row',
    marginRight:responsiveWidth(4)
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
