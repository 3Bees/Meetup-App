import { Platform, StyleSheet } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { textColor } from "../../../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    backgroundColor: "black",
    height: responsiveHeight(10),
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: responsiveWidth(2),
    paddingTop:Platform.OS==="ios"?responsiveHeight(2):0
  },
  baloon:{
    // backgroundColor:textColor.white,
    borderRadius: responsiveWidth(4),
    position:'absolute',
    alignSelf:'flex-end',
    bottom:responsiveHeight(1),
    height:responsiveHeight(10),
    width:responsiveWidth(58),
    shadowColor: "#000",
    flexDirection: "row",
    justifyContent:'space-around',
    alignItems: 'flex-end',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  emoji:{
    backgroundColor:'white',
    height:responsiveWidth(10),
    width:responsiveWidth(10),
    borderRadius: responsiveWidth(10/2),
    // position:'absolute',
    // top:responsiveHeight(7),
    bottom:responsiveHeight(3),
    right:responsiveWidth(3),
    zIndex:3,
    alignItems:'center',
    alignSelf:'flex-end',
    justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  circlecard2: {
    height: responsiveWidth(100),
    // backgroundColor:'red',
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    position: "absolute",
    paddingHorizontal: responsiveWidth(3.5),
  },
  circlecard3: {
    height: responsiveWidth(100),
    // backgroundColor:'red',
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    position: "absolute",
    right: 0,
    paddingHorizontal: responsiveWidth(3.5),
  },
});