import React, { useEffect, useReducer, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  StatusBar,
} from "react-native";
import { Header } from "../../../../components/header";
import styles from "./style";
import MapView from "react-native-maps";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { appColor, textColor } from "../../../../constants/colors";
import { Button } from "react-native-elements/dist/buttons/Button";
import COLLECTIONS from "../../../../Backend/collecctions";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import AS_KEYS from "../../../../constants/asynckeys";
import { getData, saveData } from "../../../../Backend/utility";

export default function index(props) {
  const [zipCode, setZipCode] = useState("");
  const [user, setUser] = useState({});
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    get();
  }, []);
  const get = async () => {
    const uid = await AsyncStorageLib.getItem(AS_KEYS.TOKEN);

    const usr = await getData(COLLECTIONS.USERS, uid);
    setUser(usr);
    const { latitude, longitude } = usr.location;
    setLatitude(latitude);
    setLongitude(longitude);
  };

  function getCoordinates(address) {
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        address +
        "&key=" +
        "AIzaSyAbR-CSoWYwy6JgghOMegO2iZRFzgG3kBo"
    )
      .then((response) => response.json())
      .then(({ results }) => {
        if (results) {
          if (results.length > 0) {
            const latitude = results[0].geometry.location.lat;
            const longitude = results[0].geometry.location.lng;
            var usr = user;
            usr.location = {
              latitude: latitude,
              longitude: longitude,
            };
            setLatitude(latitude);
            setLongitude(longitude);

            setUser(usr);
          }
        }
      });
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={textColor.white} />

      <Header
        title={"Change Location"}
        onpress={() => props.navigation.goBack()}
        backIcon={"arrow-back-ios"}
        backIcontype={"material"}
        addicontype={"material"}
      />

      <View style={styles.zipView}>
        <Text style={styles.zipTxt}>Enter Zip Code</Text>
        <TextInput
          placeholder="12345"
          style={styles.inputView}
          onChangeText={(text) => {
            setZipCode(text);
            getCoordinates(text);
          }}
        />
      </View>

      <View style={styles.map}>
        <MapView
          style={{ ...StyleSheet.absoluteFillObject }}
          key={user.location}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />

        <TouchableOpacity
          style={styles.btnView}
          onPress={() => {
            fetch(
              "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                latitude +
                "," +
                longitude +
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

                var usr = user;
                usr.city = city;
                usr.country = country;
                setUser(usr);

                saveData(COLLECTIONS.USERS, user.id, usr).then(() => {
                  props.navigation.goBack();
                });
              });
          }}
        >
          <Text style={styles.btnTxt}>UPDATE LOCATION</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
