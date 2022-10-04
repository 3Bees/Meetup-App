import React, { useState } from "react";
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
  KeyboardAvoidingView
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { fontFamily } from "../../../../constants/fonts";
import { styles } from "./style";
import { Icon } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Header } from "../../../../components/header";
import ImagePicker from "react-native-image-crop-picker";
import { DateSelect, TimeSelect } from "../../../../components/dateTimePicker";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { appImages } from "../../../../assets/utility";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { appColor, textColor ,bggradientColor} from "../../../../constants/colors";
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { SafeAreaView } from "react-native-safe-area-context";

const EditProfile = (props) => {
  const [gender, setGender] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [nextDate, setNextDate] = useState(null);
  const [lastDate, setLastDate] = useState(null);
  const [isNextDateVisible, setNextDatePicker] = useState(false);
  const [bioCount, setBioCount] = useState(0);
  const [CoverImage, setCoverImage] = useState();
  const [ProfileImage, setProfileImage] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [DOB, setDOB] = useState("Jan 3,2021");
  const [male, setMale] = useState("");
  const [female, setFemale] = useState("");
  const [other, setOther] = useState("");
  const [bio, setBio] = useState("");
  const [bioErro, setBioError] = useState("");
  const handleOnChangeBioText = (bio) => {
    !bio
      ? setBioError("")
      : bio.length > 500
        ? setBioError("Max 500 characters")
        : setBioError("");
    setBio(bio);
  };
  const [imageSource, setSource] = useState(0);

  const [images, setImages] = useState([
    {
      source: appImages.user1,
      title: "Paris",
      width: 806,
      height: 720,
    },
    {
      source: appImages.user2,
      title: "Paris",
      width: 806,
      height: 720,
    },
    {
      source: appImages.user3,
      title: "Paris",
      width: 806,
      height: 720,
    },
    {
      source: appImages.user2,
      title: "Paris",
      width: 806,
      height: 720,
    },
  ]);
  const selectCoverImage = () => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>hello");
    var options = {
      title: "Update Cover Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        alert(response.customButton);
      } else {
        setCoverImage(response.assets[0].uri);
        console.log("picked", response);
        console.log(CoverImage);
        // savaPhotoId(response);
      }
    });
  };

  const GetValueFunction = (ValueHolder) => {
    var Value = ValueHolder.length.toString();
    setBioCount(Value);
  };
  const selectProfileImage = () => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>hello");
    var options = {
      title: "Update Profile Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        alert(response.customButton);
      } else {
        setProfileImage(response.assets[0].uri);
        console.log("picked", response);
        console.log(ProfileImage);
        // savaPhotoId(response);
      }
    });
  };
  const setSlider = (x) => {
    let y = imageSource;
    
    if (x == 0) {
      if (imageSource !== 0) {
        setSource(--y);
      }
      else(
        setSource(images.length - 1)
      )
    } else if (x == 1) {
      if (imageSource !== images.length - 1) {
        setSource(++y);
      }
      else{
        setSource(0)
      }
    }
  };
  const placeholder = {
    label: 'Select...',
    value: null,
    color: '#9EA0A4',
  };
  return (
    <SafeAreaView style={styles.coverprofileview} >
       <LinearGradient
        colors={[bggradientColor.c1, bggradientColor.c2]}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'position'} enabled >
          <ScrollView >

            <StatusBar
              backgroundColor={textColor.white}
              barStyle={"dark-content"}
            />

            <View style={styles.coverview}>
              <TouchableOpacity
                style={styles.circlecard}
                onPress={() => props.navigation.goBack()}
              >
                <Icon name={"chevron-left"} type={"entypo"} />
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.cambutton}
                onPress={() => {
                  // selectCoverImage();
                  ImagePicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true,
                  }).then((image) => {
                    console.log(image);
                  });
                }}
              >
                <Icon name={"camera"} type={"entypo"} color={"white"} />
                <Text style={styles.addtexts1}>Change Cover Photo</Text>
              </TouchableOpacity> */}
            </View>

            <GestureRecognizer
              onSwipeLeft={() => setSlider(0)}
              onSwipeRight={() => setSlider(1)}
              style={{
                flex: 1,
                // backgroundColor:'red'
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.navigate("EditProfilePictures")}
                style={{ marginTop: responsiveHeight(1) }}
                activeOpacity={0.8}
              >
                <ImageBackground
                  source={images[imageSource].source}
                  style={styles.dp}
                  imageStyle={{ borderRadius: 12 }}
                >
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.5)"]}
                    style={{ borderRadius: 12, flex: 1 }}
                  >
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
                    <View
                      style={{
                        justifyContent: "flex-end",
                        flex: 1,
                        paddingBottom: responsiveHeight(3),
                      }}
                    >
                      <Text style={styles.nametxt}>Tap to edit photos</Text>
                    </View>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            </GestureRecognizer>
            {/* <View style={styles.profilestrokeview}></View> */}
            <View style={styles.detailsview}>
              <Text style={styles.addtexts}>Name</Text>
              <TextInput
                placeholder={"John Doe"}
                placeholderTextColor={textColor.placholderColor}
                style={{ color: textColor.primary, top: Platform.OS === 'ios' ? 10 : -5 }}
              />
            </View>
            <View style={styles.detailsview1}>
              <Text style={styles.addtexts}>Email</Text>
              <TextInput
                placeholder={"johndoe@email.com"}
                placeholderTextColor={textColor.placholderColor}
                style={{ color: textColor.primary, top: Platform.OS === 'ios' ? 10 : -5 }}

              />
            </View>
            <View style={styles.pickersview}>
              <View
                style={styles.halfpicker}
              // onPress={() => setModalVisible(!modalVisible)}
              >
                <View style={{ width: responsiveWidth(30) }}>
                  <Text style={[styles.addtexts, { marginBottom: responsiveHeight(1.3) }]}>Gender</Text>

                  <View style={{ position: 'absolute', }}>
                    <RNPickerSelect
                      placeholder={placeholder}

                      onValueChange={(value) => console.log(value)}
                      items={[
                        { label: 'Male', value: 'Male' },
                        { label: 'Female', value: 'Female' },
                        { label: 'Other', value: 'Other' },
                      ]}

                      style={{
                        inputIOS: {
                          fontSize: responsiveFontSize(2),
                          paddingVertical: 2,
                          paddingHorizontal: 0,
                          borderWidth: 1,
                          borderColor: 'transparent',
                          borderRadius: 4,
                          color: 'black',
                          backgroundColor: 'transparent',
                          width: responsiveWidth(40),
                          height: responsiveHeight(10.2),
                          // bottom:responsiveHeight(0.6),
                          // top:responsiveHeight(3.2),
                          // backgroundColor:'red',
                          paddingRight: 0, // to ensure the text is never behind the icon
                        },
                        inputAndroid: {
                          fontSize: responsiveFontSize(2),
                          paddingVertical: 2,
                          paddingHorizontal: 0,
                          borderWidth: 1,
                          borderColor: 'transparent',
                          borderRadius: 4,
                          color: 'black',
                          backgroundColor: 'transparent',
                          width: responsiveWidth(40),
                          height: Platform.OS === 'ios' ? responsiveHeight(10.2) : responsiveHeight(10.2),
                          // bottom:responsiveHeight(0.6),
                          // top:responsiveHeight(3.2),
                          // backgroundColor:'red',
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
                {/* <RNPickerSelect
    style={{
      inputIOS: styles.inputIOS,
      inputAndroid: styles.inputAndroid,
    }}
    onValueChange={(value) => console.log(value)}
    Icon={() => (
      <Icon
        name="chevron-down"
        type="entypo"
        color={appColor.appbackground}
        size={20}
      />
    )}
    items={[
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Other", value: "Other" },
    ]}
    placeholder={{ label: "Select Gender", color: textColor.secondary }}
    useNativeAndroidPickerStyle={false}
    placholderColor={textColor.secondary}
  /> */}
              </View>
              <View style={styles.DOB}>
                <View>
                  <Text style={styles.addtexts}>Date of Birth</Text>
                  <DateSelect
                    style={styles.textInputLableText}

                    initialDate={DOB}
                    getDate={(date) => {
                      setDOB(date);
                    }}
                  />
                </View>
              </View>
            </View>
            {/* <View style={styles.bioview}>
          <Text style={styles.addtexts}>Bio</Text>
          <TextInput
            multiline
            maxLength={500}
            style={{ color: textColor.primary, textAlignVertical: 'top' }}
            placeholder={
              "Aliquam in bibendum mauris. Sed vitae erat vel \nvelit blandit pharetra vitae nec ante. Cras at est \naugue. Cras ut interdum elit. Ut malesuada a \nurna sit amet blandit."
            }
            placeholderTextColor={textColor.placholderColor}
            onChangeText={(text) => { handleOnChangeBioText(text); GetValueFunction(text) }}
          />
          <Text style={{ alignSelf: 'flex-end' }}>{`${bioCount}/500`}</Text>
        </View> */}
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => props.navigation.navigate("Profile")}
            >
              <Text style={styles.continuetext}>Save Changes</Text>
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
            <View style={{ height: responsiveHeight(20) }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};
export default EditProfile;
