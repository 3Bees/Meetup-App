import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import { styles } from "./style";
import { Header } from "../../../../components/header";
import { Icon } from "react-native-elements";
import { appColor, textColor } from "../../../../constants/colors";
import { appImages } from "../../../../assets/utility";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const AppScreen = (props) => {
  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const refRBSheet = useRef();
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={textColor.white} />

      <Header
        title={"Report"}
        onpress={() => props.navigation.goBack()}
        backIcon={"arrow-back-ios"}
        backIcontype={"material"}
        addicon={"arrow-back-ios"}
        addicontype={"material"}
        color={textColor.white}
      />
      <View style={styles.headingviews}>
        <Text style={styles.headingtxt}>Select at least one reasone</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setCheck(!check);
          }}
        >
          <Icon
            name="checkcircle"
            type={"antdesign"}
            color={check ? textColor.secondary : textColor.lightgrey}
          />
          <Text style={styles.btntxt}>Inapporopriate Content</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setCheck1(!check1);
          }}
        >
          <Icon
            name="checkcircle"
            type={"antdesign"}
            color={check1 ? textColor.secondary : textColor.lightgrey}
          />
          <Text style={styles.btntxt}>Fake Profile</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={[
            styles.btn,
            {
              borderBottomWidth: responsiveWidth(0.3),
              borderBottomColor: textColor.lightgrey,
            },
          ]}
          onPress={() => {
            setCheck2(!check2);
          }}
        >
          <Icon
            name="checkcircle"
            type={"antdesign"}
            color={check2 ? textColor.secondary : textColor.lightgrey}
          />
          <Text style={styles.btntxt}>Hate Speech</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.submitbtn}
        onPress={() => {
          refRBSheet.current.open();
        }}
      >
        <Text style={[styles.btntxt, { color: textColor.white }]}>Submit</Text>
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.3)",
          },
          container: {
            borderTopLeftRadius: responsiveWidth(10),
            borderTopRightRadius: responsiveWidth(10),
            height: responsiveHeight(30),
          },
          draggableIcon: {
            backgroundColor: "white",
          },
        }}
      >
        <View>
          <View>
            <Image source={appImages.circlecheck} style={styles.circlecheck} />
            <Text style={styles.reportbtsheettxt}>Report Submitted</Text>
            <View style={styles.buttonsview1}>
              <TouchableOpacity
                style={styles.buttons1}
                onPress={() => {
                  props.navigation.navigate("Home");
                  refRBSheet.current.close();
                }}
              >
                <Text style={styles.continuetologintext}>Continue Playing</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};
export default AppScreen;
