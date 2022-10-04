import { StyleSheet } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { buttonColor, textColor } from "../../../../constants/colors";
import { fontFamily } from "../../../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: textColor.white,
  },
  txtview: {
    paddingLeft: responsiveWidth(5),
    paddingRight: responsiveWidth(5),
    borderTopColor: buttonColor.grey,
    borderTopWidth: responsiveWidth(0.3),
    paddingTop: responsiveHeight(1),
  },
  TextInput: {
    width: responsiveWidth(90),
    borderWidth: responsiveWidth(0.3),
    borderColor: buttonColor.grey,
    borderRadius: responsiveWidth(3),
    alignSelf: "center",
    paddingLeft: responsiveWidth(2),
    paddingVertical: responsiveHeight(2),
  },
  txt: {
    fontFamily: fontFamily.appTextRegular,
    color: textColor.secondary,
  },
  txt2: {
    fontFamily: fontFamily.appTextBold,
    color: '#8c8c8c',
    alignSelf:'center',
    fontSize:responsiveFontSize(2),
    marginBottom:responsiveHeight(5)
  },
  yesBtn: {
    backgroundColor: textColor.secondary,
    width: responsiveWidth(70),
    height: responsiveHeight(7),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: responsiveWidth(5),
    marginTop: responsiveHeight(10),
   
  },
  yesTxt: {
    fontFamily: fontFamily.appTextMedium,
    color: "white",
    fontSize: responsiveFontSize(2.4),
    textTransform:'uppercase'
  },
});
