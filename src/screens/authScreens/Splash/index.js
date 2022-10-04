import React, { useState, useEffect } from "react";
import {
  Text,
  StatusBar,
  View,
  ImageBackground,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { styles } from "./style";
import { appColor, textColor } from "../../../constants/colors";
import { appImages } from "../../../assets/utility";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import * as Animatable from "react-native-animatable";
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  Settings,
} from "react-native-fbsdk-next";
import {
  getData,
  getDataWhere,
  saveData,
  uniqueID,
} from "../../../Backend/utility";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import appleAuth, {
  AppleButton,
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from "@invertase/react-native-apple-authentication";
import { logout } from "../../../Backend/auth";
import Toast from "react-native-simple-toast";
import SCREENS from "../../../route/authStack/screens";
import AS_KEYS from "../../../constants/asynckeys";
import COLLECTIONS from "../../../Backend/collecctions";
import utils from "./utils";

const Splash = (props) => {
  const [flag, setFlag] = useState(false);
  const startValue = new Animated.Value(responsiveHeight(30));
  const endValue = 0;
  const duration = 1000;

  const [loadingFacebook, setLoadingFacebook] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingApple, setLoadingApple] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "258425632109-a1lckhu4i4rqd2to2qbgkqm5dag0k0ib.apps.googleusercontent.com",

      // offlineAccess: true,
    });
    Settings.setAppID("344438541077537");
    Settings.initializeSDK();
    Animated.timing(startValue, {
      toValue: endValue,
      duration: duration,
      useNativeDriver: true,
      delay: 2000,
    }).start(() => {
      setFlag(true);
    });

    AsyncStorage.getItem(AS_KEYS.TOKEN).then((token) => {
      console.log(token);
      if (token) {
        props.navigation.navigate("App");
      } else {
        logout();
      }
    });
  }, []);

  const google_login = async () => {
    setLoadingGoogle(true);
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const userInfo = await GoogleSignin.signIn();

      const credential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken
      );
      await auth()
        .signInWithCredential(credential)
        .then(async (user) => {
          console.log("🚀 ~ file: index.js ~ line 108 ~ .then ~ user", user);
          await getDataWhere(
            COLLECTIONS.USERS,
            "email",
            "==",
            user.user.email
          ).then(async (data) => {
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
                setLoadingGoogle(false);
                await AsyncStorage.setItem(AS_KEYS.TOKEN, data.id);
                props.navigation.navigate("App");
                Toast.show("You have been successfully logged in", Toast.SHORT);
              }
            } else if (data == false) {
              var userId = uniqueID();

              await saveData(COLLECTIONS.USERS, userId, {
                email: user.user.email,
                name: user.user.displayName,
                user_images: [user.user.photoURL],
                id: userId,
              }).then(async () => {
                setLoadingGoogle(false);
                await AsyncStorage.setItem(AS_KEYS.TOKEN, userId);
                await AsyncStorage.setItem(
                  AS_KEYS.USER_PICTURES,
                  JSON.stringify([user.user.photoURL])
                );
                props.navigation.navigate(SCREENS.EDIT_PROFILE);
                Toast.show(utils.signUpToast, Toast.SHORT);
              });
            }
          });
        })
        .catch(function (error) {
          // success = false;
          setLoadingGoogle(false);
          Toast.show(error.code + ": " + error.message);
        });
    } catch (error) {
      setLoadingGoogle(false);
      console.log(error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User Cancelled the Login Flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Signing In");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Toast.show("Play services are not available at the moment");
      } else {
        Toast.show(error.message);
        console.log(
          "🚀 ~ file: index.js ~ line 155 ~ constgoogle_login= ~ error",
          error
        );
        // this._getCurrentUserInfo()
      }
    }
  };
  const apple_login = async () => {
    setLoadingApple(true);
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    if (!appleAuthRequestResponse.identityToken) {
      Toast.show("Apple Sign-In failed - no identify token returned");
    }
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce
    );
    await auth()
      .signInWithCredential(appleCredential)
      .then(async (user) => {
        let str = user.user.email.split("@")[0];
        var userId = uniqueID();
        await getDataWhere(
          COLLECTIONS.USERS,
          "email",
          "==",
          user.user.email
        ).then(async (data) => {
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
              setLoadingApple(false);
              await AsyncStorage.setItem(AS_KEYS.TOKEN, data.id);
              props.navigation.navigate("App");
              Toast.show("You have been successfully logged in", Toast.SHORT);
            }
          } else if (data == false) {
            await saveData(COLLECTIONS.USERS, userId, {
              email: user.user.email,
              name: str,
              user_images: [
                "https://cdn3.iconfinder.com/data/icons/picons-social/57/56-apple-512.png",
              ],
              id: userId,
            }).then(async () => {
              setLoadingApple(false);
              await AsyncStorage.setItem(AS_KEYS.TOKEN, userId);
              await AsyncStorage.setItem(
                AS_KEYS.USER_PICTURES,
                JSON.stringify([
                  "https://cdn3.iconfinder.com/data/icons/picons-social/57/56-apple-512.png",
                ])
              );
              props.navigation.navigate(SCREENS.EDIT_PROFILE);
              Toast.show(utils.signUpToast, Toast.SHORT);
            });
          }
        });
      })
      .catch(function (error) {
        Toast.show(error.code + ": " + error.message);
        setLoadingApple(false);
      });
  };

  const facebook_login = () => {
    setLoadingFacebook(true);
    try {
      LoginManager.logInWithPermissions(["public_profile", "email"]).then(
        async (result) => {
          if (result.isCancelled) {
            setLoadingFacebook(false);
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
              var userId = uniqueID();

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
                        await getDataWhere(
                          COLLECTIONS.USERS,
                          "email",
                          "==",
                          user.user.email
                        ).then(async (data) => {
                          if (data) {
                            if (
                              data.blocked != undefined &&
                              data.blocked == true
                            ) {
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
                              setLoadingFacebook(false);
                              await AsyncStorage.setItem(
                                AS_KEYS.TOKEN,
                                data.id
                              );
                              props.navigation.navigate("App");
                              Toast.show(
                                "You have been successfully logged in",
                                Toast.SHORT
                              );
                            }
                          } else if (data == false) {
                            await saveData(COLLECTIONS.USERS, userId, {
                              email: user.user.email,
                              name: `${user.additionalUserInfo.profile.first_name} ${user.additionalUserInfo.profile.last_name}`,
                              user_images: [user.user.photoURL],
                              id: userId,
                            }).then(async () => {
                              setLoadingFacebook(false);
                              await AsyncStorage.setItem(AS_KEYS.TOKEN, userId);
                              await AsyncStorage.setItem(
                                AS_KEYS.USER_PICTURES,
                                JSON.stringify([user.user.photoURL])
                              );
                              props.navigation.navigate(SCREENS.EDIT_PROFILE);
                              Toast.show(utils.signUpToast, Toast.SHORT);
                            });
                          }
                        });
                      })
                      .catch(function (error) {
                        setLoadingFacebook(false);
                        Toast.show(error.message);
                      });
                  } else {
                    console.log(result.picture);
                    await auth()
                      .signInWithCredential(credential)
                      .then(async (user) => {
                        await getDataWhere(
                          COLLECTIONS.USERS,
                          "email",
                          "==",
                          user.user.email
                        ).then(async (data) => {
                          if (data) {
                            if (
                              data.blocked != undefined &&
                              data.blocked == true
                            ) {
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
                              setLoadingFacebook(false);
                              await AsyncStorage.setItem(
                                AS_KEYS.TOKEN,
                                data.id
                              );
                              props.navigation.navigate("App");
                              Toast.show(
                                "You have been successfully logged in",
                                Toast.SHORT
                              );
                            }
                          } else if (data == false) {
                            await saveData(COLLECTIONS.USERS, userId, {
                              email: user.user.email,
                              name: `${user.additionalUserInfo.profile.first_name} ${user.additionalUserInfo.profile.last_name}`,
                              user_images: [user.user.photoURL],
                              id: userId,
                            }).then(async () => {
                              setLoadingFacebook(false);
                              await AsyncStorage.setItem(AS_KEYS.TOKEN, userId);
                              await AsyncStorage.setItem(
                                AS_KEYS.USER_PICTURES,
                                JSON.stringify([user.user.photoURL])
                              );
                              props.navigation.navigate(SCREENS.EDIT_PROFILE);
                              Toast.show(utils.signUpToast, Toast.SHORT);
                            });
                          }
                        });
                      })
                      .catch(function (error) {
                        setLoadingFacebook(false);
                        Toast.show(error.message);
                      });
                  }
                }
              );

              new GraphRequestManager().addRequest(graphRequest).start();
            } catch (error) {
              setLoadingFacebook(false);
              Toast.show(error.message);
            }
          }
        },
        function (error) {
          setLoadingFacebook(false);
          Toast.show(error.message);
          // console.log("Login fail with error: " + error);
        }
      );
    } catch (e) {
      setLoadingFacebook(false);
      isLoading = false;
      this.setState({ faceLoader: false });
      this.setState({ isLoading });
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={textColor.secondary}
        barStyle={"light-content"}
      />

      <ImageBackground
        style={{
          width: responsiveWidth(100),
          height: responsiveHeight(100),
          resizeMode: "contain",
        }}
        source={appImages.splash2}
      >
        <Animated.Image
          style={[
            styles.Logowhite2,
            {
              transform: [
                {
                  translateY: startValue,
                },
              ],
            },
          ]}
          source={appImages.KName}
          //  style={styles.Logowhite2}
        />

        {!flag ? null : (
          <>
            <Animatable.View
              animation="fadeIn"
              delay={200}
              easing="ease-out"
              style={styles.buttonsview}
            >
              <TouchableOpacity
                style={styles.buttons}
                // onPress={() => props.navigation.navigate("About",{nextRoute:'App'})}
                onPress={() => facebook_login()}
              >
                {loadingFacebook ? (
                  <ActivityIndicator color="black" />
                ) : (
                  <>
                    <Image
                      source={appImages.iconfb}
                      style={{
                        height: responsiveHeight(5),
                        width: responsiveWidth(6),
                        resizeMode: "contain",
                      }}
                    />
                    <Text style={styles.buttonstext}>
                      Continue with Facebook
                    </Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => apple_login()}
              >
                {loadingApple ? (
                  <ActivityIndicator color="black" />
                ) : (
                  <>
                    <Image
                      source={appImages.iconapple}
                      style={{
                        height: responsiveHeight(5),
                        width: responsiveWidth(6),
                        resizeMode: "contain",
                      }}
                    />
                    <Text style={styles.buttonstext}>Continue with Apple</Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => google_login()}
              >
                {loadingGoogle ? (
                  <ActivityIndicator color="black" />
                ) : (
                  <>
                    <Image
                      source={appImages.icongoogle}
                      style={{
                        height: responsiveHeight(5),
                        width: responsiveWidth(6),
                        resizeMode: "contain",
                      }}
                    />
                    <Text style={styles.buttonstext}>Continue with Google</Text>
                  </>
                )}
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
          </>
        )}
      </ImageBackground>
    </View>
  );
};
export default Splash;
