/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  appColor,
  buttonColor,
  iconColor,
  textColor,
  theamColor,
} from "../../constants/colors";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Icon } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { styles } from "./style";
import { appImages } from "../../assets/utility";
import Toast from "react-native-simple-toast";

const DateSelect = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(props.initialDate);
  }, [props]);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", moment(date).format("ll"));
    setDate(moment(date).format("ll"));
    props.getDate(moment(date).format("ll"));
    hideDatePicker();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={props.style}
      onPress={
        props.disabled
          ? () =>
              Toast.show(
                "Date of birth cannot be changed after 7 days of use",
                Toast.SHORT
              )
          : () => showDatePicker()
      }
    >
      <Text
        style={{
          color: date != "" ? textColor.primary : textColor.placholderColor,
          fontSize: responsiveFontSize(2),
          marginTop:
            Platform.OS === "ios"
              ? responsiveHeight(1.85)
              : responsiveHeight(1.5),
        }}
      >
        {date != "" ? date : "Date of Birth"}
      </Text>
      <View>
        <Icon
          name={"calendar-blank"}
          type={"material-community"}
          color={textColor.secondary}
        />
        {/* <Image
          source={appImages.calender}
          style={{ height: responsiveHeight(5), width: responsiveWidth(8) }}
        /> */}
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        // date={new Date()}
        // value={date}
        maximumDate={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        modalStyleIOS={{
          backgroundColor: "rgb(255,255,255)",
          right: 9,
          width: responsiveWidth(99),
          paddingHorizontal: responsiveWidth(2),
        }}
        display={Platform.OS === "ios" ? "spinner" : "spinner"}
      />
    </TouchableOpacity>
  );
};

const TimeSelect = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(props.initialDate);
  }, [props]);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", moment(date).format("hh:mm A"));
    setDate(moment(date).format("hh:mm A"));
    props.getDate(moment(date).format("hh:mm A"));
    hideDatePicker();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.dataPickerContainer}
      onPress={showDatePicker}
    >
      <Text
        style={{
          color: date != "" ? textColor.primary : textColor.placholderColor,
        }}
      >
        {date != "" ? date : props.placeHolder}
      </Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        // date={new Date()}
        // value={date}
        maximumDate={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        modalStyleIOS={{ backgroundColor: "rgb(255,255,255)" }}
        display={Platform.OS === "ios" ? "spinner" : "spinner"}
      />
    </TouchableOpacity>
  );
};

export { DateSelect, TimeSelect };
