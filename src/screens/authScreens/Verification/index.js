import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import { styles } from "./style";
import { Icon } from "react-native-elements";
import CodeInput from "react-native-code-input";
import RBSheet from "react-native-raw-bottom-sheet";
import PhoneInput from "react-native-phone-input";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-simple-toast";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { appColor, textColor } from "../../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getData,
  getDataWhere,
  saveData,
  uniqueID,
} from "../../../Backend/utility";
import AS_KEYS from "../../../constants/asynckeys";
import SCREENS from "../../../route/authStack/screens";
import COLLECTIONS from "../../../Backend/collecctions";
const Verfication = ({ navigation, route }) => {
  // const { params } = route;
  const [PhoneNum, setPhoneNum] = useState("");
  const [flag, setFlag] = useState(true);
  const [flag1, setFlag1] = useState(true);
  const [confirm, setConfirm] = useState(null);
  const [user, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const refRBSheet = useRef();

  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const CELL_COUNT = 6;

  useEffect(() => {
    // auth().onAuthStateChanged((user) => {
    //   console.log('AUTH STATE CHANGE USER', user)
    //   if (user) {
    //     getData('Users', user.uid).then((data) => {
    //       if (data) {
    //         AsyncStorage.setItem('Token', user.uid)
    //         navigation.navigate('App')
    //       }
    //       else {
    //         navigation.navigate("EditProfile", { phone: route.params.PhoneNum, uid: user.uid });
    //       }
    //     })
    //   }
    // });
  }, []);

  const verify_code = async () => {
    const { confirmResult, PhoneNum } = route.params;

    if (value != null) {
      console.log(
        "🚀 ~ file: index.js ~ line 72 ~ constverify_code= ~ value",
        value
      );
      setIsLoading(true);
      if (value.length == 6) {
        confirmResult
          .confirm(value.toString())
          .then(async (user) => {
            var userId = uniqueID();

            await getDataWhere(COLLECTIONS.USERS, "phone", "==", PhoneNum).then(
              async (data) => {
                if (data) {
                  if (data.blocked != undefined && data.blocked == true) {
                    Alert.alert(
                      "Account Blocked",
                      "Your account has been blocked by the admin for multiple flags",
                      [
                        {
                          text: "OK",
                          onPress: () => {},
                        },
                      ],
                      { cancelable: false }
                    );
                  } else {
                    setIsLoading(false);
                    await AsyncStorage.setItem(AS_KEYS.TOKEN, data.id);
                    if (
                      data.hasOwnProperty("name") &&
                      data.hasOwnProperty("date_of_birth")
                    ) {
                      navigation.navigate("App");
                    } else {
                      navigation.navigate(SCREENS.EDIT_PROFILE);
                    }
                    Toast.show(
                      "You have been successfully logged in",
                      Toast.SHORT
                    );
                  }
                } else if (data == false) {
                  await saveData(COLLECTIONS.USERS, userId, {
                    phone: PhoneNum,
                    id: userId,
                  }).then(async () => {
                    setIsLoading(false);
                    await AsyncStorage.setItem(AS_KEYS.TOKEN, userId);
                    navigation.navigate(SCREENS.EDIT_PROFILE);
                    Toast.show(
                      "You have been successfully Signed Up",
                      Toast.SHORT
                    );
                  });
                }
              }
            );
          })
          .catch((error) => {
            setIsLoading(false);
            Toast.show(error.message);
          });
      } else {
        setIsLoading(false);
        Toast.show("Please enter a 6 digit OTP code.");
      }
    } else {
      Toast.show("Please enter a 6 digit OTP code.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={appColor.appbackground}
        barStyle={"light-content"}
      />
      {isLoading ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            flex: 1,
          }}
        >
          <ActivityIndicator color={"white"} size="large" />
        </View>
      ) : (
        //
        <>
          <View style={styles.subtitleview}>
            <Text style={styles.subtitle}>Verify Phone Number</Text>
          </View>

          <View style={styles.confirmationtextview}>
            <Text style={styles.confirmationtext}>
              Enter the 6 digit code sent to your phone number
            </Text>
          </View>
          <View
            style={[
              styles.confirmationview,
              { marginHorizontal: responsiveWidth(5) },
            ]}
          >
            <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
            {/* <CodeInput
              keyboardType="numeric"
              codeLength={6}
              className={"border-b"}
              activeColor={textColor.white}
              autoFocus={false}
              ignoreCase={true}
              cellBorderWidth={responsiveWidth(0.3)}
              space={responsiveWidth(2)}
              size={responsiveWidth(12)}
              inputPosition="center"
              onFulfill={(code) => {
                setCode(code);
              }}
              containerStyle={{ marginBottom: responsiveHeight(1) }}
              codeInputStyle={{
                elevation: 5,

                backgroundColor: appColor.appbackground,
                borderWidth: responsiveWidth(0.3),
                borderColor: textColor.white,
                borderRadius: responsiveWidth(4),
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
              }}
            /> */}
          </View>
          <View style={styles.buttonsview}>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => verify_code()}
            >
              {isLoading ? (
                <ActivityIndicator size="large" color="red" />
              ) : (
                <Text style={styles.verifytext}>Verify</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.reconfirmview}>
            <Text style={styles.reconfirmtext}>Didn’t receive the code?</Text>
            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
              <Text style={styles.reconfirmtext1}>Resend Code</Text>
            </TouchableOpacity>
          </View>
          <View>
            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={true}
              customStyles={{
                wrapper: {
                  backgroundColor: "rgba(0,0,0,0.3)",
                },
                container: {
                  borderTopLeftRadius: responsiveWidth(10),
                  borderTopRightRadius: responsiveWidth(10),
                  height: responsiveHeight(35),
                },
                draggableIcon: {
                  backgroundColor: "white",
                },
              }}
            >
              <View>
                <View>
                  <View style={styles.rbtextsview}>
                    <Text style={styles.passwordupdatedtext}>
                      Update Phone Number
                    </Text>
                  </View>
                  <View style={styles.PhoneInputview}>
                    <Text style={styles.phoneInputlabel}> Phone Number</Text>
                    <View style={styles.phoneInput}>
                      <Icon
                        style={styles.phoneInputicon}
                        name="chevron-small-down"
                        type="entypo"
                        color={appColor.appbackground}
                        size={20}
                      />
                      <PhoneInput
                        onChangePhoneNumber={(number) => setPhoneNum(number)}
                        value={PhoneNum}
                        // initialCountry="us"
                        initialValue={PhoneNum.toString()}
                        textStyle={styles.PhoneInputtext}
                      />
                    </View>
                  </View>
                  <View style={styles.buttonsview1}>
                    <TouchableOpacity
                      style={styles.buttons1}
                      onPress={async () => {
                        refRBSheet.current.close();
                        await sendOTP();
                      }}
                    >
                      <Text style={styles.continuetext}>Update</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </RBSheet>
          </View>
        </>
        //
      )}
    </View>
  );
};
export default Verfication;
