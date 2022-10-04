import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  ImageBackground,
  Modal,
  Platform,
  ActivityIndicator,
} from "react-native";
import { styles } from "./style";
import { Icon } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import ImagePicker from "react-native-image-crop-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { DateSelect, TimeSelect } from "../../../components/dateTimePicker";
import { appImages } from "../../../assets/utility";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { appColor, textColor } from "../../../constants/colors";
import { storage } from "../../../Backend/firebaseConfig";
import moment from "moment";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import Toast from "react-native-simple-toast";
import { getData, saveData } from "../../../Backend/utility";
import AsyncStorage from "@react-native-async-storage/async-storage";
import utils from "./utils";
import AS_KEYS from "../../../constants/asynckeys";
import COLLECTIONS from "../../../Backend/collecctions";
import SCREENS from "../../../route/authStack/screens";
import Geolocation from "@react-native-community/geolocation";
import { request, check, PERMISSIONS, RESULTS } from "react-native-permissions";
import { saveDefaultPreferences } from "./helper";
import { getAge } from "../../../global/helpers";

const EditProfile = ({ navigation, route }) => {
  const pickerRef = useRef();
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [nextDate, setNextDate] = useState(null);
  const [lastDate, setLastDate] = useState(null);
  const [isNextDateVisible, setNextDatePicker] = useState(false);
  const [CoverImage, setCoverImage] = useState();
  const [ProfileImage, setProfileImage] = useState(null);
  const [bioCount, setBioCount] = useState(0);
  const [DOB, setDOB] = useState(moment("Jan 3,2021").format("MM/DD/YYYY"));
  const [profileURI, setProfileURI] = useState(null);
  const [coverURI, setCoverURI] = useState(null);
  const [coverUploading, setCoverUploading] = useState(false);
  const [profileUploading, setProfileUploading] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [bio, setBio] = useState("");
  const [bioErro, setBioError] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [interest, setInterest] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userimages, setUserimages] = useState([]);
  const [initialPosition, setInitialPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  const handleOnChangeBioText = (bio) => {
    !bio
      ? setBioError("")
      : bio.length > 500
      ? setBioError("Max 500 characters")
      : setBioError("");
    setBio(bio);
  };

  const GetValueFunction = (ValueHolder) => {
    var Value = ValueHolder.length.toString();
    setBioCount(Value);
  };

  const placeholder = {
    label: "Select...",
    value: null,
    color: "#9EA0A4",
  };

  const create_profile = async () => {
    const uid = await AsyncStorage.getItem(AS_KEYS.TOKEN);

    if (fullName == undefined) {
      Toast.show(utils.fullnameError);
    } else if (fullName.length == 0) {
      Toast.show(utils.fullnameError);
    } else if (email == undefined) {
      Toast.show("Please enter email");
    } else if (email.length == 0) {
      Toast.show("Please enter email");
    } else if (gender == undefined) {
      Toast.show(utils.genderError);
    } else if (gender.length == 0) {
      Toast.show(utils.genderError);
    } else if (getAge(DOB) < 18) {
      Toast.show("Sorry, you must be at least 18 years old to play Keebo!");
    } else {
      setLoading(true);
      var res = await AsyncStorage.getItem(AS_KEYS.USER_PICTURES);
      const userImagesArray = JSON.parse(res);
      const user_data = {
        id: uid,
        name: fullName,
        email: email,
        gender: gender,
        bio: bio,
        date_of_birth: DOB,
        user_images: userImagesArray,
        stage: 1,
        occupation: occupation,
        interest: interest,
        location: initialPosition,
        country: country,
        city: city,
        created_on: new Date().toUTCString(),
      };
      saveDefaultPreferences(uid);
      await saveData(COLLECTIONS.USERS, uid, user_data)
        .then((res) => {
          if (res) {
            AsyncStorage.setItem(AS_KEYS.TOKEN, uid);
            navigation.navigate(SCREENS.ADD_PROMTS, { user_data: user_data });
            setLoading(false);
          } else {
            Toast.show(utils.saveError);
            setLoading(false);
          }
          AsyncStorage.removeItem(AS_KEYS.USER_PICTURES);
        })
        .catch((error) => {
          console.log(error);
          Toast.show(utils.saveError);

          setLoading(false);
        });
    }
  };

  const get = async () => {
    const uid = await AsyncStorage.getItem(AS_KEYS.TOKEN);

    const { email, name, user_images } = await getData(COLLECTIONS.USERS, uid);

    setFullName(name);
    setEmail(email);
    setUserimages(user_images);
  };

  const getCurrentLocation = () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
      if (result == "granted") {
        Geolocation.getCurrentPosition(
          (position) => {
            var lat = parseFloat(position.coords.latitude);
            var long = parseFloat(position.coords.longitude);

            var initialRegion = {
              latitude: lat,
              longitude: long,
            };
            setInitialPosition(initialRegion);
            fetch(
              "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                lat +
                "," +
                long +
                "&key=" +
                "AIzaSyAbR-CSoWYwy6JgghOMegO2iZRFzgG3kBo"
            )
              .then((response) => response.json())
              .then(({ results }) => {
                var addressesArray = results[0].address_components;
                var country = addressesArray.filter((element) => {
                  return element.types.includes("country");
                })[0]?.long_name;

                var city = addressesArray.filter((element) => {
                  return element.types.includes("locality");
                })[0]?.long_name;

                setCountry(country);
                setCity(city);
              });
          },
          (error) => alert(JSON.stringify(error)),
          { enableHighAccuracy: true, timeout: 1000000, maximumAge: 3600000 }
        );
      }
    });
  };

  useEffect(() => {
    get();
    getCurrentLocation();
    // navigation.addListener("focus", async () => {
    //   console.log(route);
    //   if (route.params) {
    //     const { uploaded_images } = route.params;
    //     if (uploaded_images?.length > 0) {
    //       setProfileImage(uploaded_images[0]);
    //       setUploadedImages(uploaded_images);
    //     }
    //   }
    // });
  }, []);

  return (
    <KeyboardAvoidingScrollView style={styles.container}>
      <StatusBar backgroundColor={textColor.white} barStyle={"dark-content"} />
      <View style={styles.subtitleview}>
        <Text style={styles.subtitle}>{utils.title}</Text>
      </View>
      {userimages != undefined && (
        <>
          {userimages.length > 0 ? (
            <ImageBackground
              style={styles.profileview}
              source={
                userimages.length > 0
                  ? { uri: userimages[0] }
                  : {
                      uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
                    }
              }
            >
              <TouchableOpacity
                style={styles.cambutton}
                onPress={() =>
                  navigation.navigate("ProfilePictures", {
                    screen_name: "EditProfile",
                  })
                }
              >
                <Icon
                  name="camera"
                  type="entypo"
                  color={
                    ProfileImage ? textColor.white : appColor.appbackground
                  }
                  size={20}
                />
                <Text
                  style={[
                    styles.addtexts1,
                    {
                      color: ProfileImage
                        ? textColor.white
                        : textColor.secondary,
                    },
                  ]}
                >
                  {utils.addProfilePhoto}
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          ) : (
            <ActivityIndicator />
          )}
        </>
      )}

      <View style={styles.detailsview}>
        <Text style={styles.addtexts}>Name</Text>
        <TextInput
          value={fullName}
          onChangeText={(fname) => setFullName(fname)}
          placeholder={"John Doe"}
          placeholderTextColor={textColor.placholderColor}
          style={{
            color: textColor.primary,
            marginTop: Platform.OS === "ios" ? responsiveHeight(1.5) : -5,
          }}
        />
      </View>
      <View style={styles.detailsview1}>
        <Text style={styles.addtexts}>Email</Text>
        <TextInput
          value={email}
          onChangeText={(email) => setEmail(email)}
          placeholder={"johndoe@email.com"}
          placeholderTextColor={textColor.placholderColor}
          style={{
            color: textColor.primary,
            marginTop: Platform.OS === "ios" ? responsiveHeight(1.5) : -5,
          }}
        />
      </View>
      <View style={styles.detailsview1}>
        <Text style={styles.addtexts}>Occupation</Text>
        <TextInput
          value={occupation}
          onChangeText={(text) => setOccupation(text)}
          placeholder={"Doctor"}
          placeholderTextColor={textColor.placholderColor}
          style={{
            color: textColor.primary,
            marginTop: Platform.OS === "ios" ? responsiveHeight(1.5) : -5,
          }}
        />
      </View>
      {/* <View style={styles.detailsview1}>
        <Text style={styles.addtexts}>Interested In</Text>
        <View style={{ start: 15, top: 10, position: "absolute" }}>
          <RNPickerSelect
            placeholder={placeholder}
            onValueChange={(value) => setInterest(value)}
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
          value={location}
          onChangeText={(text) => setLocation(text)}
          placeholder={"Enter Location"}
          placeholderTextColor={textColor.placholderColor}
          style={{
            color: textColor.primary,
            marginTop: Platform.OS === "ios" ? responsiveHeight(1.5) : -5,
          }}
        />
      </View> */}
      <View style={styles.pickersview}>
        <View style={styles.halfpicker}>
          <View style={{ width: responsiveWidth(30) }}>
            <Text
              style={[styles.addtexts, { marginBottom: responsiveHeight(1.3) }]}
            >
              Gender
            </Text>
            <View style={{ position: "absolute" }}>
              <RNPickerSelect
                placeholder={placeholder}
                onValueChange={(value) => setGender(value)}
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
              style={styles.textInputLableText}
              initialDate={DOB}
              getDate={(date) => {
                date = moment(date).format("MM/DD/YYYY");

                setDOB(date);
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.bioview}>
        <Text style={styles.addtexts}>Bio</Text>
        <TextInput
          multiline={true}
          maxLength={500}
          value={bio}
          onChangeText={(text) => {
            handleOnChangeBioText(text);
            GetValueFunction(text);
          }}
          style={{ color: textColor.primary, textAlignVertical: "top" }}
          placeholder={
            "Aliquam in bibendum mauris. Sed vitae erat vel \nvelit blandit pharetra vitae nec ante. Cras at est \naugue. Cras ut interdum elit. Ut malesuada a \nurna sit amet blandit."
          }
          placeholderTextColor={textColor.placholderColor}
        />
        <Text style={{ alignSelf: "flex-end" }}>{`${bioCount}/500`}</Text>
      </View>

      <TouchableOpacity
        disabled={loading}
        style={styles.buttons}
        onPress={() => create_profile()}
      >
        {loading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <Text style={styles.continuetext}>Continue</Text>
        )}
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
                setGender("Male");
              }}
              style={{ marginVertical: responsiveHeight(1) }}
            >
              <Text style={styles.maletxt}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
                setGender("Female");
              }}
              style={{ marginVertical: responsiveHeight(1) }}
            >
              <Text style={styles.maletxt}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
                setGender("Other");
              }}
              style={{ marginVertical: responsiveHeight(1) }}
            >
              <Text style={styles.maletxt}>Other</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingScrollView>
  );
};
export default EditProfile;
