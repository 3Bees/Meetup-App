import React, { useEffect, useState } from "react";
import { appImages } from "../../../../assets/utility";
import { appColor, textColor } from "../../../../constants/colors";
import { Icon } from "react-native-elements";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import ImagePicker from "react-native-image-crop-picker";
import { styles } from "./style";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { DragSortableView } from "react-native-drag-sort";
import {
  getData,
  saveData,
  uploadProfileImage,
} from "../../../../Backend/utility";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AS_KEYS from "../../../../constants/asynckeys";
import COLLECTIONS from "../../../../Backend/collecctions";

const App = ({ navigation, route }) => {
  const [tiles, setTiles] = useState([
    {
      image: appImages.user1,
    },
    {
      image: appImages.user2,
    },
    {
      image: appImages.user1,
    },
    {
      image: appImages.user1,
    },
  ]);

  const [uploadedImages, setUploadedImages] = useState([]);
  const [dpimage, setImage] = useState(["muimg"]);
  const [loading, setLoading] = useState(false);
  const selectProfileImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);

      let arr = [...dpimage];
      arr.unshift(image.path);
      setImage([...arr]);
    });
  };

  const get = async () => {
    const uid = await AsyncStorage.getItem(AS_KEYS.TOKEN);

    const { user_images } = await getData(COLLECTIONS.USERS, uid);

    let arr = dpimage;
    user_images.forEach((element) => {
      arr.unshift(element);
    });
    setImage([...arr]);
  };

  const add_profile_images = async () => {
    setLoading(true);
    console.log(dpimage);
    var uploaded_images = [];
    await Promise.all(
      dpimage.map(async (uri, index) => {
        if (uri != "muimg") {
          var today = new Date();
          var milli_seconds = today.getMilliseconds();
          let today_milliseconds = Date.parse(today);
          today_milliseconds = today_milliseconds + milli_seconds;
          let filename = `${today_milliseconds}.JPG`;
          let uploaded = await uploadProfileImage(uri, filename);
          uploaded_images.push(uploaded);
        }
      })
    ).then(async () => {
      const uid = await AsyncStorage.getItem(AS_KEYS.TOKEN);

      await AsyncStorage.setItem(
        AS_KEYS.USER_PICTURES,
        JSON.stringify(uploaded_images)
      );
      await saveData(COLLECTIONS.USERS, uid, {
        user_images: uploaded_images,
      });
      // setTimeout(() => {
      setLoading(false);
      navigation.navigate(route.params.screen_name);
      // }, 2000);
    });
  };

  useEffect(() => {
    navigation.addListener("focus", async () => {
      console.log(route.params);
    });
    get();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={textColor.white}
          barStyle={"dark-content"}
        />
        <View style={styles.subtitleview}>
          <TouchableOpacity
            style={styles.backbutton}
            onPress={() => navigation.navigate(route.params.screen_name)}
          >
            <Image source={appImages.cheveronbackblack} />
          </TouchableOpacity>
          <Text style={styles.subtitle}>Profile Pictures</Text>
        </View>
        <View style={styles.tile}>
          <DragSortableView
            dataSource={dpimage}
            parentWidth={400}
            horizontal={true}
            childrenWidth={responsiveWidth(30)}
            childrenHeight={responsiveHeight(35)}
            keyExtractor={(item, index) => index}
            renderItem={(item, index) => {
              return (
                <View
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                    justifyContent: "space-between",
                    alignSelf: "center",
                    marginTop: responsiveHeight(2),
                  }}
                >
                  {dpimage.length - 1 === index ? (
                    // <View style={styles.coverview}>
                    <TouchableOpacity
                      onPress={() => selectProfileImage()}
                      style={styles.coverview}
                    >
                      <Icon
                        name={"camera"}
                        type={"entypo"}
                        color={appColor.appbackground}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View>
                      <TouchableOpacity
                        style={styles.crossbtn}
                        onPress={() => {
                          let arr = [...dpimage];
                          arr.splice(index, 1);
                          setImage(arr);
                        }}
                      >
                        <Icon
                          name="cross"
                          type={"entypo"}
                          color={textColor.white}
                        />
                      </TouchableOpacity>
                      <Image source={{ uri: item }} style={styles.coverview} />
                    </View>
                  )}
                </View>
              );
            }}
          />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 15,
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.holdtext}>
            {"Hold, drag, and drop to reorder your photos"}
          </Text>
          <TouchableOpacity
            style={styles.buttons}
            disabled={loading}
            onPress={() => add_profile_images()}
          >
            {loading ? (
              <ActivityIndicator color={"white"} />
            ) : (
              <Text style={styles.continuetext}>Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default App;
