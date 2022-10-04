import { StyleSheet } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { textColor } from "../../../../constants/colors";
import { fontFamily } from "../../../../constants/fonts";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: textColor.white,
  },
  map: {
    flex: 1,
  },
  zipView: {
    width: responsiveWidth(85),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: responsiveWidth(5),
    alignSelf: "center",
    height: responsiveHeight(9),
    position: "absolute",
    top: responsiveHeight(13),
    // justifyContent: "center",
    zIndex: 1,
  },
  zipTxt: {
    fontFamily: fontFamily.appTextBold,
    color: textColor.secondary,
    marginLeft: responsiveWidth(4),
    marginTop: responsiveHeight(0.75),
    fontSize: responsiveFontSize(1.5),
  },
  inputView: {
    color: "black",
    // width: "100%",
    height: responsiveHeight(6),
    paddingHorizontal: responsiveWidth(4),
  },
  btnView: {
    width: responsiveWidth(70),
    height: responsiveHeight(7),
    borderRadius: responsiveWidth(6),
    backgroundColor: textColor.secondary,
    bottom: responsiveHeight(5),
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: {
    color: "white",
    fontFamily: fontFamily.appTextBold,
  },
});
