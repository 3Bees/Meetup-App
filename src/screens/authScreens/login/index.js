import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  ImageBackground,
} from "react-native";
import { styles } from "./style";
import { Icon } from "react-native-elements";
import PhoneInput from "react-native-phone-input";
import { appImages } from "../../../assets/utility";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { appColor, textColor, theamColor } from "../../../constants/colors";
import { fontFamily } from "../../../constants/fonts";
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk-next";

const Login = (props) => {
  const [PhoneNum, setPhoneNum] = useState();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const facebook_login = () => {
    try {
      LoginManager.logInWithPermissions(["public_profile", "email"]).then(
        async (result) => {
          if (result.isCancelled) {
            console.log("Login cancelled");
          } else {
            const data = await AccessToken.getCurrentAccessToken();
            if (!data) {
              throw new Error(
                "Something went wrong obtaining the users access token"
              );
            }
            const credential = await auth.FacebookAuthProvider.credential(
              data.accessToken
            );
            try {
              const graphRequest = new GraphRequest(
                "/me",
                {
                  accessToken: data.accessToken,
                  parameters: {
                    fields: {
                      string: "picture.height(961)",
                    },
                  },
                },
                async (error, result) => {
                  console.log(error, "\n", result);
                  if (error) {
                    await auth()
                      .signInWithCredential(credential)
                      .then(async (user) => {
                        await saveData("Users", user.user.uid, {
                          email: user.user.email,
                          first_name:
                            user.additionalUserInfo.profile.first_name,
                          last_name: user.additionalUserInfo.profile.last_name,
                          profile_image: user.user.photoURL,
                          id: user.user.uid,
                        }).then(async () => {
                          await AsyncStorage.setItem("Token", user.user.uid);
                          props.navigation.navigate("App");
                        });
                      })
                      .catch(function (error) {
                        this.setState({ faceLoader: false });
                        alert(error.code + ": " + error.message);
                      });
                  } else {
                    console.log(result.picture);
                    await auth()
                      .signInWithCredential(credential)
                      .then(async (user) => {
                        await saveData("Users", user.user.uid, {
                          email: user.user.email,
                          first_name:
                            user.additionalUserInfo.profile.first_name,
                          last_name: user.additionalUserInfo.profile.last_name,
                          id: user.user.uid,
                          profile_image: result.picture.data.url,
                        }).then(async () => {
                          await AsyncStorage.setItem("Token", user.user.uid);
                          props.navigation.navigate("App");
                        });
                      })
                      .catch(function (error) {
                        Toast.show(error.message);
                      });
                  }
                }
              );

              new GraphRequestManager().addRequest(graphRequest).start();
            } catch (error) {
              Toast.show(error.message);
            }
          }
        },
        function (error) {
          Toast.show(error.message);
          // console.log("Login fail with error: " + error);
        }
      );
    } catch (e) {
      isLoading = false;
      this.setState({ faceLoader: false });
      this.setState({ isLoading });
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#25abd1"} barStyle={"light-content"} />
      {/* <Image source={appImages.LoginImg} style={styles.Logowhite1} />*/}
      <ImageBackground
        style={{
          width: responsiveWidth(100),
          height: responsiveHeight(100),
          resizeMode: "contain",
        }}
        source={appImages.splash2}
      >
        <Animatable.Image
          animation="fadeInUp"
          easing="ease-out"
          source={appImages.KName}
          style={styles.Logowhite2}
        />

        <Animatable.View
          animation="fadeIn"
          delay={1000}
          easing="ease-out"
          style={styles.buttonsview}
        >
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => facebook_login()}
          >
            <Image
              source={appImages.iconfb}
              style={{
                height: responsiveHeight(5),
                width: responsiveWidth(6),
                resizeMode: "contain",
              }}
            />
            <Text style={styles.buttonstext}>Continue with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => props.navigation.navigate("SignUp")}
          >
            <Image
              source={appImages.iconapple}
              style={{
                height: responsiveHeight(5),
                width: responsiveWidth(6),
                resizeMode: "contain",
              }}
            />
            <Text style={styles.buttonstext}>Continue with Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}>
            <Image
              source={appImages.icongoogle}
              style={{
                height: responsiveHeight(5),
                width: responsiveWidth(6),
                resizeMode: "contain",
              }}
            />

            <Text style={styles.buttonstext}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons2}
            onPress={() => props.navigation.navigate("SignUp")}
          >
            <Text style={styles.buttonstext2}>Continue with Phone</Text>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="fadeIn" delay={1000} easing="ease-out">
          <View style={styles.termstextview}>
            <Text style={styles.termstext}>
              Don’t worry! We never post to Facebook
            </Text>
          </View>
          <View style={styles.termsview}>
            <TouchableOpacity>
              <Text style={styles.terms}>{"Terms & Conditions"}</Text>
            </TouchableOpacity>
            <Text style={styles.termsdot}>•</Text>
            <TouchableOpacity>
              <Text style={styles.terms}>{"Privacy Policy"}</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ImageBackground>
    </View>
  );
};
export default Login;
