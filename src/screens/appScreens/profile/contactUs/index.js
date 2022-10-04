import React, { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar, Image } from "react-native";
import { styles } from "./style";
import { Header } from "../../../../components/header";
import { appColor, textColor } from "../../../../constants/colors";
import { TextInput } from "react-native-gesture-handler";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const AppScreen = (props) => {
  const [message, setMessage] = useState("");
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={textColor.white} />

      <Header
        title={"Contact Us"}
        onpress={() => props.navigation.goBack()}
        backIcon={"arrow-back-ios"}
        backIcontype={"material"}
        addicon={"arrow-back-ios"}
        addicontype={"material"}
        color={textColor.white}
      />
      <View style={styles.txtview}>
        <Image source={require('../../../../assets/images/keeboName.png')} style={{ height: responsiveHeight(15), width: responsiveWidth(55), resizeMode: 'contain', alignSelf: 'center' }} />
        <Text style={styles.txt2}>Need help with something? Let us know!</Text>

        <View style={styles.TextInput}>
          <TextInput
            multiline={true}
            value={message}
            onChangeText={(message) => setMessage(message)}
          />
        </View>

        <TouchableOpacity
          style={styles.yesBtn}
          onPress={() => {
            //

            setMessage("");
          }}
        >
          <Text style={styles.yesTxt}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AppScreen;
