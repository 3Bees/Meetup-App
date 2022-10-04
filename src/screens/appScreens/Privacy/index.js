import React from "react";
import { View, Text, ScrollView, StatusBar } from "react-native";
import { styles } from "./style";
import { Header } from "../../../components/header";
import { appColor, textColor } from "../../../constants/colors";

const Privacy = (props) => {
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={textColor.white} />

      <Header
        title={"Privacy Policy"}
        onpress={() => props.navigation.goBack()}
        backIcon={"arrow-back-ios"}
        backIcontype={"material"}
        addicon={"arrow-back-ios"}
        addicontype={"material"}
        color={textColor.white}
      />
      <View style={styles.txtview}>
        <Text style={styles.TermsConditiontext}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupiLorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.datat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </Text>
      </View>
      <View style={styles.txtview}>
        <Text style={styles.TermsConditiontext}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupiLorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.datat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </Text>
      </View>
      <View style={styles.txtview}>
        <Text style={styles.TermsConditiontext}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupiLorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.datat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </Text>
      </View>
    </ScrollView>
  );
};
export default Privacy;
