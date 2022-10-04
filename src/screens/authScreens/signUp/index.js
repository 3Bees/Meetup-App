import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { styles } from "./style";
import { Icon } from "react-native-elements";
import PhoneInput from "react-native-phone-input";
import { buttonColor } from "../../../constants/colors";
import RBSheet from "react-native-raw-bottom-sheet";
import { _storeData } from "../../../Backend/AsyncFuncs";
import Toast from "react-native-simple-toast";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { appColor, textColor } from "../../../constants/colors";
import { appImages } from "../../../assets/utility";
import auth from "@react-native-firebase/auth";
import { saveData, uniqueID } from "../../../Backend/utility";
import COLLECTIONS from "../../../Backend/collecctions";
import AS_KEYS from "../../../constants/asynckeys";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import SCREENS from "../../../route/authStack/screens";

const SignUp = (props) => {
  const [PhoneNum, setPhoneNum] = useState();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [confirmResult, setConfirmResult] = useState({});
  const refRBSheet = useRef();

  const sendVerificationCode = async () => {
    var model = {
      email: "",
      name: "",
      profile_image: "",
      id: uniqueID(),
      mobile: "",
    };
    model.mobile = PhoneNum;
    // await saveData(COLLECTIONS.USERS, model.id, model).then(async () => {
    //   await AsyncStorageLib.setItem(AS_KEYS.TOKEN, model.id);
    //   Toast.show("Sign Up Sucessfull", Toast.SHORT);
    //   props.navigation.navigate(SCREENS.EDIT_PROFILE);
    // });
    () => refRBSheet.current.open();
    await auth()
      .signInWithPhoneNumber(PhoneNum.trim())
      .then((confirm) => {
        console.log("confirm", confirm);
        setConfirmResult(confirm);
        refRBSheet.current.open();
        // props.navigation.navigate("PhoneSignUpVerify", {
        //   confirmResult: confirmResult,
        //   PhoneNum: PhoneNum,
        // });
        // data: dataObj,
      })
      .catch((error) => {
        Toast.show(error.message);
        console.log(error);
      });
  };
  //

  //
  return (
    <View style={styles.container}>
      <View style={styles.subtitleview}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image source={appImages.cheveronback} />
        </TouchableOpacity>
        <Text style={styles.subtitle}>Phone Verification</Text>
        <View style={{ width: 25 }} />
      </View>
      <Text style={styles.subtitle1}>Enter your phone number</Text>

      <View style={styles.PhoneInputview}>
        <Text style={styles.phoneInputlabel}> Phone Number</Text>
        <View style={styles.phoneInput}>
          <Icon
            style={styles.phoneInputicon}
            name="chevron-small-down"
            type="entypo"
            color={textColor.white}
            size={20}
          />
          <PhoneInput
            onChangePhoneNumber={(number) => setPhoneNum(number)}
            value={PhoneNum}
            initialCountry="us"
            textProps={{
              placeholder: "5553525451",
            }}
            textStyle={styles.PhoneInputtext}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttons1}
        onPress={() => sendVerificationCode()}
      >
        <Text style={styles.continuetologintext}>Continue</Text>
      </TouchableOpacity>
      <View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={responsiveHeight(45)}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0,0.3)",
            },
            container: {
              borderTopRightRadius: responsiveWidth(10),
              borderTopLeftRadius: responsiveWidth(10),
              elevation: 2,
            },
            draggableIcon: {
              backgroundColor: textColor.white,
              width: responsiveWidth(40),
            },
          }}
        >
          <View>
            <View>
              <Image
                source={appImages.circlecheck}
                style={styles.circlecheck}
              />
              <View style={styles.rbtextsview}>
                <Text style={styles.passwordupdatedtext}>
                  Verification Code Sent
                </Text>
                <Text style={styles.ContniueTxt}>
                  {`A six digit verification code has been sent to your phone ${PhoneNum}`}
                </Text>
                <Text style={styles.ContniueTxt1}>
                  Tap continue to enter code
                </Text>
              </View>
              <View style={styles.buttonsview1}>
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={() => {
                    refRBSheet.current.close();
                    props.navigation.navigate("Verfication", {
                      confirmResult: confirmResult,
                      PhoneNum: PhoneNum,
                    });
                  }}
                >
                  <Text style={styles.continuetext}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </RBSheet>
      </View>
    </View>
  );
};
export default SignUp;
