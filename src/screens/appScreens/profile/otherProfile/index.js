import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

import {
  appColor,
  buttonColor,
  bggradientColor,
  cardColor,
  iconColor,
} from "../../../../constants/colors";
import { appImages } from "../../../../assets/utility";
import { styles } from "./style";
import ImageView from "react-native-image-view";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Icon } from "react-native-elements";
import { fontFamily } from "../../../../constants/fonts";
import { textColor } from "../../../../constants/colors";
import { getData } from "../../../../Backend/utility";
import COLLECTIONS from "../../../../Backend/collecctions";
import { getAge, getDistanceFromLatLonInKm } from "../../../../global/helpers";
import Loder from "../../../../components/loader";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import AS_KEYS from "../../../../constants/asynckeys";

const AppScreen = (props) => {
  const refRBSheet = useRef();
  const unMatchRb = useRef();
  const reportRB = useRef();

  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [baloon, setBaloon] = useState(false);
  const [baloon1, setBaloon1] = useState(false);
  const [isImageViewVisible, setisImageViewVisible] = useState(false);
  const [heart, setHeart] = useState("");
  const [like, setLike] = useState("");
  const [laugh, setLaugh] = useState("");
  const [imageSource, setSource] = useState(0);
  const [loading, setLoading] = useState(true);

  const [heartflag, setHeartflag] = useState(false);
  const [likeflag, setLikeflag] = useState(false);
  const [laughflag, setLaughflag] = useState(false);
  const [heartflag1, setHeartflag1] = useState(false);
  const [likeflag1, setLikeflag1] = useState(false);
  const [laughflag1, setLaughflag1] = useState(false);
  const [isMatched, setisMatched] = useState(true);
  const [profileId, setProfileId] = useState("");
  const [profile, setProfile] = useState("");
  const [user, setUser] = useState({});
  const [dataSource, setDataSource] = useState([
    {
      id: "1",
      image: appImages.user1,
      baloonFlag: false,
    },
    {
      id: "2",
      image: appImages.user1,
      baloonFlag: false,
    },
    {
      id: "3",
      image: appImages.user1,
      baloonFlag: false,
    },
    {
      id: "4",
      image: appImages.user1,
      baloonFlag: false,
    },
  ]);
  const [dataSource1, setDataSource1] = useState([
    {
      id: "3",
      name: "DREAM JOB",
      cat: "Chef",
      flag: false,
      baloonFlag: false,
      like: false,
      heart: false,
      laugh: false,
    },
  ]);
  const [images, setImages] = useState([]);

  const setSlider = (x) => {
    let y = imageSource;

    if (x == 0) {
      if (imageSource !== 0) {
        setSource(--y);
      } else setSource(images.length - 1);
    } else if (x == 1) {
      if (imageSource !== images.length - 1) {
        setSource(++y);
      } else {
        setSource(0);
      }
    }
  };

  const get = async (id) => {
    const prof = await getData(COLLECTIONS.USERS, id);
    console.log(
      "🚀 ~ file: index.js ~ line 143 ~ get ~ prof",
      JSON.stringify(prof, null, 2)
    );

    if (prof.user_images) {
      var imgs = [];

      prof.user_images.forEach((element) => {
        imgs.push({
          source: { uri: element },
          baloonFlag: false,
          like: false,
          heart: false,
          laugh: false,
        });
      });
      setImages(imgs);
      setisMatched(false);
    }
    const userId = await AsyncStorageLib.getItem(AS_KEYS.TOKEN);
    const res = await getData(COLLECTIONS.USERS, userId);

    const prompts = await getData(COLLECTIONS.PROMPTS, userId);
    if (prompts) {
      const { Prompts } = prompts;
      var arr = [];
      Prompts.forEach((element) => {
        arr.push({
          id: element.key,
          name: element.title,
          cat: element.details,
          flag: false,
          baloonFlag: false,
          like: false,
          heart: false,
          laugh: false,
        });
      });

      setDataSource1(arr);
    } else {
      setDataSource1([]);
    }
    setUser(res);
    setProfile(prof);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setProfileId(props.route.params);
    get(props.route.params);
  }, []);

  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        <SafeAreaView style={[styles.container]}>
          <StatusBar
            backgroundColor="transparent"
            barStyle={"dark-content"}
            translucent={false}
          />
          <View style={styles.circlecardview}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.circlecard}
              onPress={() => props.navigation.goBack()}
            >
              <Icon
                name={"chevron-back"}
                type={"ionicon"}
                size={responsiveFontSize(3.5)}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={1}
              style={styles.circlecard}
              onPress={() => refRBSheet.current.open()}
            >
              <Icon name={"dots-three-vertical"} type={"entypo"} />
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
          onLongPress={() =>
            setBaloon(true)
          }
          activeOpacity={0.8}
        > */}
          <LinearGradient colors={["white", "white"]} style={styles.container}>
            <ScrollView>
              {images.length > 0 && (
                <GestureRecognizer
                  onSwipeLeft={() => setSlider(1)}
                  onSwipeRight={() => setSlider(0)}
                  style={{
                    flex: 1,
                    // backgroundColor:'red'
                  }}
                >
                  <TouchableOpacity
                    // style={{ marginTop: responsiveHeight(4) }}
                    // onPress={() => props.navigation.navigate('ProfileImage')}
                    // onPress={() => props.navigation.navigate("ProfileImage")}
                    activeOpacity={1}
                  >
                    <ImageBackground
                      source={images[imageSource].source}
                      style={styles.dp}
                      // imageStyle={{ borderRadius: 12 }}
                    >
                      <LinearGradient
                        colors={["transparent", "transparent"]}
                        style={{ flex: 1 }}
                      >
                        {/* {likeflag1 ? (
                          <View
                            style={[
                              styles.emoji,
                              {
                                left: responsiveWidth(30),
                                top: responsiveHeight(10),
                              },
                            ]}
                          >
                            <Icon
                              name={"like2"}
                              type="antdesign"
                              size={responsiveFontSize(2)}
                              color={textColor.secondary}
                            />
                          </View>
                        ) : null}
                        {heartflag1 ? (
                          <View
                            style={[
                              styles.emoji,
                              {
                                left: responsiveWidth(30),
                                top: responsiveHeight(10),
                              },
                            ]}
                          >
                            <Icon
                              name={"hearto"}
                              type="antdesign"
                              size={responsiveFontSize(2)}
                              color={textColor.secondary}
                            />
                          </View>
                        ) : null}
                        {laughflag1 ? (
                          <View
                            style={[
                              styles.emoji,
                              {
                                left: responsiveWidth(30),
                                top: responsiveHeight(10),
                              },
                            ]}
                          >
                            <Icon
                              name={"laughing"}
                              type="fontisto"
                              size={responsiveFontSize(2)}
                              color={textColor.secondary}
                            />
                          </View>
                        ) : null} */}

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingHorizontal: responsiveWidth(2),
                          }}
                        >
                          <TouchableOpacity
                            style={[styles.circlecard2]}
                            onPress={() => setSlider(0)}
                          >
                            <Icon
                              name={"chevron-back"}
                              type={"ionicon"}
                              color={"transparent"}
                              size={responsiveFontSize(5.5)}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.circlecard3]}
                            onPress={() => setSlider(1)}
                          >
                            <Icon
                              name={"chevron-forward"}
                              type={"ionicon"}
                              color={"transparent"}
                              size={responsiveFontSize(5.5)}
                            />
                          </TouchableOpacity>
                        </View>
                        <View>
                          <FlatList
                            data={images}
                            horizontal={true}
                            contentContainerStyle={{
                              height: 3,
                              width: "100%",
                              alignItems: "center",
                            }}
                            renderItem={({ item, index }) => (
                              <View
                                style={{
                                  height: 3,
                                  width: responsiveWidth(100) / images.length,
                                  backgroundColor:
                                    index === imageSource
                                      ? "white"
                                      : "rgba(0,0,0,0.1)",
                                }}
                              ></View>
                            )}
                          />
                        </View>
                        {/* 
                        <View style={styles.baloon}>
                          <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                              let arr = [...images];
                              arr.forEach((element) => {
                                element.baloonFlag = false;
                              });
                              arr[imageSource].baloonFlag = false;
                              arr[imageSource].like = true;
                              arr[imageSource].heart = false;
                              arr[imageSource].laugh = false;

                              // setFlag1(arr[index]);
                              setImages(arr);
                              // setLike("like2");
                            }}
                            style={{
                              zIndex: 3,
                              height: responsiveWidth(15),
                              width: responsiveWidth(15),
                              backgroundColor: "white",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: responsiveWidth(15),
                            }}
                          >
                            <Icon
                              name={
                                images[imageSource].like ? "like1" : "like2"
                              }
                              type="antdesign"
                              color={textColor.secondary}
                              size={40}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                              let arr = [...images];
                              arr.forEach((element) => {
                                element.baloonFlag = false;
                              });
                              arr[imageSource].baloonFlag = false;
                              arr[imageSource].like = false;
                              arr[imageSource].heart = false;
                              arr[imageSource].laugh = true;
                              setImages(arr);
                            }}
                            style={{
                              zIndex: 3,
                              height: responsiveWidth(15),
                              width: responsiveWidth(15),
                              backgroundColor: "white",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: responsiveWidth(15),
                            }}
                          >
                            {!images[imageSource].laugh ? (
                              <Image
                                source={require("../../../../assets/images/laugh2.png")}
                                style={{
                                  width: responsiveHeight(5.3),
                                  height: responsiveHeight(5.3),
                                  resizeMode: "contain",
                                }}
                              />
                            ) : (
                              <Image
                                source={require("../../../../assets/images/laugh.png")}
                                style={{
                                  width: responsiveHeight(5.3),
                                  height: responsiveHeight(5.3),
                                  resizeMode: "contain",
                                }}
                              />
                            )}
                          </TouchableOpacity>
                          <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                              let arr = [...images];
                              arr.forEach((element) => {
                                element.baloonFlag = false;
                              });
                              arr[imageSource].baloonFlag = false;
                              arr[imageSource].like = false;
                              arr[imageSource].heart = true;
                              arr[imageSource].laugh = false;
                              setImages(arr);
                            }}
                            style={{
                              zIndex: 3,
                              height: responsiveWidth(15),
                              width: responsiveWidth(15),
                              backgroundColor: "white",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: responsiveWidth(15),
                            }}
                          >
                            <Icon
                              name={
                                images[imageSource].heart ? "heart" : "hearto"
                              }
                              type="antdesign"
                              color={textColor.secondary}
                              size={40}
                            />
                          </TouchableOpacity>
                        </View> */}
                      </LinearGradient>
                    </ImageBackground>
                  </TouchableOpacity>
                </GestureRecognizer>
              )}

              {/* {likeflag ? (
                <View style={[styles.emoji, { top: responsiveHeight(30) }]}>
                  <Icon
                    name={"like2"}
                    type="antdesign"
                    size={responsiveFontSize(2)}
                    color={textColor.secondary}
                  />
                </View>
              ) : null} */}
              {/* {heartflag ? (
                <View style={[styles.emoji, { top: responsiveHeight(30) }]}>
                  <Icon
                    name={"hearto"}
                    type="antdesign"
                    size={responsiveFontSize(2)}
                    color={textColor.secondary}
                  />
                </View>
              ) : null}
              {laughflag ? (
                <View style={[styles.emoji, { top: responsiveHeight(30) }]}>
                  <Icon
                    name={"laugh"}
                    type="font-awesome-5"
                    size={responsiveFontSize(2)}
                    color={textColor.secondary}
                  />
                </View>
              ) : null} */}
              <View style={styles.card}>
                <View
                  style={
                    {
                      // paddingBottom: responsiveHeight(3),
                      // paddingLeft: responsiveWidth(5),
                      // backgroundColor:'red',
                      // position: "absolute",
                      // bottom: 5,
                    }
                  }
                >
                  <View style={styles.detailsview2}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={[styles.nametxt, { color: textColor.primary }]}
                      >
                        {`${profile.name} \t`}
                      </Text>
                      <Text
                        style={[
                          styles.nametxt,
                          {
                            fontSize: responsiveFontSize(2.3),
                            fontFamily: fontFamily.appTextMedium,
                            color: textColor.primary,
                          },
                        ]}
                      >
                        {getAge(profile.date_of_birth)}
                      </Text>
                    </View>
                    {isMatched ? (
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                          activeOpacity={1}
                          style={styles.circlecard4}
                          onPress={() => refRBSheet.current.open()}
                        >
                          <Image
                            source={appImages.lips}
                            style={{
                              height: responsiveHeight(7),
                              width: responsiveWidth(9),
                              resizeMode: "contain",
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                  <View
                    style={[
                      styles.detailsview,
                      { marginTop: responsiveHeight(1) },
                    ]}
                  >
                    <Icon
                      type={"ionicon"}
                      name={"briefcase-outline"}
                      color={textColor.secondary}
                      size={responsiveFontSize(2.5)}
                      style={{ marginLeft: responsiveWidth(0.7) }}
                    />
                    <Text
                      style={[
                        styles.nametxt,
                        {
                          marginLeft: responsiveWidth(4.4),
                          fontSize: responsiveFontSize(2),
                          fontFamily: fontFamily.appTextMedium,
                          color: "black",
                          marginTop: 2,
                        },
                      ]}
                    >
                      {profile.occupation}
                    </Text>
                  </View>
                  {profile.hasOwnProperty("city") && (
                    <View
                      style={[
                        styles.detailsview,
                        { marginTop: responsiveHeight(1) },
                      ]}
                    >
                      <Icon
                        type={"ionicon"}
                        name={"home-outline"}
                        color={textColor.secondary}
                        size={responsiveFontSize(3)}
                      />
                      <Text
                        style={[
                          styles.nametxt,
                          {
                            marginLeft: responsiveWidth(4),
                            fontSize: responsiveFontSize(2),
                            fontFamily: fontFamily.appTextMedium,
                            color: "black",
                            marginTop: 2,
                          },
                        ]}
                      >
                        {`${profile.city}, ${profile.country}`}
                      </Text>
                    </View>
                  )}

                  <View
                    style={[
                      styles.detailsview,
                      { marginTop: responsiveHeight(1) },
                    ]}
                  >
                    <Icon
                      type={"ionicon"}
                      name={"location-outline"}
                      color={textColor.secondary}
                      size={responsiveFontSize(3)}
                    />
                    <Text
                      style={[
                        styles.nametxt,
                        {
                          marginLeft: responsiveWidth(4),
                          fontSize: responsiveFontSize(2),
                          fontFamily: fontFamily.appTextMedium,
                          color: "black",
                          marginTop: 2,
                        },
                      ]}
                    >
                      {`${getDistanceFromLatLonInKm(
                        profile.location.latitude,
                        profile.location.longitude,
                        user.location.latitude,
                        user.location.longitude
                      )} miles away`}
                    </Text>
                  </View>
                  {/* <View
                    style={[
                      styles.detailsview,
                      { marginTop: responsiveHeight(1) },
                    ]}
                  >
                    <Icon
                      type={"entypo"}
                      name={"heart"}
                      color={textColor.secondary}
                      size={responsiveFontSize(3)}
                    />
                    <Text
                      style={[
                        styles.nametxt,
                        {
                          marginLeft: responsiveWidth(4),
                          fontSize: responsiveFontSize(2),
                          fontFamily: fontFamily.appTextMedium,
                          color: "black",
                          marginTop: 2,
                        },
                      ]}
                    >
                      {`Interested in ${profile.interest}`}
                    </Text>
                  </View> */}
                </View>
              </View>
              <View style={styles.card}>
                {/* <Text style={styles.biotxt}>Bio</Text> */}
                {/* <Text style={styles.infoheading}>Bio </Text> */}
                <Text style={styles.txt}>{profile.bio}</Text>
              </View>

              {/* <View style={styles.myphotoview}>
          <Text style={styles.myphototxt}>Prompts</Text>
        </View> */}
              <View>
                <FlatList
                  data={dataSource1}
                  renderItem={({ item, index }) => (
                    <View
                      // activeOpacity={0.9}
                      style={[
                        styles.Promptscard,
                        {
                          marginBottom:
                            index === dataSource1.length - 1
                              ? responsiveWidth(6)
                              : 5,
                        },
                      ]}
                    >
                      <View>
                        <Text style={styles.biotxt}>{item.name}</Text>
                        <Text style={styles.txt}>{item.cat}</Text>
                      </View>

                      <View style={styles.baloon}>
                        {/* <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={() => {
                            let arr = [...dataSource1];
                            arr.forEach((element) => {
                              element.baloonFlag = false;
                            });
                            arr[index].baloonFlag = false;
                            arr[index].like = true;
                            arr[index].laugh = false;
                            arr[index].heart = false;
                            setFlag(arr[index]);
                            setDataSource1(arr);
                            setLike("like2");
                          }}
                          style={styles.emojicircle}
                        >
                          <Icon
                            name={item.like ? "like1" : "like2"}
                            type="antdesign"
                            color={textColor.secondary}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={() => {
                            let arr = [...dataSource1];
                            arr.forEach((element) => {
                              element.baloonFlag = false;
                            });
                            arr[index].baloonFlag = false;
                            arr[index].laugh = true;
                            arr[index].like = false;
                            arr[index].heart = false;
                            setFlag(arr[index]);
                            setDataSource1(arr);
                            setLaugh("laughing");
                          }}
                          style={styles.emojicircle}
                        >
                          {!item.laugh ? (
                            <Image
                              source={require("../../../../assets/images/laugh2.png")}
                              style={{
                                width: responsiveHeight(3.3),
                                height: responsiveHeight(3.3),
                                resizeMode: "contain",
                              }}
                            />
                          ) : (
                            <Image
                              source={require("../../../../assets/images/laugh.png")}
                              style={{
                                width: responsiveHeight(3.3),
                                height: responsiveHeight(3.3),
                                resizeMode: "contain",
                              }}
                            />
                          )}
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={() => {
                            let arr = [...dataSource1];
                            arr.forEach((element) => {
                              element.baloonFlag = false;
                            });
                            arr[index].baloonFlag = false;
                            arr[index].heart = true;
                            arr[index].laugh = false;
                            arr[index].like = false;
                            setFlag(arr[index]);
                            setDataSource1(arr);
                            setHeart("hearto");
                          }}
                          style={styles.emojicircle}
                        >
                          <Icon
                            name={item.heart ? "heart" : "hearto"}
                            type="antdesign"
                            color={textColor.secondary}
                          />
                        </TouchableOpacity> */}
                      </View>

                      {/* {item.like ? (
                    <View style={styles.emoji}>
                      <Icon
                        name={"like2"}
                        type="antdesign"
                        size={responsiveFontSize(2.5)}
                        color={textColor.secondary}
                      />
                    </View>
                  ) : null}
                  {item.heart ? (
                    <View style={styles.emoji}>
                      <Icon
                        name={"hearto"}
                        type="antdesign"
                        size={responsiveFontSize(2.5)}
                        color={textColor.secondary}
                      />
                    </View>
                  ) : null}
                  {item.laugh ? (
                    <View style={styles.emoji}>
                      <Icon
                        name={"laughing"}
                        type="fontisto"
                        size={responsiveFontSize(2.5)}
                        color={textColor.secondary}
                      />
                    </View>
                  ) : null} */}
                    </View>
                  )}
                />
              </View>
              {/* <TouchableOpacity
            style={styles.buttons}
            onPress={() => props.navigation.navigate("GiftedChat")}
          >
            <Text style={styles.continuetext}>Message</Text>
          </TouchableOpacity>
          <View style={styles.matchDate}>
            <Text
              style={{ fontFamily: fontFamily.appTextBold, color: "#8c8c8c" }}
            >
              Matched Amy on January 4, 2021
            </Text>
          </View> */}
              <View style={{ height: responsiveHeight(1) }} />
            </ScrollView>
          </LinearGradient>
          {/* </TouchableOpacity> */}

          {/* <View style={styles.footer} /> */}
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={responsiveHeight(isMatched ? 24 : 14)}
            customStyles={{
              wrapper: {
                backgroundColor: "rgba(0,0,0,0.3)",
              },
              container: {
                borderTopRightRadius: responsiveWidth(7),
                borderTopLeftRadius: responsiveWidth(7),
                elevation: 2,
              },
              draggableIcon: {
                backgroundColor: buttonColor.grey,
                width: responsiveWidth(40),
              },
            }}
          >
            <View>
              <TouchableOpacity
                style={styles.rbsheetbtn}
                onPress={() => {
                  reportRB.current.open();
                }}
              >
                <Icon
                  type={"entypo"}
                  name={"flag"}
                  color={"red"}
                  size={responsiveFontSize(4.2)}
                  style={{ bottom: responsiveHeight(1) }}
                />
                <View style={styles.txtView}>
                  <Text
                    style={[
                      styles.rbsheetbtntxt,
                      ,
                      { color: "#8c8c8c", textTransform: "uppercase" },
                    ]}
                  >
                    REPORT {profile.name}
                  </Text>
                </View>
              </TouchableOpacity>
              {isMatched && (
                <TouchableOpacity
                  style={styles.rbsheetbtn}
                  onPress={() => {
                    unMatchRb.current.open();
                  }}
                >
                  <View style={styles.orangeCircle}>
                    <Icon
                      type={"entypo"}
                      name={"cross"}
                      color={"white"}
                      size={responsiveFontSize(3)}
                    />
                  </View>
                  <View style={styles.txtView}>
                    <Text
                      style={[
                        styles.rbsheetbtntxt,
                        ,
                        { color: "#8c8c8c", textTransform: "uppercase" },
                      ]}
                    >
                      UNMATCH {profile.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              <RBSheet
                ref={unMatchRb}
                closeOnDragDown={false}
                closeOnPressMask={true}
                height={responsiveHeight(35)}
                customStyles={{
                  wrapper: {
                    backgroundColor: "rgba(0,0,0,0.3)",
                  },
                  container: {
                    backgroundColor: "rgba(0, 0, 0, 0)",
                  },
                  //   draggableIcon: {
                  //     backgroundColor: "white",
                  //     // width: responsiveWidth(40),
                  //   },
                }}
              >
                <View style={{ flex: 1 }}>
                  <View style={{ flex: 0.4 }} />
                  <View style={styles.subContainer}>
                    <View
                      style={{
                        height: responsiveHeight(13),
                        width: responsiveHeight(13),
                        borderRadius: responsiveHeight(7),

                        alignSelf: "center",
                        zIndex: 1,
                        position: "absolute",
                        top: -responsiveHeight(7),
                      }}
                    >
                      <Image
                        source={appImages.user2}
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: responsiveHeight(7),
                        }}
                      />
                    </View>
                    <View style={styles.textWrapper}>
                      <Text style={styles.unMatchText}>
                        Are you sure you want to unmatch
                      </Text>
                      <Text style={styles.unMatchText}>
                        with {profile.name}?{" "}
                      </Text>
                    </View>

                    <View style={styles.btnGroup}>
                      <TouchableOpacity
                        style={styles.noBtn}
                        onPress={() => {
                          unMatchRb.current.close();
                          refRBSheet.current.close();
                        }}
                      >
                        <Text style={styles.noTxt}>NO</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.yesBtn}
                        onPress={() => {
                          unMatchRb.current.close();
                          refRBSheet.current.close();
                        }}
                      >
                        <Text style={styles.yesTxt}>YES</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </RBSheet>

              <RBSheet
                ref={reportRB}
                closeOnDragDown={false}
                closeOnPressMask={true}
                height={responsiveHeight(35)}
                customStyles={{
                  wrapper: {
                    backgroundColor: "rgba(0,0,0,0.3)",
                  },
                  container: {
                    backgroundColor: "rgba(0, 0, 0, 0)",
                  },
                  //   draggableIcon: {
                  //     backgroundColor: "white",
                  //     // width: responsiveWidth(40),
                  //   },
                }}
              >
                <View style={{ flex: 1 }}>
                  <View style={{ flex: 0.4 }} />
                  <View style={styles.subContainer}>
                    <View
                      style={{
                        height: responsiveHeight(13),
                        width: responsiveHeight(13),
                        borderRadius: responsiveHeight(7),

                        alignSelf: "center",
                        zIndex: 1,
                        position: "absolute",
                        top: -responsiveHeight(7),
                      }}
                    >
                      <Image
                        source={{ uri: profile.user_images[0] }}
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: responsiveHeight(7),
                        }}
                      />
                    </View>
                    <View style={styles.textWrapper}>
                      <Text style={styles.unMatchText}>
                        Are you sure you want to report
                      </Text>
                      <Text style={styles.unMatchText}>
                        with {profile.name}?{" "}
                      </Text>
                    </View>

                    <View style={styles.btnGroup}>
                      <TouchableOpacity
                        style={styles.noBtn}
                        onPress={() => {
                          unMatchRb.current.close();
                          refRBSheet.current.close();
                        }}
                      >
                        <Text style={styles.noTxt}>NO</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.yesBtn}
                        onPress={() => {
                          unMatchRb.current.close();
                          refRBSheet.current.close();
                        }}
                      >
                        <Text style={styles.yesTxt}>YES</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </RBSheet>
            </View>
          </RBSheet>
        </SafeAreaView>
      )}
    </>
  );
};
export default AppScreen;
