import { Platform, StyleSheet } from "react-native";
import {
  appColor,
  buttonColor,
  cardColor,
  textColor,
} from "../../../../constants/colors";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { fontFamily } from "../../../../constants/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cardColor.primary,
  },
  card: {
    backgroundColor: cardColor.primary,
    borderRadius: responsiveWidth(3),
    marginTop:
      Platform.OS === "android" ? responsiveHeight(2) : responsiveHeight(1),
    width: responsiveWidth(90),
    alignSelf: "center",
    paddingLeft: responsiveWidth(3),
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(2),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: responsiveWidth(5),
    marginBottom: responsiveHeight(2),
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
  iconview: {
    flexDirection: "row",
    alignItems: "center",
  },
  countertxt: {
    fontSize: responsiveFontSize(3),
    paddingHorizontal: responsiveWidth(2.5),
  },
  button: {
    backgroundColor: textColor.secondary,
    width: responsiveWidth(70),
    height: responsiveHeight(7),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: responsiveWidth(5),
    marginVertical: responsiveHeight(3),
   

  },
  buttontxt: {
    fontFamily: fontFamily.appTextMedium,
    color: "white",
    fontSize: responsiveFontSize(2.4),
    textTransform:'uppercase'
  },
  discountView: {
    flexDirection: "row",
    alignItems: "center",
    width: responsiveWidth(50),
    justifyContent: "space-between",
    marginTop: responsiveHeight(2),
  },
  discountBanner: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: responsiveWidth(0.3),
    borderRadius: responsiveWidth(1.5),
    borderColor: textColor.secondary,
  },
  discountText: {
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.5),
    color: textColor.secondary,
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2),
  },
});
