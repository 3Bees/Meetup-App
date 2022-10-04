import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  ImageBackground,
  TextInput,
} from "react-native";
import { styles } from "./style";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { appColor, textColor } from "../../../constants/colors";
import { appImages } from "../../../assets/utility";
const Payment1 = (props) => {
  const [number,setNumber] = useState('')
  
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={textColor.white} barStyle={"dark-content"} />
      <View style={styles.subtitleview}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image source={appImages.cheveronbackblack} />
        </TouchableOpacity>

        <Text style={styles.subtitle}>Payment Info</Text>
      </View>
      <View style={styles.hairline} />
      <View style={styles.detailsview}>
        <Text style={styles.addtexts}>Card Number</Text>
        <TextInput
          placeholder={"1234  1234  1234  1234"}
          onChangeText={(text)=>setNumber(text)}
          keyboardType='number-pad'
          placeholderTextColor={textColor.placholderColor}
          style={{ color: textColor.primary }}
        />
      </View>
      <View style={styles.detailsview1}>
        <Text style={styles.addtexts}>Card Holder Name</Text>
        <TextInput
          placeholder={"John Doe"}
          placeholderTextColor={textColor.placholderColor}
        />
      </View>
      <View style={styles.viewbottom}>
        <View style={styles.inputview}>
          <Text style={styles.addtexts}>Expiry</Text>
          <TextInput
            placeholder={"12/23"}
            placeholderTextColor={textColor.placholderColor}
          />
        </View>
        <View style={styles.inputview1}>
          <Text style={styles.addtexts}>CVV</Text>
          <TextInput
            placeholder={"• • • "}
            placeholderTextColor={textColor.placholderColor}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => {
         
          props.navigation.navigate("Premium",{payment:true,number:number})
        }}
      >
        <Text style={styles.continuetext}>Add Payment Method</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default Payment1;
