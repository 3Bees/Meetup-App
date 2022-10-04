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
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { appColor, textColor, bggradientColor } from "../../../constants/colors";
import { appImages } from "../../../assets/utility";
import Swiper from 'react-native-swiper';
import { Icon } from "react-native-elements";

const Subscription = (props) => {
  const [selected, setSelected] = useState(false);
  const [selected1, setSelected1] = useState(false);
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={textColor.white} barStyle={"dark-content"} />
      <View style={styles.subtitleview}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image source={appImages.cheveronbackblack} />
        </TouchableOpacity>
        <Text style={styles.subtitle}>Upgrade Plan</Text>
        <View>
          <Text style={{ color: "white" }}>.</Text>
        </View>
      </View>
      <View style={styles.hairline}></View>
      <TouchableOpacity
        onPress={() => {
          setSelected(true), setSelected1(false);
        }}
      >
        <View
          style={[
            styles.freesubview,
            {
              borderWidth: selected
                ? responsiveWidth(0.5)
                : responsiveWidth(0.5),
              borderColor: selected ? appColor.appbackground : "transparent",
            },
          ]}
        >
          <Image
            source={appImages.freelogoimage}
            style={styles.freelogoimage}
          />
          <Text style={styles.keebofreetext}>Keebo Free</Text>
          <Text style={styles.pricetext}>$0</Text>
          <Text style={styles.detailstext}>
            {"25 games per day \n1 free soulmate per day"}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelected1(true), setSelected(false);
        }}
      >
        <View
          style={[
            styles.premiumsubview,
            {
              // backgroundColor:textColor.secondary,
              borderWidth: selected1
                ? responsiveWidth(0.5)
                : responsiveWidth(0.5),
              borderColor: selected1 ? bggradientColor.c2 : "transparent",
            },
          ]}
        // imageStyle={[styles.bgimage]}
        // source={appImages.bluebgimage}
        >
          <Image source={appImages.DSolid2} style={styles.freelogoimage} />
          <Text style={[styles.keebofreetext1]}>Keebo Premium</Text>
          <Text style={[styles.pricetext1]}>$5 / month</Text>
          <Swiper
            onTouchStart={() => {
              setSelected1(true), setSelected(false);
            }}
            autoplayTimeout={2.1}
            autoplay={true}
            removeClippedSubviews={false}
            showsButtons={false}
            showsPagination={false}>
            <View style={[styles.premiumsubview2, { backgroundColor: 'transparent' }]}>
              <Icon
                name="infinity"
                type="font-awesome-5"
                color={textColor.secondary}
                size={responsiveHeight(6.5)}
                style={{ alignSelf: 'flex-end' }}
              />

              <Text style={styles.detailstext1}>
                {
                  "Unlimited games"
                }
              </Text>
            </View>
            <View style={[styles.premiumsubview2, { backgroundColor: 'transparent' }]}>
              <Image source={require('../../../assets/images/newRing.png')} style={styles.freelogoimage2} />


              <Text style={[styles.detailstext1, { marginTop: responsiveHeight(2.6) }]}>
                {
                  "5 Soulmates Per Day"
                }
              </Text>
            </View>
            <View style={[styles.premiumsubview2, { backgroundColor: 'transparent' }]}>
              <Image source={require('../../../assets/images/energy.png')} style={styles.freelogoimage2} />


              <Text style={[styles.detailstext1, { marginTop: responsiveHeight(2.6) }]}>
                {
                  "1 Boost Per Month"
                }
              </Text>
            </View>
            <View style={[styles.premiumsubview2, { backgroundColor: 'transparent' }]}>
              <Icon
                name="location-sharp"
                type="ionicon"
                color={textColor.secondary}
                size={responsiveHeight(6.5)}
                style={{ alignSelf: 'flex-end' }}
              />
              <Text style={styles.detailstext1}>
                {
                  "Use Any Location"
                }
              </Text>
            </View>
          </Swiper>
        </View>
      </TouchableOpacity>


      {/* </TouchableOpacity> */}
      {selected ? (
        <TouchableOpacity
          style={styles.buttons}
          onPress={() =>
            props.navigation.navigate("Premium", {
              text: "free",
              payment: false,
            })
          }
        >
          <Text style={styles.continuetext}>Continue</Text>
        </TouchableOpacity>
      ) : null}
      {selected1 ? (
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => props.navigation.navigate("Premium", { text: "paid" })}
        >
          <Text style={styles.continuetext}>Continue</Text>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
};
export default Subscription;
