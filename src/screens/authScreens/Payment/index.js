import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import { styles } from "./style";
import LinearGradient from "react-native-linear-gradient";

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import {
  appColor,
  textColor,
  bggradientColor,
} from "../../../constants/colors";
import { appImages } from "../../../assets/utility";
import { FlatList } from "react-native-gesture-handler";

const Payments = (props) => {
  const [Data1, setData1] = useState([
    {
      id: 1,
      Title: "Pack of 20 Soulmates ",
      detail: "x4",
      price: "$64",
    },
    {
      id: 2,
      Title: "Pack of 100 Games",
      detail: "x1",
      price: "$6",
    },
  ]);
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={textColor.white} barStyle={"dark-content"} />
      <View style={styles.subtitleview}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image source={appImages.cheveronbackblack} />
        </TouchableOpacity>
        <Text style={styles.subtitle}>Payment</Text>
      </View>
      <View style={styles.titleview}>
        <Text style={styles.title1}>Subscription</Text>
        <TouchableOpacity onPress={() =>props.navigaion.navigate('Subscription')}>
        <Text style={styles.title2}>Change Plan</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.freesubview]}>
        <View style={styles.card}>
          <View style={styles.logoview}>
            <Image
              source={appImages.freelogoimage}
              style={styles.freelogoimage}
            />
            <Text style={styles.keebofreetext}>Keebo Free</Text>
          </View>
          <View>
            <Text style={styles.pricetext}>$0</Text>
          </View>
        </View>

        <Text style={styles.detailstext}>
          {"25 games per day \n1 free soulmate per day"}
        </Text>
      </View>
      <View style={styles.titleview1}>
        <Text style={styles.title1}>Add Ons</Text>
        <TouchableOpacity onPress={()=>props.navigation.navigate('Addons')}>
          <Text style={styles.title2}>Update Add Ons</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={Data1}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <LinearGradient
            style={styles.flatlisttopview}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={[bggradientColor.c1, bggradientColor.c2]}
          >
            <View style={styles.flatlistfirstview}>
              <Text style={styles.flatlisttite}>{item.Title}</Text>
              <Text style={styles.numberofitems}>{item.detail}</Text>
            </View>
            <View style={styles.flatlistsecondview}>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </LinearGradient>
        )}
      />
      <View style={styles.hairline}></View>
      <View style={styles.subtotalview}>
        <Text style={styles.titletext1}>Total</Text>
        <Text style={styles.titleprice1}>$7.20</Text>
      </View>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => props.navigation.navigate("Paymentinfo")}
      >
        <Text style={styles.continuetext}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default Payments;
