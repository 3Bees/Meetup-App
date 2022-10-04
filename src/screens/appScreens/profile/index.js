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
} from "react-native";
import {
  appColor,
  cardColor,
  iconColor,
  buttonColor,
  textColor,
  bggradientColor,
} from "../../../constants/colors";
import { appImages } from "../../../assets/utility";
import { styles } from "./style";
import ImageView from "react-native-image-view";
import RNPickerSelect from "react-native-picker-select";
import { DateSelect, TimeSelect } from "../../../components/dateTimePicker";

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import RBSheet from "react-native-raw-bottom-sheet";
import { Icon } from "react-native-elements";
import { TextInput } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { fontFamily } from "../../../constants/fonts";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import AS_KEYS from "../../../constants/asynckeys";
import COLLECTIONS from "../../../Backend/collecctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData, saveData } from "../../../Backend/utility";
import { getAge } from "../../../global/helpers";
import moment from "moment";
import Loder from "../../../components/loader";

const AppScreen = (props) => {
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const [bioCount, setBioCount] = useState(0);
  const [DOB, setDOB] = useState("Jan 3,2021");
  const [bio, setBio] = useState("");
  const [user, setUser] = useState({});
  const [interest, setInterest] = useState("");
  const [bioEditable, setBioEditable] = useState(false);
  const [infoEditable, setInfoEditable] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isImageViewVisible, setisImageViewVisible] = useState(false);
  const GetValueFunction = (ValueHolder) => {
    var Value = ValueHolder.length.toString();
    setBioCount(Value);
  };
  const placeholder = {
    label: "Select...",
    value: null,
    color: "#9EA0A4",
  };
  const [imageSource, setSource] = useState(0);
  const [dataSource, setDataSource] = useState([
    {
      id: "1",
      image: appImages.user1,
    },
    {
      id: "2",
      image: appImages.user1,
    },
    {
      id: "3",
      image: appImages.user1,
    },
    {
      id: "4",
      image: appImages.user1,
    },
  ]);
  const [dataSource1, setDataSource1] = useState([]);
  //

  const [images, setImages] = useState([]);

  useEffect(() => {
    props.navigation.addListener("focus", async () => {
      setLoading(true);
      AsyncStorage.getItem(AS_KEYS.TOKEN).then((token) => {
        if (token) {
          getData(COLLECTIONS.USERS, token).then((user) => {
            setUser(user);
            setBio(user.bio);
            // setInterest(user.interest);

            setDOB(moment(new Date(user.date_of_birth)).format("ll"));

            var a = [];
            if (user.hasOwnProperty("user_images")) {
              if (user.user_images != null) {
                user.user_images.forEach((element) => {
                  a.push({
                    source: { uri: element },
                    title: "Paris",
                    width: 806,
                    height: 720,
                  });
                });
              }
            }
            if (!user.hasOwnProperty("user_images")) {
              if (user.user_images.length == 0) {
                a.push({
                  source: {
                    uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
                  },
                  title: "Paris",
                  width: 806,
                  height: 720,
                });
              }
            } else {
              a.push({
                source: {
                  uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
                },
                title: "Paris",
                width: 806,
                height: 720,
              });
            }
            setImages(a);
            getData(COLLECTIONS.PROMPTS, token).then(({ Prompts }) => {
              console.log(
                "🚀 ~ file: index.js ~ line 136 ~ getData ~ Prompts",
                Prompts
              );

              setDataSource1(Prompts);
              setLoading(false);
            });
          });
        }
      });
    });
  }, []);

  const isDoBDisable = (date) => {
    const diffInMs = new Date() - new Date(date);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    console.log(
      "🚀 ~ file: index.js ~ line 151 ~ isDoBDisable ~ diffInDays",
      diffInDays.toFixed(0)
    );
    const res = diffInDays.toFixed(0) < 7;
    return !res;
  };

  const showImageGallery = () => {
    return (
      <ImageView
        images={images}
        imageIndex={0}
        isVisible={true}
        renderFooter={(currentImage) => (
          <View>
            <Text>My footer</Text>
          </View>
        )}
      />
    );
  };
  const showMaxLength = (EnterValue) => {
    setBio({ Bio: EnterValue });
    if (EnterValue > 500) {
      alert("Maxium");
    }
  };

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
  //
  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        <SafeAreaView style={styles.container}>
          <StatusBar
            barStyle={"dark-content"}
            backgroundColor={textColor.white}
          />

          <View style={styles.circlecardview}>
            <TouchableOpacity
              style={styles.circlecard}
              onPress={() => props.navigation.goBack()}
            >
              <Icon name={"chevron-left"} type={"material"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.circlecard}
              // onPress={() =>
              //   props.navigation.navigate("EditProfilePictures", {
              //     screen_name: "Userprofile",
              //   })
              // }
              onPress={() => setInfoEditable(!infoEditable)}
            >
              <Icon name={"mode-edit"} type={"material"} />
            </TouchableOpacity>
          </View>
          <LinearGradient colors={["white", "white"]} style={{ flex: 1 }}>
            <ScrollView>
              {images.length > 0 && (
                <GestureRecognizer
                  onSwipeLeft={() => setSlider(1)}
                  onSwipeRight={() => setSlider(0)}
                  style={{
                    flex: 1,
                    // backgroundColor:'red'
                    // marginTop: Platform.OS === "ios" ? responsiveHeight(4) : null,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("EditProfilePictures", {
                        screen_name: "Profile",
                      })
                    }
                    // style={{ marginTop: responsiveHeight(5) }}
                    activeOpacity={0.8}
                  >
                    <ImageBackground
                      source={images[imageSource].source}
                      style={styles.dp}
                      // imageStyle={{ borderRadius: 12 }}
                    >
                      <LinearGradient
                        colors={["transparent", "rgba(0,0,0,0.5)"]}
                        style={{ flex: 1 }}
                      >
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
                      </LinearGradient>
                    </ImageBackground>
                  </TouchableOpacity>
                </GestureRecognizer>
              )}

              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  setInfoEditable(true);
                }}
              >
                <View style={styles.topView}>
                  {infoEditable && (
                    <Icon
                      onPress={async () => {
                        await saveData(COLLECTIONS.USERS, user.id, user);

                        setInfoEditable(!infoEditable);
                      }}
                      name="check"
                      type="entypo"
                      color={textColor.secondary}
                      size={responsiveHeight(3.5)}
                      style={{ alignSelf: "flex-end" }}
                    />
                  )}
                </View>

                {infoEditable ? (
                  <>
                    <View style={styles.detailsview}>
                      <Text style={styles.addtexts}>Name</Text>
                      <TextInput
                        defaultValue={user.name}
                        onChangeText={(text) => {
                          var model = user;
                          model.name = text;
                          setUser(model);
                        }}
                        placeholder={"John Doe"}
                        placeholderTextColor={textColor.placholderColor}
                        style={{
                          color: textColor.primary,
                          marginTop:
                            Platform.OS === "ios" ? responsiveHeight(1.5) : -5,
                        }}
                      />
                    </View>
                    <View style={styles.detailsview1}>
                      <Text style={styles.addtexts}>Email</Text>
                      <TextInput
                        defaultValue={user.email}
                        onChangeText={(text) => {
                          var model = user;
                          model.email = text;
                          setUser(model);
                        }}
                        placeholder={"johndoe@email.com"}
                        placeholderTextColor={textColor.placholderColor}
                        style={{
                          color: textColor.primary,
                          marginTop:
                            Platform.OS === "ios" ? responsiveHeight(1.5) : -5,
                        }}
                      />
                    </View>
                    <View style={styles.detailsview1}>
                      <Text style={styles.addtexts}>Occupation</Text>
                      <TextInput
                        defaultValue={user.occupation}
                        onChangeText={(text) => {
                          var model = user;
                          model.occupation = text;
                          setUser(model);
                        }}
                        placeholder={"Doctor"}
                        placeholderTextColor={textColor.placholderColor}
                        style={{
                          color: textColor.primary,
                          marginTop:
                            Platform.OS === "ios" ? responsiveHeight(1.5) : -5,
                        }}
                      />
                    </View>
                    {/* <View style={styles.detailsview1}>
                      <Text style={styles.addtexts}>Interested In</Text>
                      <View
                        style={{ start: 15, top: 10, position: "absolute" }}
                      >
                        <RNPickerSelect
                          placeholder={placeholder}
                          value={interest}
                          onValueChange={(text) => {
                            var model = user;
                            model.interest = text;
                            setUser(model);
                            setInterest(text);
                          }}
                          items={[
                            { label: "All", value: "All" },
                            { label: "Men", value: "Men" },
                            { label: "Women", value: "Women" },
                          ]}
                          style={{
                            inputIOS: {
                              fontSize: responsiveFontSize(2),
                              paddingVertical: 2,
                              paddingHorizontal: 0,
                              borderWidth: 1,
                              borderColor: "transparent",
                              borderRadius: 4,
                              color: "black",
                              backgroundColor: "transparent",
                              width: responsiveWidth(40),
                              height: responsiveHeight(10.2),

                              paddingRight: 0, // to ensure the text is never behind the icon
                            },
                            inputAndroid: {
                              fontSize: responsiveFontSize(2),
                              paddingVertical: 2,
                              paddingHorizontal: 0,
                              borderWidth: 1,
                              borderColor: "transparent",
                              borderRadius: 4,
                              color: "black",
                              backgroundColor: "transparent",
                              width: responsiveWidth(40),
                              height:
                                Platform.OS === "ios"
                                  ? responsiveHeight(10.2)
                                  : responsiveHeight(10),
                              paddingRight: 0,
                            },
                          }}
                          useNativeAndroidPickerStyle={false}
                        />
                      </View>
                    </View> */}
                    {/* <View style={styles.detailsview1}>
                      <Text style={styles.addtexts}>Location</Text>
                      <TextInput
                        defaultValue={user.location}
                        onChangeText={(text) => {
                          var model = user;
                          model.location = text;
                          setUser(model);
                        }}
                        placeholder={"Enter Location"}
                        placeholderTextColor={textColor.placholderColor}
                        style={{
                          color: textColor.primary,
                          marginTop:
                            Platform.OS === "ios" ? responsiveHeight(1.5) : -5,
                        }}
                      />
                    </View> */}
                    <View style={styles.pickersview}>
                      <View style={styles.halfpicker}>
                        <View style={{ width: responsiveWidth(30) }}>
                          <Text
                            style={[
                              styles.addtexts,
                              { marginBottom: responsiveHeight(1.3) },
                            ]}
                          >
                            Gender
                          </Text>
                          <View style={{ position: "absolute" }}>
                            <RNPickerSelect
                              placeholder={placeholder}
                              onValueChange={(val) => {
                                var model = user;
                                model.gender = val;
                                setUser(model);
                              }}
                              value={user.gender}
                              items={[
                                { label: "Male", value: "Male" },
                                { label: "Female", value: "Female" },
                                { label: "Trans", value: "Trans" },
                                { label: "Non-Binary", value: "Non-Binary" },
                              ]}
                              style={{
                                inputIOS: {
                                  fontSize: responsiveFontSize(2),
                                  paddingVertical: 2,
                                  paddingHorizontal: 0,
                                  borderWidth: 1,
                                  borderColor: "transparent",
                                  borderRadius: 4,
                                  color: "black",
                                  backgroundColor: "transparent",
                                  width: responsiveWidth(40),
                                  height: responsiveHeight(10.2),

                                  paddingRight: 0, // to ensure the text is never behind the icon
                                },
                                inputAndroid: {
                                  fontSize: responsiveFontSize(2),
                                  paddingVertical: 2,
                                  paddingHorizontal: 0,
                                  borderWidth: 1,
                                  borderColor: "transparent",
                                  borderRadius: 4,
                                  color: "black",
                                  backgroundColor: "transparent",
                                  width: responsiveWidth(40),
                                  height:
                                    Platform.OS === "ios"
                                      ? responsiveHeight(10.2)
                                      : responsiveHeight(10),
                                  paddingRight: 0,
                                },
                              }}
                              useNativeAndroidPickerStyle={false}
                            />
                          </View>
                        </View>
                        <Icon
                          name="chevron-down"
                          type="entypo"
                          style={{ marginTop: responsiveHeight(1) }}
                          color={appColor.appbackground}
                          size={20}
                        />
                      </View>
                      <View style={styles.DOB}>
                        <View>
                          <Text style={styles.addtexts}>Date of Birth</Text>
                          <DateSelect
                            disabled={isDoBDisable(user.created_on)}
                            style={styles.textInputLableText}
                            initialDate={DOB}
                            getDate={(date) => {
                              var model = user;
                              model.date_of_birth = date;
                              setUser(model);
                              setDOB(date);
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </>
                ) : (
                  <View>
                    <View style={styles.detailsview11}>
                      <Text
                        style={[styles.nametxt, { color: textColor.primary }]}
                      >
                        {`${user.name} \t`}
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
                        {getAge(user.date_of_birth)}
                      </Text>
                    </View>
                    {user.hasOwnProperty("occupation") && (
                      <>
                        <View
                          style={[
                            styles.detailsview11,
                            { marginTop: responsiveHeight(1) },
                          ]}
                        >
                          <Icon
                            type={"font-awesome"}
                            name={"briefcase"}
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
                                color: "black",
                                marginTop: 2,
                              },
                            ]}
                          >
                            {user.occupation.length > 0
                              ? user.occupation
                              : "No Occupation  Entered"}
                          </Text>
                        </View>
                      </>
                    )}
                    {user.hasOwnProperty("city") &&
                      user.hasOwnProperty("country") && (
                        <View
                          style={[
                            styles.detailsview11,
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
                                color: "black",
                                marginTop: 2,
                              },
                            ]}
                          >
                            {user.city.length > 0 || user.country.length > 0
                              ? `${user.city.length > 0 ? user.city : ""}, ${
                                  user.country.length > 0 ? user.country : ""
                                }`
                              : "No Locaction  Selected"}
                          </Text>
                        </View>
                      )}
                    {/* {user.hasOwnProperty("interest") && (
                      <View
                        style={[
                          styles.detailsview11,
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
                              bottom: 3.5,
                            },
                          ]}
                        >
                          {user.interest != null && user.interest != ""
                            ? `Interested in ${user.interest}`
                            : "No Interest  Selected"}
                          {}
                        </Text>
                      </View>
                    )} */}
                  </View>
                )}
              </TouchableOpacity>

              <View style={styles.card}>
                <View style={styles.topView}>
                  {bioEditable && (
                    <Icon
                      onPress={async () => {
                        setBioEditable(!bioEditable);
                        var model = user;

                        model.bio = bio;
                        await saveData(COLLECTIONS.USERS, model.id, model);
                      }}
                      name="check"
                      type="entypo"
                      color={textColor.secondary}
                      size={responsiveHeight(3.5)}
                      style={{ alignSelf: "flex-end" }}
                    />
                  )}
                </View>
                <TouchableOpacity onPress={() => setBioEditable(true)}>
                  {!bioEditable ? (
                    <>
                      <Text style={styles.infoheading}>Bio</Text>

                      <TouchableOpacity onPress={() => setBioEditable(true)}>
                        <Text
                          style={{
                            color: "#666c75",
                            fontSize: responsiveFontSize(2),
                          }}
                        >
                          {bio != undefined
                            ? bio.length > 0
                              ? bio
                              : "Bio is not entered"
                            : "Bio is not entered"}
                        </Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TextInput
                        style={{
                          color: "#666c75",
                          fontSize: responsiveFontSize(2),
                        }}
                        maxLength={500}
                        value={bio}
                        editable={bioEditable}
                        multiline
                        onChangeText={(bio) => {
                          setBio(bio);
                          GetValueFunction(bio);
                        }}
                        returnKeyType="done"
                        onBlur={() => setBioEditable(false)}
                      />
                      <Text
                        style={{ alignSelf: "flex-end" }}
                      >{`${bioCount}/500`}</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.myphotoview}>
                <Text style={styles.myphototxt}>Prompts</Text>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("EditPrompts")}
                >
                  <Text style={styles.biotxt}>Edit</Text>
                </TouchableOpacity>
              </View>

              <View>
                {/* <FlatList
                  data={dataSource1}
                  renderItem={}
                /> */}
                {dataSource1 != undefined &&
                  dataSource1.length != 0 &&
                  dataSource1.map((item, index) => (
                    <View
                      key={index}
                      // onPress={() => props.navigation.navigate("EditPrompts")}
                      style={styles.Promptscard}
                    >
                      <View>
                        <Text style={styles.biotxt}>{item.title}</Text>
                        <Text style={styles.txt}>{item.details}</Text>
                      </View>
                      <Icon
                        name={"star"}
                        type={"antdesign"}
                        color={
                          item.status ? iconColor.yellow : cardColor.secondary
                        }
                        size={responsiveFontSize(5.3)}
                      />
                    </View>
                  ))}
                {dataSource1 == undefined && (
                  <View style={{ padding: responsiveWidth(5) }}>
                    <Text>No Prompt is selected</Text>
                  </View>
                )}
                {dataSource1 != undefined && (
                  <>
                    {dataSource1.length == 0 && (
                      <View style={{ padding: responsiveWidth(5) }}>
                        <Text>No Prompt is selected</Text>
                      </View>
                    )}
                  </>
                )}
              </View>
              <TouchableOpacity
                style={styles.resetbtn1}
                onPress={() => props.navigation.goBack()}
              >
                <Text style={styles.resetbtntxt}>DONE</Text>
              </TouchableOpacity>
              <View style={styles.footer} />
              <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={responsiveHeight(80)}
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
                      props.navigation.navigate("Addon");
                      refRBSheet.current.close();
                    }}
                  >
                    <Text style={styles.rbsheetbtntxt}>Add Ons</Text>
                    <Icon
                      name={"chevron-small-right"}
                      type={"entypo"}
                      color={buttonColor.grey}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rbsheetbtn}
                    onPress={() => {
                      props.navigation.navigate("Subscription");
                      refRBSheet.current.close();
                    }}
                  >
                    <Text style={styles.rbsheetbtntxt}>Upgrade Account</Text>
                    <Icon
                      name={"chevron-small-right"}
                      type={"entypo"}
                      color={buttonColor.grey}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.rbsheetbtn]}
                    onPress={() => {
                      props.navigation.navigate("ChangePas");
                      refRBSheet.current.close();
                    }}
                  >
                    <Text style={styles.rbsheetbtntxt}>Change Password</Text>
                    <Icon
                      name={"chevron-small-right"}
                      type={"entypo"}
                      color={buttonColor.grey}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.rbsheetbtn]}
                    onPress={() => {
                      props.navigation.navigate("Notifacation");
                      refRBSheet.current.close();
                    }}
                  >
                    <Text style={styles.rbsheetbtntxt}>
                      Notifications Settings
                    </Text>
                    <Icon
                      name={"chevron-small-right"}
                      type={"entypo"}
                      color={buttonColor.grey}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.rbsheetbtn]}
                    onPress={() => {
                      props.navigation.navigate("About");
                      refRBSheet.current.close();
                    }}
                  >
                    <Text style={styles.rbsheetbtntxt}>About The App</Text>
                    <Icon
                      name={"chevron-small-right"}
                      type={"entypo"}
                      color={buttonColor.grey}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.rbsheetbtn]}
                    onPress={() => {
                      props.navigation.navigate("ContactUs");
                      refRBSheet.current.close();
                    }}
                  >
                    <Text style={styles.rbsheetbtntxt}>Contact Us</Text>
                    <Icon
                      name={"chevron-small-right"}
                      type={"entypo"}
                      color={buttonColor.grey}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.rbsheetbtn]}
                    onPress={() => {
                      refRBSheet.current.close();
                      refRBSheet1.current.open();
                    }}
                  >
                    <Text
                      style={[styles.rbsheetbtntxt, { color: textColor.red }]}
                    >
                      Delete Account
                    </Text>
                    <Icon
                      name={"chevron-small-right"}
                      type={"entypo"}
                      color={buttonColor.grey}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.rbsheetbtn,
                      { borderBottomWidth: responsiveWidth(0.3) },
                    ]}
                  >
                    <Text
                      style={[styles.rbsheetbtntxt, { color: textColor.red }]}
                    >
                      Logout
                    </Text>
                    <Icon
                      name={"chevron-small-right"}
                      type={"entypo"}
                      color={buttonColor.grey}
                    />
                  </TouchableOpacity>
                  <View style={styles.logoview}>
                    <Image
                      source={appImages.logo}
                      style={{
                        height: responsiveHeight(5),
                        width: responsiveWidth(20),
                        resizeMode: "contain",
                      }}
                    />
                    <Text style={styles.versiontxt}>Version 1.2.3</Text>
                  </View>
                  <View style={styles.termsview}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate("TermsCondition");
                        refRBSheet.current.close();
                      }}
                    >
                      <Text style={styles.termstxt}>Terms & Conditions</Text>
                    </TouchableOpacity>
                    <Icon name={"dot-single"} type={"entypo"} />
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate("Privacy");
                        refRBSheet.current.close();
                      }}
                    >
                      <Text style={styles.termstxt}>Privacy Policy</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </RBSheet>
              <ImageView
                isTapZoomEnabled
                isPinchZoomEnabled
                isSwipeCloseEnabled
                onClose={() => setisImageViewVisible(!isImageViewVisible)}
                images={images}
                imageIndex={0}
                isVisible={isImageViewVisible}
                renderFooter={(currentImage) => (
                  <View>
                    <Text>My footer</Text>
                  </View>
                )}
              />
              <View>
                <RBSheet
                  ref={refRBSheet1}
                  closeOnDragDown={false}
                  closeOnPressMask={true}
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
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.subContainer}>
                      <View
                        style={{
                          height: responsiveHeight(11),
                          width: responsiveHeight(11),
                          borderRadius: responsiveHeight(6),
                          alignSelf: "center",
                          zIndex: 1,
                          position: "absolute",
                          top: -responsiveHeight(3.5),
                        }}
                      >
                        <Image
                          source={appImages.user2}
                          style={{
                            height: "100%",
                            width: "100%",
                            borderWidth: responsiveWidth(0.3),
                            borderColor: textColor.white,
                            borderRadius: responsiveHeight(7),
                          }}
                        />
                      </View>
                      <View style={styles.textWrapper}>
                        <Text style={styles.unMatchText}>
                          Are you sure you want to delete your Keebo account?
                        </Text>
                        <Text style={styles.unMatchText1}>
                          Everything will be deleted and this action cannot be
                          undone
                        </Text>
                      </View>

                      <View style={styles.btnGroup}>
                        <TouchableOpacity style={styles.noBtn}>
                          <Text style={styles.noTxt}>NO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.yesBtn}
                          onPress={() => refRBSheet1.current.close()}
                        >
                          <Text style={styles.yesTxt}>YES</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </RBSheet>
              </View>
            </ScrollView>
          </LinearGradient>
        </SafeAreaView>
      )}
    </>
  );
};
export default AppScreen;
