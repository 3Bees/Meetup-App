import React, { useState, useEffect, useRef } from "react";
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
import RBSheet from "react-native-raw-bottom-sheet";
import {
  appColor,
  textColor,
  bggradientColor,
} from "../../../constants/colors";
import { appImages } from "../../../assets/utility";
import { FlatList } from "react-native-gesture-handler";

const Payments = (props) => {
  const refRBSheet = useRef();
  useEffect(() => {});
  const { text } = props.route.params;
  const { payment } = props.route.params;
  const { item } = props.route.params;
  const { number } = props.route.params;

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
      <View style={styles.line} />
      <View style={styles.titleview}>
        <Text style={styles.title1}>Subscription</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Subscription")}
        >
          <Text style={styles.title2}>Change Plan</Text>
        </TouchableOpacity>
      </View>
      {text === "paid" ? (
        <View
          // source={appImages.bluebgimage}
          style={[styles.freesubview,{backgroundColor:textColor.secondary}]}
          // imageStyle={{ borderRadius: responsiveWidth(3) }}
        >
          <View
            style={[
              {
                // backgroundColor: "rgba(0,0,0,0.3)",
                borderRadius: responsiveWidth(4),
                height: responsiveHeight(23),
              },
            ]}
          >
            <View style={styles.card}>
              <View style={styles.logoview}>
                <Image
                  source={appImages.ringimage}
                  style={styles.freelogoimage}
                />
                <Text style={[styles.keebofreetext]}>Keebo Premium</Text>
                <View>
                  <Text style={styles.pricetext}>
                    $5
                    <Text style={{ fontSize: responsiveFontSize(1.5) }}>
                      /month
                    </Text>
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.detailstext}>
              {
                "Unlimited games  \n5 free soulmate per day  \n1 free boost per month \nUse any location"
              }
            </Text>
          </View>
        </View>
      ) : (
        <View style={[styles.freesubview]}>
          <View style={styles.card}>
            <View style={styles.logoview}>
              <Image
                source={appImages.freelogoimage}
                style={styles.freelogoimage}
              />
              <Text
                style={[styles.keebofreetext, { color: textColor.primary }]}
              >
                Keebo Free
              </Text>
            </View>
            <View>
              <Text style={[styles.pricetext, { color: textColor.secondary }]}>
                $0
              </Text>
            </View>
          </View>

          <Text
            style={[styles.detailstext, { color: textColor.placholderColor }]}
          >
            {"25 games per day \n1 free soulmate per day"}
          </Text>
        </View>
      )}
      <View style={styles.titleview1}>
        <Text style={styles.title1}>Add Ons</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("Addon")}>
          <Text style={styles.title2}>Update Add Ons</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={item}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View>
            {item.counter === 0 ? null : (
              <LinearGradient
                style={styles.flatlisttopview}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={[bggradientColor.c1, bggradientColor.c2]}
              >
                <View style={styles.flatlistfirstview}>
                  <Text style={styles.flatlisttite}>{item.name}</Text>
                  <Text style={styles.numberofitems}>x{item.counter}</Text>
                </View>
                <View style={styles.flatlistsecondview}>
                  <Text style={styles.price}>{item.price}</Text>
                </View>
              </LinearGradient>
            )}
          </View>
        )}
      />
      <View style={styles.hairline}></View>
      <View style={styles.subtotalview}>
        <Text style={styles.titletext1}>Total</Text>
        <Text style={styles.titleprice1}>$79.20</Text>
      </View>
      {payment ? (
        <View>
          <TouchableOpacity
            style={styles.buttons1}
            onPress={() => props.navigation.navigate("Paymentinfo")}
          >
            <Text style={styles.continuetext1}>Add Payment Method</Text>
          </TouchableOpacity>
          <View style={styles.detailsview1}>
            <View>
              <Text style={styles.addtexts}>Payment Method</Text>
              <Text style={{ color: textColor.placholderColor }}>{number}</Text>
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Paymentinfo")}
            >
              <Text style={styles.changetext}>Change</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => refRBSheet.current.open()}
          >
            <Text style={styles.continuetext}>Continue</Text>
          </TouchableOpacity>
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={responsiveHeight(45)}
            customStyles={{
              wrapper: {
                backgroundColor: "rgba(0,0,0,0.3)",
              },
              container: {
                borderTopRightRadius: responsiveWidth(10),
                borderTopLeftRadius: responsiveWidth(10),
                elevation: 2,
              },
              draggableIcon: {
                backgroundColor: textColor.white,
                width: responsiveWidth(40),
              },
            }}
          >
            <View>
              <View>
                <Image
                  source={appImages.circlecheck}
                  style={styles.circlecheck}
                />
                <View style={styles.rbtextsview}>
                  <Text style={styles.passwordupdatedtext}>
                    {"Payment Done via \nApp Store / Play Store"}
                  </Text>
                  <Text style={styles.ContniueTxt}>
                    You can now start using the app
                  </Text>
                </View>
                <View style={styles.buttonsview1}>
                  <TouchableOpacity
                    style={styles.buttonrb}
                    onPress={() => {
                      refRBSheet.current.close(),
                        props.navigation.navigate("Home");
                    }}
                  >
                    <Text style={styles.continuetext}>Get Started</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </RBSheet>
        </View>
      ) : null}
      {payment ? null : (
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => props.navigation.navigate("Paymentinfo")}
        >
          <Text style={styles.continuetext}>Continue</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};
export default Payments;
