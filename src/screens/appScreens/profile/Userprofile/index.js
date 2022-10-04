import React, { useEffect, useState } from "react";
import { appImages } from "../../../../assets/utility";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import {
  appColor,
  bggradientColor,
  textColor,
} from "../../../../constants/colors";
import { Icon } from "react-native-elements";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { styles } from "./style";
import {
  SortableContainer,
  SortableGrid,
  SortableTile,
} from "react-native-drag-and-sort";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native";
import Modal from "react-native-modal";

import { DragSortableView } from "react-native-drag-sort";
import ImagePicker from "react-native-image-crop-picker";
import LinearGradient from "react-native-linear-gradient";
import { fontFamily } from "../../../../constants/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from "../../../../Backend/utility";
import { getAge } from "../../../../global/helpers";
import COLLECTIONS from "../../../../Backend/collecctions";
import AS_KEYS from "../../../../constants/asynckeys";
import Loder from "../../../../components/loader";

const App = (props) => {
  const [boosts, setBoosts] = useState(2);
  const [soulmates, setSoulmates] = useState(0);
  const [boostOutModal, setBoostOutModal] = useState(false);
  const [ringOutModal, setRingOutModal] = useState(false);
  const [premium, setpremium] = useState(true);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    props.navigation.addListener("focus", async () => {
      setLoading(true);

      AsyncStorage.getItem(AS_KEYS.TOKEN).then((token) => {
        if (token) {
          getData(COLLECTIONS.USERS, token).then((user) => {
            setUser(user);
            setLoading(false);
          });
        }
      });
    });
  }, [props.route.params]);

  const renderNameAndAge = () => {
    var age = getAge(user?.date_of_birth);

    if (
      user?.date_of_birth == null ||
      user?.date_of_birth == undefined ||
      user?.date_of_birth == ""
    ) {
      age = 1;
    }
    var name = user?.name;
    if (name == null || name == undefined || name == "") {
      name = "Enter name in Edit Profile";
    }

    if (age) return `${name}, ${age}`;
    else return `${name}`;
  };

  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        <LinearGradient
          colors={[bggradientColor.c1, bggradientColor.c2]}
          style={styles.container}
        >
          <StatusBar
            backgroundColor={textColor.white}
            barStyle={"dark-content"}
          />
          <View style={styles.parent}>
            <View style={styles.child}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("EditProfilePictures", {
                    screen_name: "Userprofile",
                  })
                }
              >
                <ImageBackground
                  source={{
                    uri:
                      user.user_images?.length > 0
                        ? user.user_images[0]
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
                  }}
                  style={styles.userimage}
                  imageStyle={{ borderRadius: responsiveWidth(35) / 2 }}
                />
              </TouchableOpacity>
              <View style={styles.NameView}>
                <Text style={styles.nameText}>{renderNameAndAge()}</Text>
              </View>
              <View style={styles.multiiconsViews}>
                <View style={styles.iconMainview}>
                  <TouchableOpacity
                    style={styles.iconsView}
                    onPress={() =>
                      props.navigation.navigate("SettingsStackScreens")
                    }
                  >
                    <Icon
                      type={"ionicon"}
                      name={"settings"}
                      color={textColor.lightgrey}
                      size={responsiveFontSize(4.5)}
                    />
                  </TouchableOpacity>
                  <Text style={styles.iconsLabel}>SETTINGS</Text>
                </View>
                <View style={styles.iconMainview}>
                  <TouchableOpacity
                    style={styles.iconsView}
                    onPress={() => props.navigation.navigate("ContactUs")}
                  >
                    <Icon
                      name={"shield"}
                      type={"ionicon"}
                      color={textColor.lightgrey}
                      size={responsiveFontSize(4.5)}
                    />
                  </TouchableOpacity>
                  <Text style={styles.iconsLabel}>HELP</Text>
                </View>
              </View>
              <View style={styles.camButton}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => props.navigation.navigate("Profile")}
                >
                  <LinearGradient
                    colors={[textColor.secondary, textColor.secondary]}
                    style={styles.camView}
                  >
                    <Icon
                      type={"material-community"}
                      name={"lead-pencil"}
                      color={textColor.white}
                      size={responsiveFontSize(5.6)}
                    />
                  </LinearGradient>
                </TouchableOpacity>
                <Text style={styles.iconsLabel}>EDIT PROFILE</Text>
              </View>
            </View>
          </View>
          <View style={styles.bottommainView}>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.iconsView}
                onPress={() => setRingOutModal(true)}
              >
                <Image
                  source={appImages.ringIconblue2}
                  style={styles.boosticon}
                />
              </TouchableOpacity>
              <Text style={[styles.iconsLabel, { color: textColor.white }]}>
                {soulmates} Soulmates
              </Text>
              <TouchableOpacity>
                <Text
                  style={[styles.iconsLabel, { color: textColor.secondary }]}
                  onPress={() => props.navigation.navigate("Addon")}
                >
                  GET MORE
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.iconsView}
                onPress={() => setBoostOutModal(true)}
              >
                <Image source={appImages.energy} style={styles.boosticon} />
              </TouchableOpacity>
              <Text style={[styles.iconsLabel, { color: textColor.white }]}>
                {boosts} Boosts
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Addon")}
              >
                <Text
                  style={[styles.iconsLabel, { color: textColor.secondary }]}
                >
                  GET MORE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {premium ? (
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Subscription")}
            >
              <Image source={appImages.upgrade} style={styles.image} />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={[
              styles.button,
              {
                marginTop: premium
                  ? responsiveHeight(2.5)
                  : responsiveHeight(6),
              },
            ]}
            onPress={() => props.navigation.navigate("Game")}
          >
            <Text style={styles.buttontxt}>GAME SETTINGS</Text>
          </TouchableOpacity>
          {/* Boost modal */}
          <Modal
            animationIn="bounceInDown"
            animationOut="slideOutDown"
            animationInTiming={1500}
            animationOutTiming={1500}
            backdropTransitionOutTiming={0}
            hasBackdrop={true}
            backdropColor={"black"}
            backdropOpacity={0.85}
            isVisible={boostOutModal}
          >
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
                <Text style={styles.boostCount}>x {boosts}</Text>

                <Image
                  style={{
                    height: responsiveHeight(10),
                    width: responsiveHeight(10),
                    resizeMode: "contain",
                  }}
                  source={require("../../../../assets/images/BoltWhite.png")}
                />
              </View>
              <Text
                style={[
                  styles.boostTxt,
                  // {backgroundColor:'green'}
                ]}
              >
                {boosts < 1
                  ? "Oops!\n You are all out of Boosts"
                  : " Boost will cut you to the front of the line and show you on more boards for 30 minutes."}
              </Text>
              <View
                style={[
                  styles.btnGroup,
                  // {backgroundColor:'red'}
                ]}
              >
                {boosts > 1 ? (
                  <TouchableOpacity
                    style={[styles.yesBtn, { height: responsiveHeight(7) }]}
                    onPress={() => {
                      setBoostOutModal(!boostOutModal);
                    }}
                  >
                    <Text
                      style={[
                        styles.yesTxt,
                        { fontSize: responsiveFontSize(2.6) },
                      ]}
                    >
                      BOOST ME
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.yesBtn, { height: responsiveHeight(7) }]}
                    onPress={() => {
                      props.navigation.navigate("Addon");
                    }}
                  >
                    <Text
                      style={[
                        styles.yesTxt,
                        { fontSize: responsiveFontSize(2.6) },
                      ]}
                    >
                      GET MORE
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[styles.noBtn]}
                  onPress={() => setBoostOutModal(!boostOutModal)}
                >
                  <Text style={styles.noTxt}>NEVERMIND</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Modal>
          {/* soulmates modal */}
          <Modal
            animationIn="bounceInDown"
            animationOut="slideOutDown"
            animationInTiming={1500}
            backdropTransitionOutTiming={0}
            animationOutTiming={1500}
            hasBackdrop={true}
            backdropColor={"black"}
            backdropOpacity={0.85}
            isVisible={ringOutModal}
          >
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
                <Text style={styles.boostCount}>x {soulmates}</Text>

                <Image
                  style={{
                    height: responsiveHeight(10),
                    width: responsiveHeight(10),
                    resizeMode: "contain",
                  }}
                  source={require("../../../../assets/images/keeboWhite.png")}
                />
              </View>
              {soulmates === 0 ? (
                <>
                  <Text style={[styles.boostTxt2]}>
                    {" Oops!\n You are all out of Soulmates."}
                  </Text>
                  <View style={[styles.btnGroup]}>
                    <TouchableOpacity
                      style={[styles.yesBtn, { height: responsiveHeight(7) }]}
                      onPress={() => props.navigation.navigate("Addon")}
                    >
                      <Text
                        style={[
                          styles.yesTxt,
                          { fontSize: responsiveFontSize(2.6) },
                        ]}
                      >
                        GET MORE
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.noBtn]}
                      onPress={() => setRingOutModal(!ringOutModal)}
                    >
                      <Text style={styles.noTxt}>CLOSE</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <TouchableOpacity
                  style={[styles.yesBtn, { height: responsiveHeight(7) }]}
                  onPress={() => setRingOutModal(!ringOutModal)}
                >
                  <Text
                    style={[
                      styles.yesTxt,
                      { fontSize: responsiveFontSize(2.6) },
                    ]}
                  >
                    OK
                  </Text>
                </TouchableOpacity>
              )}
            </ImageBackground>
          </Modal>
        </LinearGradient>
      )}
    </>
  );
};

export default App;
