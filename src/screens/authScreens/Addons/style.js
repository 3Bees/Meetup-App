import { StyleSheet } from "react-native";
import { cardColor, textColor } from "../../../constants/colors";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { fontFamily } from "../../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: cardColor.primary,
    borderRadius: responsiveWidth(3),
    marginTop: responsiveHeight(2),
    width: responsiveWidth(90),
    alignSelf: "center",
    paddingLeft: responsiveWidth(3),
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(2),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: responsiveWidth(5),
    marginBottom: responsiveHeight(1),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headingtxt: {
    fontSize: responsiveFontSize(2),
    fontFamily: fontFamily.appTextBold,
  },
  iconbtn: {
    backgroundColor: textColor.lightgrey,
    padding: responsiveWidth(1.5),
    borderRadius: responsiveWidth(6),
  },
  buttons: {
    width: responsiveWidth(70),
    height: Platform.OS === "ios" ? responsiveHeight(6) : responsiveHeight(7),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: appColor.appbackground,
    borderRadius: responsiveWidth(6),
    marginTop: responsiveHeight(12),
    flexDirection: "row",
    marginBottom: responsiveHeight(1),
  },
  continuetext: {
    color: textColor.white,
    fontSize: responsiveFontSize(1.9),
    fontFamily: fontFamily.appTextBold,
  },
  iconview: {
    flexDirection: "row",
    alignItems: "center",
  },
  countertxt: {
    marginLeft: responsiveWidth(1),
    marginRight: responsiveWidth(1),
    fontSize: responsiveFontSize(2),
  },
  button: {
    width: responsiveWidth(70),
    height: responsiveHeight(7),
    borderRadius: responsiveWidth(6),
    backgroundColor: textColor.secondary,
    marginVertical: responsiveHeight(2),
    alignItems: "center",
    marginBottom:responsiveHeight(2),
    justifyContent: "center",
    alignSelf: "center",
  },
  buttontxt: {
    fontFamily: fontFamily.appTextBold,
    color: textColor.white,
    fontSize: responsiveFontSize(2),
  },
});
