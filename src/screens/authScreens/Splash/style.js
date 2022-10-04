import { StyleSheet, Platform } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { appColor, textColor, theamColor } from "../../../constants/colors";
import { fontFamily } from "../../../constants/fonts";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:appColor.appbackground
  },
  bg:{
    height:'100%',
    width:'100%',
    resizeMode:'contain',
    alignItems:'center',
    justifyContent:'center'
  },
  textview: {
    alignSelf: "center",
    alignItems: "center",
  },
  Appname: {
    textAlign: "center",
    fontSize: responsiveFontSize(6),
    color: textColor.primary,
    fontWeight: "bold",
  },
  logo:{
    height:responsiveHeight(10),
    width:responsiveWidth(30),
    resizeMode:'contain'
  },
  titleview: {
    alignItems: "center",
    // marginTop: responsiveHeight(3),
  },
  subtitleview: {
    alignItems: "center",
  },
  title: {
    fontSize: responsiveFontSize(6),
    color: textColor.white,
  },
  subtitle: {
    fontSize: responsiveFontSize(2.4),
    color: textColor.white,
    fontFamily: fontFamily.appTextBold,
  },
  PhoneInputview: {
    marginTop: responsiveHeight(2),
    width: responsiveWidth(90),
    borderWidth: responsiveWidth(0.1),
    borderColor: appColor.background,
    borderRadius: responsiveWidth(4),
    alignSelf: "center",
    height: responsiveHeight(8),
    paddingHorizontal: responsiveWidth(3),
  },
  PhoneInputtext: {
    color: textColor.white,
    fontSize: responsiveFontSize(1.5),
  },
  phoneInput: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: responsiveHeight(1),
  },
  phoneInputicon: {
    marginRight: responsiveWidth(2),
    // paddingLeft: responsiveWidth(5),
  },
  phoneInputlabel: {
    fontSize: responsiveFontSize(1.3),
    color: textColor.white,
    marginTop: responsiveHeight(1),
    height: responsiveHeight(2),
    fontFamily: fontFamily.appTextBold,
  },
  passwordview: {
    marginTop: responsiveHeight(1),
    width: responsiveWidth(90),
    borderWidth: responsiveWidth(0.2),
    borderColor: textColor.white,
    borderRadius: responsiveWidth(3),
    alignSelf: "center",
    height: responsiveHeight(8),
    paddingHorizontal: responsiveWidth(3),
    // paddingTop: responsiveWidth(1),
    paddingBottom: responsiveHeight(2.8),
  },
  passwordinput: {
    // marginBottom: responsiveHeight(2),
    color: textColor.white,
    fontSize: responsiveFontSize(1.5),
  },
  remembermetextview: {
    flexDirection: "row",
    alignItems: "center",
  },
  remembermetext: {
    color: textColor.white,
    fontSize: responsiveFontSize(1.5),
    marginLeft: responsiveWidth(1),
    fontFamily: fontFamily.appTextRegular,
  },
  forgetpasswordview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(1),
  },
  buttons: {
    width: responsiveWidth(73),
    height: responsiveHeight(7.5),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: textColor.white,
    borderRadius: responsiveWidth(6),
    marginVertical: responsiveHeight(1),
    flexDirection: "row",
  },
  buttons2: {
    width: responsiveWidth(70),
    height: responsiveHeight(7),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: textColor.white,
    borderRadius: responsiveWidth(6),
    marginTop: responsiveHeight(1),
    flexDirection: "row",
  },
  buttonsview: {
    marginTop: responsiveHeight(20),
    
  },
  terms: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: fontFamily.appTextBold,
    color: 'black',
    textAlign: "center",
  },
  termsview: {
    // width: responsiveWidth(60),
    marginTop: responsiveHeight(1),
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: responsiveHeight(3),
  },
  termstext: {
    fontSize: responsiveFontSize(1.7),
    color: 'black',
    fontFamily: fontFamily.appTextRegular,
    textAlign: "center",
  },
  termsdot: {
    fontSize: responsiveFontSize(1.8),
    justifyContent: "center",
    color: textColor.lightblack,
    marginHorizontal: responsiveWidth(1),
    fontFamily: fontFamily.appTextBold,
  },
  termstextview: {
    alignSelf: "center",
    marginTop: responsiveHeight(6),
  },
  buttonstext: {
    marginLeft: responsiveWidth(2),
    fontFamily: fontFamily.appTextBold,
    fontSize:responsiveFontSize(2.3)
  },
  buttonstext2: {
    marginLeft: responsiveWidth(2),
    fontFamily: fontFamily.appTextBold,
        color:textColor.white,
        fontSize:responsiveFontSize(2.3)

  },
  iconcheck: {
    resizeMode: "contain",
    height: responsiveHeight(4.5),
    width: responsiveWidth(4.5),
  },
  remembermetext1: {
    color: textColor.white,
    fontSize: responsiveFontSize(1.5),
    fontFamily: fontFamily.appTextBold,
  },
  bg: {
    height: "100%",
    width: "100%",
    // resizeMode: "contain",
  },
  Logowhite1: {
    alignSelf: "center",
    width:responsiveWidth(100),
    height:responsiveHeight(30),
    resizeMode:'contain',
    marginTop: responsiveHeight(0),
  },
  Logowhite2: {
    alignSelf: "center",
    width:responsiveWidth(55),
    height:responsiveHeight(11),
    resizeMode:'contain',
    top: responsiveHeight(7),
    position:'absolute'
  },
});
