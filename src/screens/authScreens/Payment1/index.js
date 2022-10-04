import React, { useState, useRef } from "react";
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
import RBSheet from "react-native-raw-bottom-sheet";

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { appColor, textColor } from "../../../constants/colors";
import { appImages } from "../../../assets/utility";
import { FlatList } from "react-native-gesture-handler";

const Payments = (props) => {
  const {text} = props.route.params;
  const {number} = props.route.params;
  const refRBSheet = useRef();

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
      <View style={styles.hairline} />

      <View style={styles.titleview}>
        <Text style={styles.title1}>Subscription</Text>
        <TouchableOpacity
        onPress={()=>props.navigation.navigate('Subscription')}
        >
        <Text style={styles.title2}>Change Plan</Text>
        </TouchableOpacity>
       
      </View>
      {text==='paid'?(
      <ImageBackground 
      source={appImages.bluebgimage}
      style={[styles.freesubview]}
      imageStyle={{borderRadius:responsiveWidth(3)}}
      ><View>
        <View style={styles.card}>
          <View style={styles.logoview}>
            <Image
              source={appImages.ringimage}
              style={styles.freelogoimage}
            />
            <Text style={[styles.keebofreetext,{color:textColor.white}]}>Keebo Premium</Text>
            <View>
            <Text style={[styles.pricetext,{color:textColor.white,marginLeft: responsiveWidth(17)}]}>$5
            <Text style={{fontSize:responsiveFontSize(1.5)}}>
                /month
            </Text>
            </Text>
          </View>
          </View>
         
        </View>

        <Text style={[styles.detailstext,{color:textColor.white}]}>
          {"Unlimited games  \n5 free soulmate per day  \nUse any location"}
        </Text>
        </View>
      </ImageBackground>):
      (
      <View style={[styles.freesubview]}>
        <View style={styles.card}>
          <View style={styles.logoview}>
            <Image
              source={appImages.freelogoimage}
              style={styles.freelogoimage}
            />
            <Text style={[styles.keebofreetext,{color:textColor.primary}]}>Keebo Free</Text>
          </View>
          <View>
            <Text style={styles.pricetext}>$0</Text>
          </View>
        </View>

        <Text style={styles.detailstext}>
          {"25 games per day \n1 free soulmate per day"}
        </Text>
      </View>
       )}
      <View style={styles.titleview1}>
        <Text style={styles.title1}>Add Ons</Text>
        <Text style={styles.title2}></Text>
      </View>
     
      <FlatList
        data={Data1}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.flatlisttopview}>
            <View style={styles.flatlistfirstview}>
              <Text style={styles.flatlisttite}>{item.Title}</Text>
              <Text style={styles.numberofitems}>{item.detail}</Text>
            </View>
            <View style={styles.flatlistsecondview}>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.hairline}></View>
      <View style={styles.subtotalview}>
        <Text style={styles.titletext1}>Total</Text>
        <Text style={styles.titleprice1}>$7.20</Text>
      </View>
      <TouchableOpacity style={styles.buttons1}>
        <Text style={styles.continuetext1}>Add Payment Method</Text>
      </TouchableOpacity>
      <View style={styles.detailsview1}>
        <View>
          <Text style={styles.addtexts}>Payment Method</Text>
          <Text style={{color:textColor.placholderColor}}>{number}</Text>
        </View>
        <TouchableOpacity
        onPress={()=>props.navigation.goBack()}
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
            <Image source={appImages.circlecheck} style={styles.circlecheck} />
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
                  refRBSheet.current.close(), props.navigation.navigate("Home");
                }}
              >
                <Text style={styles.continuetext}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RBSheet>
    </ScrollView>
  );
};
export default Payments;
