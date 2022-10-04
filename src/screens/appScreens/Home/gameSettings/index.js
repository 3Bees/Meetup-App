import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import Modal from "react-native-modal";

import { appImages } from "../../../../assets/utility";
import { Header } from "../../../../components/header";
import { appColor, textColor } from "../../../../constants/colors";
import MapView from "react-native-maps";
import { Switch, Icon } from "react-native-elements";
import Slider from "rn-range-slider";
import { styles } from "./style";
import { fontFamily } from "../../../../constants/fonts";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";
import {
  Thumb,
  RailSelected,
  Rail,
  Notch,
  Label,
} from "../../../../components/Slider";
import Notification from "../../../../components/notification";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import AS_KEYS from "../../../../constants/asynckeys";
import { getData, saveData } from "../../../../Backend/utility";
import COLLECTIONS from "../../../../Backend/collecctions";

const AppScreen = (props) => {
  const [scrollEnb, setscrollEnb] = useState();
  const [displayNotification, setdisplayNotification] = useState(false);
  const [boostModal, setBoostModal] = useState(false);
  const [user, setUser] = useState({});

  const [distanceLow, setdistanceLow] = useState(50);
  const [distanceHigh, setdistanceHigh] = useState(95);
  const [initialDist, setinitialDist] = useState(0);

  const [ageLow, setageLow] = useState(0);
  const [ageHigh, setageHigh] = useState(0);
  const [gameSwitch, setGameSwitch] = useState(true);
  const [token, setToken] = useState(false);
  const [maleFlag, setMaleFlag] = useState(false);
  const [femaleFlag, setFemaleFlag] = useState(false);
  const [transFlag, setTransFlag] = useState(false);
  const [nonBinaryFlag, setNonBinary] = useState(false);
  const [otherFlag, setOtherFlag] = useState(false);
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const renderThumb1 = useCallback(() => <Thumb />, []);
  const renderRail1 = useCallback(() => <Rail />, []);
  const renderRailSelected1 = useCallback(() => <RailSelected />, []);
  const renderLabel1 = useCallback((value) => <Label text={value} />, []);
  const renderNotch1 = useCallback(() => <Notch />, []);
  const [distanceChecked, setdistanceChecked] = useState(false);
  const handleValueChangeDistance = useCallback((low, high) => {
    setdistanceLow(low);
    setdistanceHigh(high);
    console.log(low);
    if (low === 500) {
      setdistanceChecked(true);
    }
  }, []);
  const handleValueChangeAge = useCallback((low, high) => {
    setageLow(low);
    setageHigh(high);
  }, []);
  useEffect(() => {
    get();

    props.navigation.addListener("focus", async () => {
      get();
    });
  }, []);
  const get = async () => {
    const uid = await AsyncStorageLib.getItem(AS_KEYS.TOKEN);
    const per = await getData(COLLECTIONS.PREFERENCE, uid);
    if (per) {
      console.log(
        "🚀 ~ file: index.js ~ line 95 ~ get ~ per",
        JSON.stringify(per, null, 2)
      );
      setageLow(per.ageFrom);
      setageHigh(per.ageTo);
      if (per.interested.length > 0) {
        per.interested.forEach((element) => {
          if (element === "Male") setMaleFlag(true);
          if (element === "Female") setFemaleFlag(true);
          if (element === "Trans") setTransFlag(true);
          if (element === "Non-Binary") setNonBinary(true);
        });
      }
      if (per.distance == Number.MAX_VALUE) {
        setdistanceChecked(true);
      }
      setdistanceLow(per.distance);
    } else {
      setMaleFlag(true);
      setFemaleFlag(true);
      setTransFlag(true);
      setNonBinary(true);
    }
    const usr = await getData(COLLECTIONS.USERS, uid);
    setUser(usr);
  };
  const settingSaved = async () => {
    var model = {
      ageFrom: 0,
      ageTo: 0,
      interested: [],
      distance: 0,
    };
    if (maleFlag) model.interested.push("Male");
    if (femaleFlag) model.interested.push("Female");
    if (transFlag) model.interested.push("Trans");
    if (nonBinaryFlag) model.interested.push("Non-Binary");
    model.ageFrom = Number(ageLow);
    model.ageTo = Number(ageHigh);
    model.distance = distanceLow;
    console.log(
      "🚀 ~ file: index.js ~ line 136 ~ settingSaved ~ distanceLow",
      distanceLow
    );
    const uid = await AsyncStorageLib.getItem(AS_KEYS.TOKEN);
    await saveData(COLLECTIONS.PREFERENCE, uid, model);

    setdisplayNotification(true);
    setTimeout(() => {
      setdisplayNotification(false);
      props.navigation.navigate("Main");
    }, 2500);
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={textColor.white} />
      <ScrollView scrollEnabled={scrollEnb}>
        <View
          style={{ marginTop: Platform.OS === "ios" ? responsiveHeight(1) : 0 }}
        >
          <Header
            title={"Game Settings"}
            onpress={() => props.navigation.goBack()}
            backIcon={"arrow-back-ios"}
            backIcontype={"material"}
            addicon={"arrow-back-ios"}
            addicontype={"material"}
            color={textColor.white}
          />
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Subscription")}
        >
          <Image source={appImages.upgrade} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.distanceWrapper}>
          <View style={styles.wrapper1}>
            <View style={styles.distanceView}>
              <Text style={styles.heading1}>Distance</Text>
              {!distanceChecked ? (
                <View style={styles.distanceVal}>
                  <Text style={{ color: textColor.secondary }}>Up to</Text>
                  <Text style={{ color: textColor.secondary }}>
                    {" "}
                    {distanceLow}{" "}
                  </Text>
                  <Text style={{ color: textColor.secondary }}>miles</Text>
                </View>
              ) : (
                <View style={styles.distanceVal}>
                  <Text style={{ color: textColor.secondary }}>
                    Any Distance
                  </Text>
                </View>
              )}
            </View>

            <Slider
              disableRange
              disabled={distanceChecked}
              min={10}
              max={500}
              step={1}
              high={distanceHigh}
              low={distanceLow}
              floatingLabel
              renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              renderLabel={renderLabel}
              renderNotch={renderNotch}
              onValueChanged={handleValueChangeDistance}
              onTouchStart={() => {
                setscrollEnb(false);
              }}
              onTouchEnd={() => {
                setscrollEnb(true);
              }}
            />
          </View>
          <View>
            {distanceChecked ? (
              <TouchableOpacity
                onPress={() => {
                  setdistanceChecked(!distanceChecked);
                  setdistanceLow(10);
                }}
                style={styles.checkedView}
              >
                <Text style={styles.anyTxt}>ANY</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.anyUnchecked}
                onPress={() => {
                  setdistanceChecked(!distanceChecked);
                  setdistanceLow(Number.MAX_VALUE);
                }}
              >
                <Text style={styles.anyTxt2}>ANY</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.mainWrapper}>
          <View style={styles.ageView}>
            <Text style={styles.heading1}>Age Range</Text>
            <Text style={styles.ageText}>
              {ageLow}-{ageHigh}
            </Text>
          </View>
          <Slider
            style={styles.slider}
            min={18}
            max={90}
            step={1}
            high={ageHigh}
            low={ageLow}
            floatingLabel
            renderThumb={renderThumb1}
            renderRail={renderRail1}
            renderRailSelected={renderRailSelected1}
            renderLabel={renderLabel1}
            renderNotch={renderNotch1}
            onTouchStart={() => {
              setscrollEnb(false);
            }}
            onTouchEnd={() => {
              setscrollEnb(true);
            }}
            onValueChanged={handleValueChangeAge}
          />
        </View>

        <View>
          <Text style={[styles.heading4]}>I am interested in</Text>
          <View style={styles.intrestbtnheader}>
            {maleFlag ? (
              <TouchableOpacity
                style={styles.genderCheckedView}
                onPress={() => setMaleFlag(!maleFlag)}
              >
                <Text style={styles.anyTxt}>MALE</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.malebtn, { marginLeft: responsiveWidth(4) }]}
                onPress={() => setMaleFlag(!maleFlag)}
              >
                <Text style={styles.anyTxt2}>MALE</Text>
              </TouchableOpacity>
            )}

            {femaleFlag ? (
              <TouchableOpacity
                style={styles.genderCheckedView}
                onPress={() => setFemaleFlag(!femaleFlag)}
              >
                <Text style={styles.anyTxt}>FEMALE</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setFemaleFlag(!femaleFlag)}
                style={[styles.malebtn, { marginLeft: responsiveWidth(4) }]}
              >
                <Text style={styles.anyTxt2}>FEMALE</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.intrestbtnheader}>
            {transFlag ? (
              <TouchableOpacity
                style={styles.genderCheckedView}
                onPress={() => setTransFlag(!transFlag)}
              >
                <Text style={styles.anyTxt}>TRANS</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.malebtn, { marginLeft: responsiveWidth(4) }]}
                onPress={() => setTransFlag(!transFlag)}
              >
                <Text style={styles.anyTxt2}>TRANS</Text>
              </TouchableOpacity>
            )}

            {nonBinaryFlag ? (
              <TouchableOpacity
                style={styles.genderCheckedView}
                onPress={() => setNonBinary(!nonBinaryFlag)}
              >
                <Text style={styles.anyTxt}>NON-BINARY</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setNonBinary(!nonBinaryFlag)}
                style={[styles.malebtn, { marginLeft: responsiveWidth(4) }]}
              >
                <Text style={styles.anyTxt2}>NON-BINARY</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.locationview}
          disabled
          onPress={() => props.navigation.navigate("LocationDetail")}
        >
          <Text style={styles.locatontxt}>Location</Text>
          <Text
            style={[
              styles.locatontxt,
              {
                fontFamily: fontFamily.appTextRegular,
                fontSize: responsiveFontSize(2),
                color: textColor.primary,
                marginBottom: responsiveHeight(2),
              },
            ]}
          >
            {(user.country != undefined &&
              user.city != undefined &&
              user.hasOwnProperty("city") &&
              user.hasOwnProperty("country") &&
              user.city != undefined) ||
            user.country != undefined
              ? `${user.city != undefined ? user.city : ""}, ${
                  user.country != undefined ? user.country : ""
                }`
              : "No Locaction  Selected"}
          </Text>
          <View style={styles.map}>
            <MapView
              scrollEnabled={false}
              style={{ ...StyleSheet.absoluteFillObject }}
              region={{
                latitude:
                  user.location != undefined ? user.location.latitude : 0,
                longitude:
                  user.location != undefined ? user.location.longitude : 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.gamebtnheader}>
          <View style={styles.gamebtn}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ marginRight: responsiveWidth(2) }}>
                Show me in games
              </Text>
              <Icon
                name={"info-with-circle"}
                type={"entypo"}
                color={"#8e8e8e"}
                size={20}
                onPress={() => setBoostModal(!boostModal)}
              />
            </View>
            <Switch
              value={gameSwitch}
              onChange={(value) => setGameSwitch(!gameSwitch)}
              color={textColor.secondary}
            />
          </View>
          <View style={[styles.gamebtn, { borderBottomWidth: 0 }]}>
            <Text>Autocomplete last token</Text>
            <Switch value={token} onChange={(value) => setToken(!token)} />
          </View>
        </View>
        <View style={styles.resetbtnheader}>
          <TouchableOpacity
            style={styles.resetbtn1}
            onPress={() => settingSaved()}
          >
            <Text style={styles.resetbtntxt}>SAVE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetbtn}>
            <Text style={styles.resetbtntxt2}>RESET</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: responsiveHeight(5) }}></View>
      </ScrollView>
      {displayNotification ? (
        <Notification
          Notificationtype={"success"}
          text={"Settings Applied Successfully"}
        />
      ) : null}

      <Modal
        animationIn="bounceInDown"
        animationOut="bounceOutDown"
        animationInTiming={1500}
        animationOutTiming={1500}
        //  animationOutTiming={1500}
        backdropTransitionOutTiming={0}
        hasBackdrop={true}
        //  hideModalContentWhileAnimating={true}
        backdropColor={"black"}
        backdropOpacity={0.85}
        isVisible={boostModal}
      >
        {/* <View style={styles.Modalbg}> */}
        <ImageBackground style={styles.Modalbg2} source={appImages.modalBg}>
          <View
            style={{
              height: responsiveHeight(15),
              width: responsiveHeight(15),
              borderRadius: responsiveHeight(15) / 2,
              borderWidth: 8,
              borderColor: "white",
              alignItems: "center",
              justifyContent: "center",
              bottom: responsiveHeight(7),
            }}
          >
            <Icon
              name={"clockcircle"}
              type={"antdesign"}
              color={"#fff"}
              size={55}
            />
          </View>
          <Text
            style={[
              styles.boostTxt,
              // {backgroundColor:'green'}
            ]}
          >
            Need to take a break? No stress! Hide yourself from future game
            boards with this option. All your current messages and matches will
            remain in place.
          </Text>
          <View style={[styles.btnGroup]}>
            <TouchableOpacity
              style={[styles.yesBtn, { height: responsiveHeight(7) }]}
              onPress={() => setBoostModal(!boostModal)}
            >
              <Text
                style={[styles.yesTxt, { fontSize: responsiveFontSize(2.6) }]}
              >
                GOT IT
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        {/* </View> */}
      </Modal>
    </View>
  );
};
export default AppScreen;
