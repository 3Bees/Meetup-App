import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { styles } from "./style";
import { Icon } from "react-native-elements";
import PhoneInput from "react-native-phone-input";
import CodeInput from "react-native-code-input";
import RBSheet from "react-native-raw-bottom-sheet";

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { appColor, textColor } from "../../../constants/colors";
import { appImages } from "../../../assets/utility";

const ForgetPassword = (props) => {
  const [PhoneNum, setPhoneNum] = useState();
  const [flag, setFlag] = useState(true);
  const [flag1, setFlag1] = useState(true);

  const [code, setCode] = useState("");
  const refRBSheet = useRef();
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={appColor.appbackground}
        barStyle={"light-content"}
      />
      <View style={styles.subtitleview}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image source={appImages.cheveronback} />
        </TouchableOpacity>

        <Text style={styles.subtitle}>Reset Your Password</Text>
      </View>
      {flag ? (
        <View>
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
          <View style={styles.buttonsview}>
            <TouchableOpacity
              onPress={() => setFlag(false)}
              style={styles.buttons}
            >
              <Text style={styles.resettext}>Send Reset Code</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          {flag1 ? (
            <View>
              <View style={styles.confirmationtextview}>
                <Text style={styles.confirmationtext}>
                  Enter the 6 digit code sent to your phone number
                </Text>
              </View>
              <View style={styles.confirmationview}>
                <CodeInput
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
                />
              </View>
              <View style={styles.buttonsview11}>
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={() => setFlag1(false)}
                  style={styles.buttons}
                >
                  <Text style={styles.resettext}>Verify</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.newpasswordtextview}>
                <Text style={styles.newpasswordtext}>
                  Enter a new password for your account
                </Text>
              </View>
              <View style={styles.passwordview}>
                <Text style={styles.phoneInputlabel}>New Password</Text>
                <TextInput
                  style={styles.passwordinput}
                  secureTextEntry
                  placeholder="• • • • • • • • • • • • "
                  placeholderTextColor={textColor.white}
                ></TextInput>
              </View>
              <View style={styles.passwordview}>
                <Text style={styles.phoneInputlabel}>Confirm New Password</Text>
                <TextInput
                  style={styles.passwordinput}
                  secureTextEntry
                  placeholder="• • • • • • • • • • • • "
                  placeholderTextColor={textColor.white}
                ></TextInput>
              </View>
              <View style={styles.buttonsview1}>
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={() => refRBSheet.current.open()}
                >
                  <Text style={styles.resettext}>Reset Password</Text>
                </TouchableOpacity>
              </View>
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
                    height: responsiveHeight(40),
                  },
                  draggableIcon: {
                    backgroundColor: "white",
                  },
                }}
              >
                <View>
                  <View>
                    <Image
                      source={appImages.circlecheck}
                      style={styles.circlecheck}
                    />

                    <Text style={styles.passwordupdatedtext}>
                      Password Updated
                    </Text>
                    <Text style={styles.ContniueTxt}>
                      Tap continue to login with your new password
                    </Text>
                    <View style={styles.buttonsview1}>
                      <TouchableOpacity
                        style={styles.buttons1}
                        onPress={() => {
                          refRBSheet.current.close(),
                            props.navigation.navigate("Login");
                        }}
                      >
                        <Text style={styles.continuetologintext}>
                          Continue To Login
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </RBSheet>
            </View>
          )}
        </View>
      )}
    </View>
  );
};
export default ForgetPassword;
