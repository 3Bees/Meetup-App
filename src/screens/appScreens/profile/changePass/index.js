import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { styles } from "./style";
import { Header } from "../../../../components/header";
import { textColor } from "../../../../constants/colors";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const AppScreen = (props) => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={textColor.white}
        translucent={false}
      />
      <View
        style={{ marginTop: Platform.OS === "ios" ? responsiveHeight(1) : 0 }}
      >
        <Header
          title={"Change Password"}
          onpress={() => props.navigation.goBack()}
          backIcon={"arrow-back-ios"}
          backIcontype={"material"}
          addicon={"arrow-back-ios"}
          addicontype={"material"}
          color={textColor.white}
        />
      </View>
      <View style={styles.lineview} />
      <View>
        <View style={styles.TextInpute}>
          <Text style={styles.lable}>Current Password</Text>
          <TextInput
            placeholder={"***********************************"}
            style={{
              marginLeft: responsiveWidth(3),
              color: textColor.primary,
              paddingTop: responsiveHeight(2),
            }}
            placeholderTextColor={textColor.placholderColor}
          />
        </View>
        <View style={styles.TextInpute}>
          <Text style={styles.lable}>New Password</Text>
          <TextInput
            placeholder={"***********************************"}
            style={{
              marginLeft: responsiveWidth(3),
              color: textColor.primary,
              paddingTop: responsiveHeight(2),
            }}
            placeholderTextColor={textColor.placholderColor}
          />
        </View>
        <View style={styles.TextInpute}>
          <Text style={styles.lable}>Confirm New Password</Text>
          <TextInput
            placeholder={"***********************************"}
            style={{
              marginLeft: responsiveWidth(3),
              color: textColor.primary,
              paddingTop: responsiveHeight(2),
            }}
            placeholderTextColor={textColor.placholderColor}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.goBack()}
      >
        <Text style={styles.buttontxt}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};
export default AppScreen;
