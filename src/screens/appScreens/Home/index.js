import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
  // Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import {
  appColor,
  bggradientColor,
  buttonColor,
  textColor,
} from "../../../constants/colors";
import { appImages } from "../../../assets/utility";
import Carousel from "react-native-snap-carousel";
import Loder from "../../../components/loader";
import { Icon } from "react-native-elements";
import Modal from "react-native-modal";
import { styles } from "./style";
import { fontFamily } from "../../../constants/fonts";
import LinearGradient from "react-native-linear-gradient";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Draggable from "react-native-draggable";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import AS_KEYS from "../../../constants/asynckeys";
import { get_profiles, saveMatch } from "./services";
import M_PROPS from "../../../constants/matchingProperties/matchingProperties";
import { getData, saveData } from "../../../Backend/utility";
import COLLECTIONS from "../../../Backend/collecctions";
import Toast from "react-native-simple-toast";
import { getAge } from "../../../global/helpers";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AppScreen = (props) => {
  const [loaderflag, setLoaderFlag] = useState(true);
  const [kFlag] = useState(true);

  const [DiamondFlag] = useState(true);
  const [CrossFlag] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isReverse, setIsReverse] = useState(false);
  const [isReverse1, setIsReverse1] = useState(false);
  const [isReverse2, setIsReverse2] = useState(false);
  const [isReverse3, setIsReverse3] = useState(false);
  const [a, setA] = useState(7);
  const [b, setB] = useState(windowHeight * 0.024);
  const [c, setC] = useState(30);
  const [d, setD] = useState(windowHeight * 0.024);
  const [e, setE] = useState(53);
  const [f, setF] = useState(windowHeight * 0.024);
  const [g, setG] = useState(76);
  const [h, setH] = useState(windowHeight * 0.05);
  const [replyimg, setReplyimg] = useState(true);

  const [imageSource, setSource] = useState(0);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [rangeX1, setRangeX1] = useState([]);
  const [rangeY1, setRangeY1] = useState([]);
  const [rangeX2, setRangeX2] = useState([]);
  const [rangeY2, setRangeY2] = useState([]);
  const [rangeX3, setRangeX3] = useState([]);
  const [rangeY3, setRangeY3] = useState([]);
  const [rangeX4, setRangeX4] = useState([]);
  const [rangeY4, setRangeY4] = useState([]);
  const [counter, setCounter] = useState(0);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [replyModal, setreplyModal] = useState(false);
  const [boostModal, setBoostModal] = useState(false);
  const [boostTimerModal, setBoostTimerModal] = useState(false);
  const [boostOutModal, setBoostOutModal] = useState(false);
  const [ringOutModal, setRingOutModal] = useState(false);
  const [MatchModal, setMatchModal] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [ringCount, setRingCount] = useState(1);
  const [boostCount, setBoostCount] = useState(20);
  const [dataSource, setDataSource] = useState([]);
  const [boosts, setBoosts] = useState(2);
  const [disabled1, setDisabled1] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [disabled3, setDisabled3] = useState(false);
  const [disabled4, setDisabled4] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [activeSlide, setActiveSlide] = useState(1);
  const [checkMatchState, setCheckMatchState] = useState([]);
  const [checkMatchIndex, setCheckMatchIndex] = useState(0);
  const [userId, setUserId] = useState("");
  const [disableReact, setDisableReact] = useState(false);
  const [matches, setMatches] = useState([]);
  const [matchModel, setMatchModel] = useState({
    react: "",
    userId: "",
    userPhoto: { uri: "" },
    personId: "",
    personPhoto: { uri: "" },
    personName: "",
  });

  const [profileIncompleteModalVisible, setProfileIncompleteModalVisible] =
    useState(false);

  let carousel = useRef();

  const [reply, setReply] = useState(
    "Aliquam in bibendum mauris. Sed vitae erat vel velit blandit pharetra vitae nec ante. Cras ut interdum elit. Ut maleada a urnasit amet blandit."
  );
  useEffect(() => {
    let _1 = [];

    for (let i = 100; i <= 300; i++) {
      _1.push(i);
    }
    let __1 = [];
    for (let i = 100; i <= 350; i++) {
      __1.push(i);
    }
    let _2 = [];
    for (let i = 100; i <= 300; i++) {
      _2.push(i);
    }
    let __2 = [];
    for (let i = 100; i <= 500; i++) {
      __2.push(i);
    }
    let _3 = [];
    for (let i = 100; i <= 300; i++) {
      _3.push(i);
    }
    let __3 = [];
    for (let i = 100; i <= 500; i++) {
      __3.push(i);
    }

    setRangeX1(_1);
    setRangeY1(__1);
    setRangeX2(_2);
    setRangeY2(__2);
    setRangeX3(_3);
    setRangeY3(__3);
  }, []);
  const setImagesCurrentSlide = async (current, data) => {
    data.forEach((element, index) => {
      if (current === index) {
        setImages(element.image);
      }
    });
    setLoaderFlag(false);
  };
  const get = async () => {
    setCheckMatchState([]);
    setLoaderFlag(true);
    var userId = await AsyncStorageLib.getItem(AS_KEYS.TOKEN);
    setUserId(userId);
    const data = await get_profiles(userId);

    if (data.length === 0) {
      Toast.show(
        "We’re all out of game boards to show. Try changing your settings to include more profiles.",
        Toast.LONG
      );
    } else {
      setDataSource(data);
      setActiveSlide(1);

      await setImagesCurrentSlide(1, data);
    }
  };
  const checkProfile = async () => {
    var userId = await AsyncStorageLib.getItem(AS_KEYS.TOKEN);

    const prof = await getData(COLLECTIONS.USERS, userId);
    if (prof.user_images) {
      if (prof.user_images.length == 0) {
        setProfileIncompleteModalVisible(true);
      }
    } else {
      setProfileIncompleteModalVisible(true);
    }
    const { Prompts } = await getData(COLLECTIONS.PROMPTS, userId);
    if (Prompts) {
      if (Prompts.length == 0) {
        setProfileIncompleteModalVisible(true);
      }
    } else {
      setProfileIncompleteModalVisible(true);
    }
  };
  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener("focus", () => {
  //     // The screen is focused
  //     // Call any action
  //     get();
  //     reset();
  //     checkProfile();
  //     // alert("focuseed");
  //   });
  //   get();
  //   checkProfile();
  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [props.navigation]);
  useEffect(() => {
    get();
    checkProfile();
  }, []);
  let myView = useRef();

  const shuffleCards = () => {
    let __DataSource = dataSource;
    let found = null;

    // __DataSource.forEach((item, index) => {
    //   if (item.isActive === false) {
    //     found = index;
    //   }
    // });

    // for (let i = 0; i < __DataSource.length; i++) {
    //   if (__DataSource[i].isActive === false && i !== activeSlide) {
    //     found = i;
    //     // alert(found);
    //     break;
    //   }
    // }

    //
    // alert(found)

    // if (found) {
    //   if (found >= __DataSource.length) {
    //     let k = found - __DataSource.length + 1;
    //     while (k--) {
    //       __DataSource.push(undefined);
    //     }
    //   }
    //   __DataSource.splice(found, 0, __DataSource.splice(activeSlide, 1)[0]);
    //   setDataSource(__DataSource);
    // } else {
    //   console.log("show the submit button");
    //   // handled through view now
    //   setShowSubmit(true);
    // }

    //

    // if (found || found === 0) {
    //   // alert(found);
    //   setCurrentSlide(found);
    //   setActiveSlide(found);

    //   // carousel.current.snapToItem(found);
    //   // alert(found);
    // } else {
    //   setShowSubmit(true);
    // }
  };
  const giftSelector = (val) => {
    // alert(val);
    let found = null;
    switch (val) {
      case 1:
        found = appImages.lips;
        break;
      case 2:
        found = appImages.daimondPic;
        break;
      case 3:
        found = appImages.cross;
        break;
      case 4:
        found = appImages.ringIconblue2;
        break;
    }
    // alert(found)

    return found;
  };
  const activateSlide = (current, flag, giftType) => {
    // console.log('>>>>>>>>>', selectedTiles)
    // if (!selectedTiles.includes(current)) {
    let __DataSource = dataSource;
    __DataSource = __DataSource.map((item, index) => {
      if (flag) {
        // alert("inside first flag");
        if (index === current) {
          let arr = selectedTiles;
          arr.push(current);
          setSelectedTiles([...arr]);

          if (giftType === 4) {
            item["isRing"] = true;
            resetDiamond();
            resetlips();
            resetCross();
            setShowSubmit(true);
          }
          item["isActive"] = true;
          item["giftType"] = giftSelector(giftType);
        }
      }

      // if (!flag) {
      //   alert("inside second flag");

      //   item["isActive"] = false;
      //   item["giftType"] = "";
      // }

      return item;
    });

    // console.log(__DataSource);

    setDataSource([...__DataSource]);
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    // console.log({ currentSlide });
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    // console.log({ activeSlide });
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    //

    // else if(current === 1){
    //   setDisabled1(false);

    // }
    // else if(current === 2){

    //   setDisabled2(false);

    // }
    // else if(current === 3){

    //   setDisabled3(false);

    // }
  };

  const [images, setImages] = useState([
    {
      source: appImages.user1,
      title: "Paris",
      width: 806,
      height: 720,
    },
  ]);
  const setSlider = (x, item) => {
    let y = imageSource;
    var src = 0;
    if (x == 0) {
      if (imageSource !== 0) {
        setSource(--y);
        src = y;
      } else {
        setSource(images.length - 1);
        src = images.length - 1;
      }
    } else if (x == 1) {
      if (imageSource !== images.length - 1) {
        setSource(++y);
        src = y;
      } else {
        setSource(0);
        src = 0;
      }
    }
    var array = dataSource;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (element.id == item.id) {
        array[index].source = array[index].image[src].source;
        console.log(
          "🚀 ~ file: index.js ~ line 385 ~ setTimeout ~ imageSource",
          src
        );
        setDataSource(array);

        break;
      }
    }
  };
  const reset = () => {
    //
    setIsReverse(true);
    setIsReverse1(true);
    setIsReverse2(true);
    setIsReverse3(true);
    setDisabled3(false);
    setDisabled4(false);
    setDisabled1(false);
    setDisabled2(false);
    setShow(false);
    setShow1(false);
    setShow2(false);
    setShow3(false);
    setCounter(0);
    setShowSubmit(false);
    setMatchModal(false);
    setSelectedTiles([]);

    //

    //
    let __DataSource = dataSource;
    __DataSource = __DataSource.map((item, index) => {
      item["isActive"] = false;
      item["isRing"] = false;
      return item;
    });

    // console.log(__DataSource, null, 3);

    setDataSource([...__DataSource]);
    setCurrentSlide(1);
    setActiveSlide(1);

    //
  };

  const reset2 = () => {
    //
    setIsReverse(true);
    setIsReverse1(true);
    setIsReverse2(true);
    setIsReverse3(true);
    setDisabled3(false);
    setDisabled4(false);
    setDisabled1(false);
    setDisabled2(false);
    setShow(false);
    setShow1(false);
    setShow2(false);
    setShow3(false);
    setCounter(0);
    setShowSubmit(false);
    setMatchModal(false);
    setSelectedTiles([]);

    carousel.current.snapToItem(1);

    //

    //
    let __DataSource = dataSource;
    __DataSource = __DataSource.map((item, index) => {
      item["isActive"] = false;
      item["isRing"] = false;
      return item;
    });

    // console.log(__DataSource, null, 3);

    setDataSource([...__DataSource]);
    setCurrentSlide(1);
    setActiveSlide(1);

    //
  };

  const resetDiamond = () => {
    //

    setIsReverse1(true);
    setDisabled2(false);
    setShow1(false);
    setCounter(counter - 1);

    //

    //
    let __DataSource = dataSource;
    __DataSource = __DataSource.map((item, index) => {
      if (item.giftType === appImages.daimondPic) {
        item["isActive"] = false;
        item["isRing"] = false;
      }
      return item;
    });

    // console.log(__DataSource, null, 3);

    setDataSource([...__DataSource]);

    //
  };
  const resetlips = () => {
    //

    setIsReverse(true);
    setDisabled1(false);
    setShow(false);
    setCounter(counter - 1);

    //

    //
    let __DataSource = dataSource;
    __DataSource = __DataSource.map((item, index) => {
      if (item.giftType === appImages.lips) {
        item["isActive"] = false;
        item["isRing"] = false;
      }
      return item;
    });

    // console.log(__DataSource, null, 3);

    setDataSource([...__DataSource]);

    //
  };

  const resetCross = () => {
    //

    setIsReverse2(true);
    setDisabled3(false);
    setShow2(false);
    setCounter(counter - 1);

    //

    //
    let __DataSource = dataSource;
    __DataSource = __DataSource.map((item, index) => {
      if (item.giftType === appImages.cross) {
        item["isActive"] = false;
        item["isRing"] = false;
      }
      return item;
    });

    // console.log(__DataSource, null, 3);

    setDataSource([...__DataSource]);

    //
  };

  if (loaderflag) {
    return <Loder />;
  }

  const reactFn = async (mProp) => {
    const personId = dataSource.filter((val, index) => {
      return index === activeSlide;
    })[0].id;
    const state = await saveMatch(
      mProp,
      personId,
      userId,
      checkMatchState,
      matches,
      setMatches
    );
    setCheckMatchState(state);
  };

  const checkMatch = async ({ react, personId }) => {
    const { matches } = await getData(COLLECTIONS.MATCH, personId);

    if (matches) {
      const userMatch = matches.filter((val, index) => {
        return val.personId === userId;
      })[0];

      const user = await getData(COLLECTIONS.USERS, userId);
      const person = await getData(COLLECTIONS.USERS, personId);
      if (userMatch) {
        if (userMatch.personId === userId && react === userMatch.react) {
          var mat = matchModel;
          mat.react =
            react === 1 ? "Dictched" : react === 2 ? "Kissed" : "Hitched";
          mat.userId = userId;
          mat.personId = personId;
          mat.userPhoto = { uri: `${user.user_images[0]}` };
          mat.personPhoto = { uri: `${person.user_images[0]}` };
          mat.personName = person.name;
          setMatchModel(mat);
          setMatchModal(true);
          var matchedProfiles = await getData(
            COLLECTIONS.MATCHED_PROFILES,
            userId
          );

          let found = false;
          if (!matchedProfiles) {
            matchedProfiles = {
              ProfileIds: [],
            };
          } else {
            matchedProfiles.ProfileIds.forEach((element) => {
              found = element == personId;
            });
          }
          if (!found) {
            matchedProfiles.ProfileIds.push(personId);
            await saveData(COLLECTIONS.MATCHED_PROFILES, userId, {
              ProfileIds: matchedProfiles.ProfileIds,
            });
            matchedProfiles.ProfileIds.forEach(async (element) => {
              var temp = await getData(COLLECTIONS.MATCHED_PROFILES, element);
              if (temp) {
                temp.ProfileIds.push(userId);
                await saveData(COLLECTIONS.MATCHED_PROFILES, element, temp);
              } else {
                await saveData(COLLECTIONS.MATCHED_PROFILES, element, {
                  ProfileIds: [userId],
                });
              }
            });
          }
          return true;
        }
        return false;
      }
      return false;
    }

    return false;
  };

  const setBoastVar = async () => {
    const user = await getData(COLLECTIONS.USERS, userId);
    user["boostMe"] = true;
    user["boostDate"] = new Date();

    await saveData(COLLECTIONS.USERS, userId, user);
    // console.log("🚀 ~ file: index.js ~ line 584 ~ setBoastVar ~ user", user);
  };
  const src = (index, item) => {
    return item.source;
  };

  return (
    <LinearGradient
      colors={[bggradientColor.c1, bggradientColor.c2]}
      style={styles.container}
    >
      <StatusBar backgroundColor={bggradientColor.c1} barStyle="dark-content" />
      <View style={styles.topbar}>
        <TouchableOpacity
          style={styles.optionView}
          onPress={() => props.navigation.navigate("Game")}
        >
          <Icon
            type={"ionicon"}
            name={"settings"}
            size={responsiveWidth(5)}
            color={textColor.secondary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.Carousel}>
        <Carousel
          ref={carousel}
          enableSnap={true}
          firstItem={currentSlide}
          // loopClonesPerSide={10}

          // onMomentumScrollEnd={() => {
          //   setTimeout(() => {
          //     setDisableReact(false);
          //   }, 5000);
          // }}
          onTouchStart={() => {
            setDisableReact(true);
          }}
          onTouchEnd={() => {
            setTimeout(() => {
              setDisableReact(false);
            }, 5000);
          }}
          onScrollIndexChanged={(current) => {
            setDisableReact(false);
            // console.log({ item: current });
            // alert()
            setSource(0);
            setActiveSlide(current);
            setImagesCurrentSlide(current, dataSource);
            // setTimeout(() => {
            //   setDisableReact(false);
            // }, 3000);
            // console.log({ activeSlide });
            // setCurrentSlide(current)
          }}
          onSnapToItem={(current) => {
            // setDisableReact(false);
            // // console.log({ item: current });
            // // alert()
            // setSource(0);
            // setActiveSlide(current);
            // setTimeout(() => {
            //   setDisableReact(false);
            // }, 3000);
            // console.log({ activeSlide });
            // setCurrentSlide(current)
          }}
          activeSlideAlignment="center"
          inactiveSlideShift={5}
          keyExtractor={(item, index) => {
            return index;
          }}
          data={dataSource}
          sliderWidth={responsiveWidth(100)}
          itemWidth={responsiveWidth(70)}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              // onPress={() => props.navigation.navigate("OtherProfile")}
              activeOpacity={0.97}
              style={{
                zIndex: 0,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 8,
                height: responsiveHeight(68),
                borderRadius: responsiveWidth(3),
                // backgroundColor: "red",
              }}
            >
              <ImageBackground
                source={src(index, item)}
                style={styles.bg1}
                imageStyle={{ borderRadius: responsiveWidth(3) }}
              >
                <LinearGradient
                  colors={[
                    "rgba(0,0,0,0.8)",
                    "transparent",
                    "transparent",
                    "transparent",
                    "rgba(0,0,0,0.8)",
                    "rgba(0,0,0,0.8)",
                  ]}
                  style={{ borderRadius: 12 }}
                >
                  <View
                    style={[
                      styles.bg1,
                      {
                        backgroundColor: item.isActive
                          ? item.isRing
                            ? "rgba(255, 145, 0,0.50)"
                            : "rgba(155,202,221,0.70)"
                          : "transparent",
                        borderRadius: 10,
                      },
                    ]}
                  >
                    <TouchableOpacity
                      activeOpacity={0.95}
                      onPress={() =>
                        props.navigation.navigate("OtherProfile", item.id)
                      }
                      style={styles.nameview}
                    >
                      {isDragging && (
                        <View style={styles.placeholderView}></View>
                      )}
                      {item.isActive && (
                        <TouchableOpacity
                          style={[
                            styles.circlebtn,
                            {
                              position: "absolute",
                              bottom: responsiveHeight(11),
                              // left: responsiveWidth(21),
                              left: "35%",
                              // alignSelf: "center",
                            },
                          ]}
                        >
                          <Image
                            source={item.giftType}
                            style={{
                              width: responsiveWidth(10),
                              height: responsiveWidth(10),
                              resizeMode: "contain",
                            }}
                          />
                        </TouchableOpacity>
                      )}
                      <Text style={styles.name}>{item.name}</Text>
                      <Text
                        style={[
                          styles.age,
                          {
                            marginLeft: responsiveWidth(2),
                            alignSelf: "center",
                          },
                        ]}
                      >
                        {item.age}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.95}
                      onPress={() =>
                        props.navigation.navigate("OtherProfile", item.id)
                      }
                    >
                      <View
                        style={[
                          styles.detailsview,
                          { marginTop: responsiveHeight(1) },
                        ]}
                      >
                        <Icon
                          type={"ionicon"}
                          name={"briefcase-outline"}
                          solid={false}
                          color={textColor.secondary}
                          size={responsiveFontSize(2.5)}
                          style={{ marginLeft: responsiveWidth(0.7) }}
                        />
                        <Text
                          style={[
                            styles.nametxt,
                            {
                              marginLeft: responsiveWidth(4),
                              fontSize: responsiveFontSize(2),
                              fontFamily: fontFamily.appTextMedium,
                              color: "white",
                              marginTop: 2,
                            },
                          ]}
                        >
                          {item.occupation}
                        </Text>
                      </View>
                      {/* <View
                        style={[
                          styles.detailsview,
                          { marginTop: responsiveHeight(1) },
                        ]}
                      >
                        <Icon
                          type={"font-awesome"}
                          name={"home"}
                          color={textColor.secondary}
                          size={responsiveFontSize(3)}
                        />
                        <Text
                          style={[
                            styles.nametxt,
                            {
                              marginLeft: responsiveWidth(4.4),
                              fontSize: responsiveFontSize(2),
                              fontFamily: fontFamily.appTextMedium,
                              color: "white",
                              marginTop: 2,
                            },
                          ]}
                        >
                          {item.location}
                        </Text>
                      </View> */}
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
                              color: "white",
                              marginTop: 2,
                            },
                          ]}
                        >
                          {item.distance}
                        </Text>
                      </View>
                      <View style={{ height: responsiveHeight(2) }} />
                      {/* <View
                        style={[
                          styles.detailsview,
                          {
                            marginTop: responsiveHeight(1),
                            marginBottom: responsiveHeight(2),
                          },
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
                              color: "white",
                              marginTop: 2,
                            },
                          ]}
                        >
                          {`Interested in ${item.interest}`}
                        </Text>
                      </View> */}
                    </TouchableOpacity>
                    <View style={styles.cardHeader}>
                      {activeSlide === index ? (
                        <View
                          style={{
                            flexDirection: "row",
                            marginBottom: responsiveHeight(2),
                            width: "100%",
                          }}
                        >
                          {images.map((data, index) => {
                            return (
                              <View
                                style={{
                                  height: 3,
                                  width: responsiveWidth(60) / images.length,
                                  backgroundColor:
                                    index === imageSource
                                      ? "white"
                                      : "rgba(0,0,0,0.2)",
                                }}
                              />
                            );
                          })}
                        </View>
                      ) : (
                        <View
                          style={{
                            height: 3,
                            marginBottom: responsiveHeight(2),
                          }}
                        />
                      )}
                      <Text
                        style={[
                          styles.txt,
                          {
                            fontSize: responsiveFontSize(2),
                            textTransform: "uppercase",
                            color: "#abccdd",
                            bottom: responsiveHeight(1),
                          },
                        ]}
                      >
                        {item.txt}
                      </Text>
                      <Text
                        style={[
                          styles.txt,
                          {
                            // textTransform: 'uppercase',
                            color: textColor.white,
                            fontSize: responsiveFontSize(2.3),
                            bottom: responsiveHeight(1),
                          },
                        ]}
                      >
                        {item.Movie}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[styles.circlecard2]}
                    onPress={() => setSlider(0, item)}
                    // onPress={()=>alert('helooo')}
                    activeOpacity={1}
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
                    onPress={() => setSlider(1, item)}
                    activeOpacity={1}
                  >
                    <Icon
                      name={"chevron-forward"}
                      type={"ionicon"}
                      color={"transparent"}
                      size={responsiveFontSize(5.5)}
                    />
                  </TouchableOpacity>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </View>

      {showSubmit ? (
        <View
          style={{
            position: "absolute",
            top:
              Platform.OS === "android"
                ? responsiveHeight(77.5)
                : responsiveHeight(80.5),
            // left: responsiveWidth(5),
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <View
            style={{
              height: responsiveHeight(5),
              width: responsiveWidth(6),
            }}
          />
          <TouchableOpacity
            style={[styles.yesBtn, { width: responsiveWidth(65) }]}
            onPress={async () => {
              await saveData(COLLECTIONS.MATCH, userId, { matches: matches });
              setMatches([]);
              checkMatch(checkMatchState[0]).then((chk) => {
                if (!chk) {
                  Toast.show("No Profile Matched", Toast.SHORT);
                  reset2();
                }
              });
            }}
          >
            <Text style={styles.yesTxt}>SUBMIT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              reset2();
            }}
            style={[styles.samllcircle, { alignSelf: "center" }]}
          >
            <Image
              source={appImages.back}
              style={{
                height: responsiveHeight(5),
                width: responsiveWidth(5),
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.btnview}>
            <TouchableOpacity
              // onPress={() => setBoostTimerModal(!boostTimerModal)}
              onPress={() => {
                setBoostModal(!boostModal);
              }}
              style={styles.boostButton}
            >
              <Image source={appImages.energy} style={styles.ringbtnimage} />
              {/* <Image source={appImages.lightflash} style={styles.ringbtnimage} /> */}
              {/* <Text style={styles.ringbtntxt}>{boostCount}</Text> */}
            </TouchableOpacity>
            {show ? (
              <TouchableOpacity
                onPress={() => {
                  resetlips();
                }}
                style={[
                  styles.circlebtn2,
                  {
                    position: "absolute",
                    left: responsiveWidth(7),
                    backgroundColor: "rgba(238, 238, 238,0.5)",
                  },
                ]}
              >
                <Image
                  source={appImages.back}
                  style={{
                    height: responsiveHeight(5),
                    width: responsiveWidth(5),
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            ) : (
              <Draggable
                onDrag={(event, gs) => setIsDragging(true)}
                shouldReverse={isReverse}
                // onRelease={() => setIsDragging(!isDragging)}
                x={responsiveWidth(a)}
                y={b}
                onDragRelease={(event, gestureState, bounds) => {
                  setIsDragging(false);
                  reactFn(M_PROPS.KISS);

                  if (
                    rangeX1.includes(Math.floor(event.nativeEvent.pageX)) &&
                    rangeY1.includes(Math.floor(event.nativeEvent.pageY))
                  ) {
                    if (
                      selectedTiles.includes(activeSlide) &&
                      show1 &&
                      dataSource[activeSlide].giftType === appImages.daimondPic
                    ) {
                      setShow1(false);
                      activateSlide(activeSlide, true, 1);
                      setDisabled2(true);
                      setIsReverse1(true);
                      setShow(true);
                    } else if (
                      selectedTiles.includes(activeSlide) &&
                      show2 &&
                      dataSource[activeSlide].giftType === appImages.cross
                    ) {
                      setShow2(false);
                      activateSlide(activeSlide, true, 1);
                      setDisabled3(true);
                      setIsReverse2(true);
                      setShow(true);
                    } else {
                      // console.log("matched");
                      // setIsReverse(false);
                      setDisabled1(true);
                      shuffleCards();
                      activateSlide(activeSlide, true, 1);
                      let count = counter + 1;
                      setCounter(count);

                      if (count >= 3) {
                        setShowSubmit(true);
                      }
                      setShow(true);
                    }
                  } else {
                    // setA(responsiveWidth(-2));
                    // setB(responsiveHeight(1));
                    // console.log("okay");
                    // setShow(false);
                    // activateSlide(activeSlide, false, 1);
                    setIsReverse(true);
                  }
                }}
              >
                <TouchableOpacity
                  style={styles.circlebtn}
                  disabled={disableReact}
                  onPress={() => {
                    reactFn(M_PROPS.KISS);
                    if (
                      selectedTiles.includes(activeSlide) &&
                      show1 &&
                      dataSource[activeSlide].giftType === appImages.daimondPic
                    ) {
                      setShow1(false);
                      activateSlide(activeSlide, true, 1);
                      setDisabled2(true);
                      setIsReverse1(true);
                      setShow(true);
                    } else if (
                      selectedTiles.includes(activeSlide) &&
                      show2 &&
                      dataSource[activeSlide].giftType === appImages.cross
                    ) {
                      setShow2(false);
                      activateSlide(activeSlide, true, 1);
                      setDisabled3(true);
                      setIsReverse2(true);
                      setShow(true);
                    } else {
                      activateSlide(activeSlide, true, 1), setDisabled1(true);
                      setIsReverse(true);
                      setShow(true);
                      let count = counter + 1;
                      setCounter(count);

                      if (count >= 3) {
                        setShowSubmit(true);
                      }
                    }
                  }}
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
              </Draggable>
            )}

            {show1 ? (
              <TouchableOpacity
                onPress={() => {
                  resetDiamond();
                }}
                style={[
                  styles.circlebtn2,
                  {
                    position: "absolute",
                    left: responsiveWidth(30),
                    backgroundColor: "rgba(238, 238, 238,0.5)",
                  },
                ]}
              >
                <Image
                  source={appImages.back}
                  style={{
                    height: responsiveHeight(5),
                    width: responsiveWidth(5),
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            ) : (
              <Draggable
                onDrag={(event, gs) => setIsDragging(true)}
                x={responsiveWidth(c)}
                y={d}
                shouldReverse={isReverse1}
                onDragRelease={(event, gestureState, bounds) => {
                  setIsDragging(false);
                  reactFn(M_PROPS.Hitch);

                  if (
                    rangeX2.includes(Math.floor(event.nativeEvent.pageX)) &&
                    rangeY2.includes(Math.floor(event.nativeEvent.pageY))
                  ) {
                    console.log("matched");

                    if (
                      selectedTiles.includes(activeSlide) &&
                      show &&
                      dataSource[activeSlide].giftType === appImages.lips
                    ) {
                      setShow(false);
                      activateSlide(activeSlide, true, 2);
                      setDisabled1(true);
                      setIsReverse(true);
                      setShow1(true);
                    } else if (
                      selectedTiles.includes(activeSlide) &&
                      show2 &&
                      dataSource[activeSlide].giftType === appImages.cross
                    ) {
                      setShow2(false);
                      activateSlide(activeSlide, true, 2);
                      setDisabled3(true);
                      setIsReverse2(true);
                      setShow1(true);
                    } else {
                      activateSlide(activeSlide, true, 2);
                      setDisabled2(true);
                      shuffleCards();
                      setShow1(true);

                      let count = counter + 1;
                      setCounter(count);

                      if (count >= 3) {
                        setShowSubmit(true);
                      }
                      // setIsReverse1(false);
                    }
                  } else {
                    // setC(responsiveWidth(27));
                    // setD(responsiveHeight(1));
                    // console.log("okay");
                    // activateSlide(activeSlide, false);

                    setIsReverse1(true);
                  }
                }}
              >
                <TouchableOpacity
                  style={styles.circlebtn}
                  disabled={disableReact}
                  onPress={() => {
                    reactFn(M_PROPS.Hitch);

                    if (
                      selectedTiles.includes(activeSlide) &&
                      show &&
                      dataSource[activeSlide].giftType === appImages.lips
                    ) {
                      setShow(false);
                      activateSlide(activeSlide, true, 2);
                      setDisabled1(true);
                      setIsReverse(true);
                      setShow1(true);
                    } else if (
                      selectedTiles.includes(activeSlide) &&
                      show2 &&
                      dataSource[activeSlide].giftType === appImages.cross
                    ) {
                      setShow2(false);
                      activateSlide(activeSlide, true, 2);
                      setDisabled3(true);
                      setIsReverse2(true);
                      setShow1(true);
                    } else {
                      activateSlide(activeSlide, true, 2);
                      setDisabled2(true);
                      shuffleCards();
                      setShow1(true);
                      let count = counter + 1;
                      setCounter(count);

                      if (count >= 3) {
                        setShowSubmit(true);
                      }
                    }
                  }}
                >
                  <Image
                    source={appImages.daimondPic}
                    style={{
                      height: responsiveHeight(7),
                      width: responsiveWidth(9),
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
              </Draggable>
            )}

            {show2 ? (
              <TouchableOpacity
                onPress={() => {
                  resetCross();
                }}
                style={[
                  styles.circlebtn2,
                  {
                    position: "absolute",
                    left: responsiveWidth(53),
                    backgroundColor: "rgba(238, 238, 238,0.5)",
                  },
                ]}
              >
                <Image
                  source={appImages.back}
                  style={{
                    height: responsiveHeight(5),
                    width: responsiveWidth(5),
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            ) : (
              <Draggable
                onDrag={(event, gs) => setIsDragging(true)}
                x={responsiveWidth(e)}
                y={f}
                shouldReverse={isReverse2}
                onDragRelease={(event, gestureState, bounds) => {
                  setIsDragging(false);

                  if (
                    rangeX3.includes(Math.floor(event.nativeEvent.pageX)) &&
                    rangeY3.includes(Math.floor(event.nativeEvent.pageY))
                  ) {
                    // console.log("matched");
                    if (
                      selectedTiles.includes(activeSlide) &&
                      show &&
                      dataSource[activeSlide].giftType === appImages.lips
                    ) {
                      setShow(false);
                      activateSlide(activeSlide, true, 3);
                      setDisabled2(true);
                      setIsReverse(true);
                      setShow2(true);
                    } else if (
                      selectedTiles.includes(activeSlide) &&
                      show1 &&
                      dataSource[activeSlide].giftType === appImages.daimondPic
                    ) {
                      setShow1(false);
                      activateSlide(activeSlide, true, 3);
                      setDisabled3(true);
                      setIsReverse2(true);
                      setShow2(true);
                    } else {
                      activateSlide(activeSlide, true, 3);
                      setDisabled3(true);
                      shuffleCards();

                      setShow2(true);
                      let count = counter + 1;
                      setCounter(count);

                      if (count >= 3) {
                        setShowSubmit(true);
                      }
                      // setIsReverse2(false);
                    }
                  } else {
                    // setE(responsiveWidth(54));
                    // setF(responsiveHeight(1));
                    // console.log("okay");
                    // activateSlide(activeSlide, false);

                    setIsReverse2(true);
                  }
                }}
              >
                <TouchableOpacity
                  style={styles.circlebtn}
                  disabled={disableReact}
                  onPress={() => {
                    if (
                      selectedTiles.includes(activeSlide) &&
                      show &&
                      dataSource[activeSlide].giftType === appImages.lips
                    ) {
                      setShow(false);
                      activateSlide(activeSlide, true, 3);
                      setDisabled2(true);
                      setIsReverse(true);
                      setShow2(true);
                    } else if (
                      selectedTiles.includes(activeSlide) &&
                      show1 &&
                      dataSource[activeSlide].giftType === appImages.daimondPic
                    ) {
                      setShow1(false);
                      activateSlide(activeSlide, true, 3);
                      setDisabled3(true);
                      setIsReverse2(true);
                      setShow2(true);
                    } else {
                      activateSlide(activeSlide, true, 3);
                      setDisabled3(true);
                      shuffleCards();

                      setShow2(true);
                      let count = counter + 1;
                      setCounter(count);

                      if (count >= 3) {
                        setShowSubmit(true);
                      }
                    }
                  }}
                >
                  <Image
                    source={appImages.cross}
                    style={{
                      height: responsiveHeight(7),
                      width: responsiveWidth(7),
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
              </Draggable>
            )}

            {show3 ? (
              <TouchableOpacity
                style={[
                  styles.samllcircle432,
                  {
                    position: "absolute",
                    left: responsiveWidth(30),
                    backgroundColor: "rgba(238, 238, 238,0.5)",
                  },
                ]}
              ></TouchableOpacity>
            ) : (
              <Draggable
                x={responsiveWidth(g)}
                y={h}
                //
                // onShortPressRelease={() => alert("dragged")}
                // onPressIn={() => alert("dragged")}
                // onPressOut={() => alert("dragged")}
                disabled={ringCount === 0 ? true : disabled4}
                shouldReverse={isReverse3}
                // onRelease={() => setIsDragging(!isDragging)}
                onDrag={(event, gs) => setIsDragging(true)}
                onDragRelease={(event, gestureState, bounds) => {
                  setIsDragging(false);

                  if (
                    rangeX1.includes(Math.floor(event.nativeEvent.pageX)) &&
                    rangeY1.includes(Math.floor(event.nativeEvent.pageY))
                  ) {
                    // console.log("matched");
                    // setIsReverse(false);
                    let count = counter + 1;
                    setCounter(count);

                    if (count >= 3) {
                      setShowSubmit(true);
                    }
                    setDisabled4(true);
                    // reset2();
                    activateSlide(activeSlide, true, 4);
                    // setShow3(true);
                  } else {
                    // setA(responsiveWidth(-2));
                    // setB(responsiveHeight(1));
                    // console.log("okay");
                    // setShow(false);
                    // activateSlide(activeSlide, false, 1);
                    // setIsReverse(true);
                  }
                }}

                //
              >
                <TouchableOpacity
                  style={styles.samllcircle432}
                  // onPress={() => setRingOutModal(!ringOutModal)}
                  onPress={() => {
                    let count = counter + 1;
                    setCounter(count);

                    if (count >= 3) {
                      setShowSubmit(true);
                    }
                    setDisabled4(true);
                    // reset2();
                    activateSlide(activeSlide, true, 4);
                  }}
                >
                  <Image
                    source={appImages.ringIconblue2}
                    style={{
                      height: responsiveWidth(5),
                      width: responsiveWidth(5),
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
              </Draggable>
            )}
          </View>
          {/* <View
            style={[
              styles.btnview,
              {
                width: responsiveWidth(40),
                position: "absolute",

                top:
                  Platform.OS === "android"
                    ? responsiveHeight(79)
                    : responsiveHeight(82),
              },
            ]}
          > */}
          {/* <TouchableOpacity
              style={styles.samllcircle}
              onPress={() => {
                reset2();
              }}
            >
              <Image
                source={appImages.back}
                style={{
                  height: responsiveHeight(5),
                  width: responsiveWidth(5),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity> */}

          {/* </View> */}
        </>
      )}

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
            <Image
              style={{
                height: responsiveHeight(10),
                width: responsiveHeight(10),
                resizeMode: "contain",
              }}
              source={require("../../../assets/images/BoltWhite.png")}
            />
          </View>
          <Text
            style={[
              styles.boostTxt,
              // {backgroundColor:'green'}
            ]}
          >
            {boostCount < 1
              ? "Oops! \nYou are all out of Boosts"
              : " Boost will cut you to the front of the line and show you on more boards for 30 minutes."}
          </Text>
          <View
            style={[
              styles.btnGroup,
              // {backgroundColor:'red'}
            ]}
          >
            {boostCount > 1 ? (
              <TouchableOpacity
                style={[
                  styles.yesBtn,
                  {
                    height: responsiveHeight(7),
                  },
                ]}
                onPress={() => {
                  setBoostModal(!boostModal);
                  setBoastVar();
                }}
              >
                <Text
                  style={[styles.yesTxt, { fontSize: responsiveFontSize(2.6) }]}
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
                  style={[styles.yesTxt, { fontSize: responsiveFontSize(2.6) }]}
                >
                  GET MORE
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.noBtn]}
              onPress={() => setBoostModal(!boostModal)}
            >
              <Text style={styles.noTxt}>NEVERMIND</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        {/* </View> */}
      </Modal>
      {/* 
      <Modal transparent animationType="fade" visible={boostOutModal}>
        <View style={styles.Modalbg}>
          <ImageBackground
            style={styles.Modalbg2}
            source={appImages.modalBg2}
            resizeMode={"contain"}
          >
            <Text style={styles.boostTxt}>
              Oops! You are all out of Boosts.
            </Text>
            <View style={[styles.btnGroup]}>
              <TouchableOpacity
                style={[
                  styles.yesBtn,
                  {
                    marginTop: responsiveHeight(4),
                    height: responsiveHeight(7),
                  },
                ]}
                onPress={() => setBoostOutModal(!boostOutModal)}
              >
                <Text
                  style={[styles.yesTxt, { fontSize: responsiveFontSize(2.7) }]}
                >
                  GET MORE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.noBtn, { marginTop: responsiveHeight(3) }]}
                onPress={() => setBoostOutModal(!boostOutModal)}
              >
                <Text style={styles.noTxt}>CLOSE</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </Modal> */}

      <Modal
        animationIn="bounceInDown"
        animationOut="slideOutDown"
        animationInTiming={1500}
        animationOutTiming={1500}
        backdropTransitionOutTiming={0}
        hasBackdrop={true}
        backdropColor={"black"}
        backdropOpacity={0.85}
        isVisible={ringOutModal}
      >
        <ImageBackground style={styles.Modalbg2} source={appImages.modalBg}>
          <View
            style={{
              height: responsiveHeight(19),
              width: responsiveHeight(19),
              borderRadius: responsiveHeight(20),
              borderWidth: 8,
              borderColor: "white",
              alignItems: "center",
              justifyContent: "center",
              bottom: responsiveHeight(5),
            }}
          >
            <Image
              style={{
                height: responsiveHeight(12),
                width: responsiveHeight(12),
                resizeMode: "contain",
              }}
              source={require("../../../assets/images/keeboWhite.png")}
            />
          </View>
          <Text style={[styles.boostTxt, { bottom: responsiveHeight(1.5) }]}>
            {"Oops!\n You are all out of Soulmates."}
          </Text>
          <View style={[styles.btnGroup]}>
            <TouchableOpacity
              style={[styles.yesBtn, { height: responsiveHeight(7) }]}
              onPress={() => setRingOutModal(!ringOutModal)}
            >
              <Text
                style={[styles.yesTxt, { fontSize: responsiveFontSize(2.6) }]}
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
        </ImageBackground>
      </Modal>
      <Modal
        animationIn="bounceInDown"
        animationOut="slideOutDown"
        animationInTiming={1500}
        animationOutTiming={500}
        backdropTransitionOutTiming={0}
        hasBackdrop={true}
        backdropColor={"black"}
        backdropOpacity={0.85}
        isVisible={MatchModal}
      >
        <ImageBackground style={styles.Modalbg7} source={appImages.modalBg4}>
          <View style={[styles.samllcircle, styles.contdBtn, { zIndex: 1 }]}>
            <Image
              source={
                matchModel.react === "Kissed"
                  ? appImages.lips
                  : matchModel.react === "Ditched"
                  ? appImages.cross
                  : appImages.daimondPic
              }
              style={{
                height: responsiveHeight(7),
                width: responsiveWidth(9),
                resizeMode: "contain",
              }}
            />
          </View>

          <Text
            style={{
              fontFamily: fontFamily.appTextBoldItalic,
              fontSize: responsiveFontSize(6.5),
              color: textColor.white,
              marginTop: responsiveHeight(9),
            }}
          >
            It's a Match!
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.appTextRegular,
              fontSize: responsiveFontSize(2.7),
              color: textColor.white,

              marginBottom: responsiveHeight(2),
            }}
          >
            You and {matchModel.personName} {matchModel.react}
          </Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image source={matchModel.userPhoto} style={styles.iconImage} />
            <Image source={matchModel.personPhoto} style={styles.iconImage} />
          </View>

          <View style={styles.iconSet}>
            <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={() => {
                reset2();
                props.navigation.navigate("OtherProfile", matchModel.userId);
              }}
              activeOpacity={0.9}
            >
              <View
                style={[
                  styles.samllcircle,
                  {
                    height: responsiveWidth(20),
                    width: responsiveWidth(20),
                    borderRadius: responsiveWidth(10),
                  },
                ]}
              >
                <Image
                  source={appImages.personblueIcon}
                  style={{
                    height: responsiveWidth(10),
                    width: responsiveWidth(10),
                  }}
                />
              </View>
              <Text style={styles.iconText}>View Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center" }}
              disabled
              onPress={() => {
                reset2();

                // props.navigation.navigate("Chat");
                setMatchModal(false);
                setTimeout(() => {
                  setreplyModal(!replyModal);
                }, 800);
              }}
              activeOpacity={0.9}
            >
              <View
                style={[
                  styles.samllcircle,
                  {
                    height: responsiveWidth(20),
                    width: responsiveWidth(20),
                    borderRadius: responsiveWidth(10),
                  },
                ]}
              >
                <Image
                  source={appImages.chatblueIcon}
                  style={{
                    width: responsiveWidth(10),
                    height: responsiveWidth(10),
                  }}
                />
              </View>
              <Text style={styles.iconText}>Quick Reply</Text>
            </TouchableOpacity>
          </View>

          {/* <Text style={styles.boostTxt}>
            Oops! You are all out of Soulmates.
          </Text> */}
          <TouchableOpacity
            style={[
              styles.yesBtn,
              {
                width: responsiveWidth(65),
                marginTop: responsiveHeight(5),
                height: responsiveHeight(7),
              },
            ]}
            onPress={() => {
              reset2();
              // setIsReverse(true);
              // setIsReverse1(true);
              // setIsReverse2(true);
              // setIsReverse3(true);
              // setDisabled3(false);
              // setDisabled4(false);
              // setDisabled1(false);
              // setDisabled2(false);
              // setShow(false);
              // setShow1(false);
              // setShow2(false);
              // setShow3(false);
              // setCounter(0);
              // setShowSubmit(false);
              var state = checkMatchState;
              state.splice(checkMatchIndex, 1);
              setCheckMatchState(state);
              setMatchModal(!MatchModal);
              if (state) checkMatch(state[0]);
              // let __DataSource = dataSource;
              // __DataSource = __DataSource.map((item, index) => {
              //   item["isActive"] = false;
              //   return item;
              // });

              // // console.log(__DataSource, null, 3);

              // setDataSource([...__DataSource]);
            }}
          >
            <Text style={styles.yesTxt}>CONTINUE PLAYING</Text>
          </TouchableOpacity>
        </ImageBackground>
      </Modal>
      <Modal
        animationIn="bounceInDown"
        animationOut="slideOutDown"
        animationInTiming={1500}
        backdropTransitionOutTiming={0}
        animationOutTiming={1500}
        hasBackdrop={true}
        backdropColor={"black"}
        backdropOpacity={0.85}
        isVisible={boostTimerModal}
      >
        <ImageBackground style={styles.Modalbg2} source={appImages.modalBg3}>
          <Text style={styles.boostTimerTxt}>00:42:13</Text>
          <Text style={styles.boostTxt3}>
            You are being shown on more game boards! The more you play, the more
            boards you show up on.
          </Text>
          <TouchableOpacity
            style={[styles.yesBtn1, { marginTop: responsiveHeight(2) }]}
            onPress={() => {
              setBoostTimerModal(!boostTimerModal);
            }}
          >
            <Text style={styles.yesTxt}>OKAY</Text>
          </TouchableOpacity>
        </ImageBackground>
      </Modal>
      <Modal
        animationIn="bounceInDown"
        animationOut="slideOutDown"
        animationInTiming={1500}
        animationOutTiming={1500}
        backdropTransitionOutTiming={0}
        hasBackdrop={true}
        //  hideModalContentWhileAnimating={true}
        backdropColor={"black"}
        backdropOpacity={0.85}
        isVisible={boostOutModal}
      >
        <ImageBackground style={styles.Modalbg2} source={appImages.modalBg}>
          <View
            style={{
              height: responsiveHeight(19),
              width: responsiveHeight(19),
              borderRadius: responsiveHeight(20),
              borderWidth: 8,
              borderColor: "white",
              alignItems: "center",
              justifyContent: "center",
              bottom: responsiveHeight(5),
            }}
          >
            <Image
              style={{
                height: responsiveWidth(20),
                width: responsiveWidth(20),
                resizeMode: "contain",
              }}
              source={require("../../../assets/images/BoltWhite.png")}
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
                  style={[styles.yesTxt, { fontSize: responsiveFontSize(2.6) }]}
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
                  style={[styles.yesTxt, { fontSize: responsiveFontSize(2.6) }]}
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

      <Modal
        animationIn="zoomIn"
        animationOut="slideOutDown"
        animationInTiming={1200}
        animationOutTiming={1500}
        backdropTransitionOutTiming={0}
        hasBackdrop={true}
        backdropColor={"black"}
        backdropOpacity={0.85}
        isVisible={replyModal}
      >
        <View
          style={{
            backgroundColor: "#EEE",
            width: responsiveWidth(85),
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            borderRadius: responsiveWidth(5),
            // height: "40%",
            alignSelf: "center",
            // height: responsiveHeight(60),
            top: replyimg
              ? Platform.OS === "android"
                ? responsiveHeight(0)
                : responsiveHeight(1)
              : Platform.OS === "android"
              ? responsiveHeight(0)
              : responsiveHeight(-10),
          }}
        >
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              bottom: responsiveHeight(47),
              marginBottom: responsiveHeight(2),
              top: responsiveHeight(-15),
            }}
          >
            <Image
              source={appImages.user1}
              // resizeMode='contain'
              style={{
                height: replyimg ? responsiveWidth(55) : responsiveWidth(28),
                width: replyimg ? responsiveWidth(55) : responsiveWidth(28),
                borderRadius: replyimg
                  ? responsiveWidth(55 / 2)
                  : responsiveWidth(28 / 2),
                marginTop: replyimg ? null : responsiveHeight(10),
                borderWidth: responsiveWidth(0.75),
                borderColor: "white",
              }}
            />
          </View>

          <Text
            style={{
              fontFamily: fontFamily.appTextBold,
              fontSize: responsiveFontSize(3.5),
              textAlign: "center",

              marginTop: replyimg ? responsiveHeight(17) : responsiveHeight(11),
            }}
          >
            Madeline Ford
          </Text>
          <View
            style={{
              width: responsiveWidth(70),
              alignSelf: "center",
              backgroundColor: textColor.white,
              paddingHorizontal: responsiveWidth(5),
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              marginTop: responsiveHeight(3),
              elevation: 5,
              borderRadius: responsiveWidth(5),
            }}
          >
            <TextInput
              placeholder={
                "Aliquam in bibendum mauris. Sed vitae erat vel velit blandit pharetra"
              }
              // numberOfLines={4}
              onChangeText={(reply) => setReply(reply)}
              style={{
                textAlignVertical: "top",
                width: responsiveWidth(60),
                height: responsiveHeight(8),
              }}
              returnKeyType={"done"}
              onFocus={() => setReplyimg(false)}
              onBlur={() => setReplyimg(true)}
              multiline={true}
              // returnKeyLabel={'Send'}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.yesBtn,
              {
                width: responsiveWidth(60),
                alignSelf: "center",
                marginTop: responsiveHeight(3),
                // marginBottom: responsiveHeight(1),
              },
            ]}
            onPress={() => {
              setReplyimg(true);
              setreplyModal(!replyModal);
            }}
          >
            <Text
              style={[
                styles.yesTxt,
                {
                  fontFamily: fontFamily.appTextBold,
                  fontSize: responsiveFontSize(2),
                },
              ]}
            >
              SEND
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.noBtn, { marginBottom: responsiveHeight(0) }]}
            onPress={() => {
              setReplyimg(true);
              setreplyModal(!replyModal);
            }}
          >
            <Text style={styles.noTxt}>NEVERMIND</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationIn="zoomIn"
        animationOut="slideOutDown"
        animationInTiming={1200}
        animationOutTiming={1500}
        backdropTransitionOutTiming={0}
        hasBackdrop={true}
        backdropColor={"black"}
        backdropOpacity={0.85}
        isVisible={profileIncompleteModalVisible}
      >
        <View
          style={{
            height: responsiveHeight(27),
            width: responsiveWidth(90),
            backgroundColor: "white",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontFamily: fontFamily.appTextBold,
              fontSize: responsiveFontSize(3.5),
              textAlign: "center",
              paddingTop: 20,
              color: textColor.red,
            }}
          >
            Warning !
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.appTextBold,
              fontSize: responsiveFontSize(2),
              textAlign: "center",
              paddingTop: 20,
              color: textColor.primary,
            }}
          >
            You need at least 1 photo and 1 prompt to play Keebo.
          </Text>
          <TouchableOpacity
            style={[
              styles.yesBtn,
              {
                width: responsiveWidth(60),
                alignSelf: "center",
                marginTop: responsiveHeight(3),
                // marginBottom: responsiveHeight(1),
              },
            ]}
            onPress={() => {
              setProfileIncompleteModalVisible(false);
              props.navigation.navigate("Profile");
            }}
          >
            <Text
              style={[
                styles.yesTxt,
                {
                  fontFamily: fontFamily.appTextBold,
                  fontSize: responsiveFontSize(2),
                },
              ]}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </LinearGradient>
  );
};
export default AppScreen;
