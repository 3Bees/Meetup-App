import { StyleSheet } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { buttonColor, textColor } from "../../../constants/colors";
import { fontFamily } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: textColor.white,
  },
  txtview: {
    paddingLeft: responsiveWidth(5),
    paddingRight: responsiveWidth(5),
    borderTopColor: buttonColor.grey,
    alignSelf: "center",
    borderTopWidth: responsiveWidth(0.3),
    paddingTop: responsiveHeight(3),
  },
  TermsConditiontext: {
    fontFamily: fontFamily.appTextRegular,
    fontSize: responsiveFontSize(1.7),
    lineHeight: responsiveHeight(2.2),
  },
});
