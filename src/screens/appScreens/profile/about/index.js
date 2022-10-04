import React, { useState, Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  FlatList,
  ImageBackground,
  Modal,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Easing
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
import {
  appColor,
  textColor,
  bggradientColor,
} from "../../../../constants/colors";
import Draggable from "react-native-draggable";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class App extends Component {
  constructor(props) {
    super(props)

    this.moveAnimation = new Animated.ValueXY({ x: responsiveWidth(42) - 9, y: 30 })


    this.state = {
      kiss: false,
      ditch: false,
      hitch: true,
      play: false,
      showKiss: true,
      showHitch: false,
      showDitch: false,
      dimensions: {
        windowHeight,
        windowWidth
      },
      animationValue: new Animated.Value(80),
      viewState: true,
      animationValue2: new Animated.Value(80),
      viewState2: true,
      animationValue3: new Animated.Value(79),
      viewState3: true,
      nextRoute: this.props.route.params.nextRoute
    }
  }

  toggleAnimation = () => {
    console.log(responsiveWidth(11));
    if (this.state.viewState == true) {

      Animated.parallel([
        Animated.timing(this.moveAnimation, {
          toValue: { x: responsiveWidth(11) === 41.25 ? 40.5 : 36.25, y: responsiveWidth(11) === 41.25 ? -61 : -75 },
          duration: 1000,
          useNativeDriver: false

        }),

        Animated.timing(this.state.animationValue, {
          toValue: windowHeight * 0.08,
          duration: 1000,

          useNativeDriver: false

        })

      ]).start(
        this.setState({ kiss: false }),

        this.moveAnimation2 = new Animated.ValueXY({ x: responsiveWidth(42) - 9, y: responsiveHeight(-3.5) }),


      )

    }
    setTimeout(() => {
      this.setState({ kiss: true, showKiss: false, showHitch: true })

    }, 2000);

  }

  toggleAnimation2 = () => {
    if (this.state.viewState2 == true) {

      Animated.parallel([
        Animated.timing(this.moveAnimation2, {
          toValue: { x: responsiveWidth(11) === 41.25 ? 282 : 286, y: responsiveWidth(11) === 41.25 ? -114 : -143 },
          duration: 1000,
          useNativeDriver: false

        }),

        Animated.timing(this.state.animationValue2, {
          toValue: windowHeight * 0.08,
          duration: 1000,
          useNativeDriver: false
        })


      ]).start(
        this.setState({ ditch: false }),
        this.moveAnimation3 = new Animated.ValueXY({ x: responsiveWidth(42) - 9, y: responsiveHeight(-10.5) })
      )

    }
    setTimeout(() => {
      this.setState({ ditch: true, showHitch: false, showDitch: true })

    }, 2000);

  }

  toggleAnimation3 = () => {

    if (this.state.viewState3 == true) {
      Animated.parallel([

        Animated.timing(this.moveAnimation3, {
          toValue: { x: responsiveWidth(11) === 41.25 ? 161 : 162.25, y: responsiveWidth(11) === 41.25 ? -168 : -211 },
          duration: 1000,
          useNativeDriver: false

        }),
        Animated.timing(this.state.animationValue3, {
          toValue: windowHeight * 0.08,
          duration: 1000,
          useNativeDriver: false
        }),
        // this.setState({ viewState3: false }, () => {

        // })

      ]).start(
        this.setState({ play: false })
      )

    }
    setTimeout(() => {
      this.setState({ play: true, showDitch: false })

    }, 2000);

  }


  render() {
    const animatedStyle = {
      width: this.state.animationValue,
      height: this.state.animationValue
    }
    const animatedStyle2 = {
      width: this.state.animationValue2,
      height: this.state.animationValue2
    }
    const animatedStyle3 = {
      width: this.state.animationValue3,
      height: this.state.animationValue3
    }

    return (
      <LinearGradient
        colors={[bggradientColor.c1, bggradientColor.c2]}
        style={styles.container}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={styles.LogoView}>
              <Image
                source={appImages.KName1}
                resizeMode="contain"
                style={styles.imageView}
              />

            </View>
            <View style={styles.textView}>
              <Text style={styles.textWelcome}>
                {
                  "Welcome to Keebo! On the game board, you will find three tokens. Match each token with a profile to complete the board."
                }
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: responsiveWidth(93),
              alignSelf: "center",
              alignItems: "center",
              marginTop: responsiveHeight(3),
            }}
          >
            <View style={{ marginRight: responsiveWidth(4) }}>
              <View style={styles.cardBack}>
                <View style={styles.iconView}>
                  <View style={styles.iconView2}>
                    <Icon
                      name="user"
                      type="font-awesome"
                      size={responsiveFontSize(9)}
                      color={appColor.appbackground}
                      style={{
                        marginVertical: responsiveWidth(2.5),
                        marginHorizontal: Platform.OS === 'android' ? responsiveWidth(4.5) : responsiveWidth(5.5),

                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={{ marginRight: responsiveWidth(4) }}>
              <View style={styles.cardBack}>
                <View style={styles.iconView}>
                  <View style={styles.iconView2}>
                    <Icon
                      name="user"
                      type="font-awesome"
                      size={responsiveFontSize(9)}
                      color={appColor.appbackground}
                      style={{
                        marginVertical: responsiveWidth(2.5),
                        marginHorizontal: Platform.OS === 'android' ? responsiveWidth(4.5) : responsiveWidth(5.5),
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={{}}>
              <View style={styles.cardBack}>
                <View style={styles.iconView}>
                  <View style={styles.iconView2}>
                    <Icon
                      name="user"
                      type="font-awesome"
                      size={responsiveFontSize(9)}
                      color={appColor.appbackground}
                      style={{
                        marginVertical: responsiveWidth(2.5),
                        marginHorizontal: Platform.OS === 'android' ? responsiveWidth(4.5) : responsiveWidth(5.5),

                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          {this.state.hitch ? (
            <Animated.View style={[styles.tennisBall, this.moveAnimation.getLayout(), animatedStyle]}
            >
              <TouchableWithoutFeedback style={styles.button} onPress={this.toggleAnimation}>
                <Image
                  source={appImages.lips}
                  style={styles.imageICon}
                  resizeMode="contain"
                />
              </TouchableWithoutFeedback>
            </Animated.View>
          ) : null}
          {
            this.state.kiss ? (
              <Animated.View style={[styles.tennisBall, this.moveAnimation2.getLayout(), , animatedStyle2]}>
                <TouchableWithoutFeedback style={styles.button} onPress={this.toggleAnimation2}>
                  <Image
                    resizeMode="contain"
                    source={appImages.daimondPic}
                    style={styles.imageICon}
                  />
                </TouchableWithoutFeedback>
              </Animated.View>
            ) : null
          }
          {
            this.state.ditch ? (
              <Animated.View style={[styles.tennisBall, this.moveAnimation3.getLayout(), animatedStyle3]}>
                <TouchableWithoutFeedback style={styles.button} onPress={this.toggleAnimation3}>
                  <Image
                    resizeMode="contain"
                    source={appImages.cross}
                    style={styles.imageICon2}
                  />
                </TouchableWithoutFeedback>
              </Animated.View>
            ) : null
          }
          <Text
            style={[{ alignSelf: 'center', position: 'absolute', fontSize: responsiveFontSize(3),fontFamily: fontFamily.appTextMedium }, this.state.showKiss ? styles.hitch : this.state.showDitch ? styles.kiss : styles.ditch]}>
            {this.state.showKiss ? 'Kiss' : this.state.showDitch ? 'Ditch' : this.state.showHitch ? 'Hitch' : null}
          </Text>

          {
            this.state.play === true && (
              <View style={[styles.textView, { marginTop: responsiveHeight(-22) }]}>
                <Text style={styles.textWelcome3}>{"Tapping on the left and right side of each profile card will go through photos."}</Text>
                <Text style={styles.textWelcome2}>{"Tapping on the info will bring up their full profile."}</Text>
                <Text style={styles.textWelcome3}>{"Don't forget to fill out your profile and have fun!"}</Text>

                <TouchableOpacity style={styles.playButton} onPress={() => this.state.nextRoute === 'App' ? this.props.navigation.navigate('App') : this.props.navigation.navigate('Home')}>
                  <Text style={styles.playtext}>LET'S PLAY</Text>
                </TouchableOpacity>
              </View>

            )
          }
          {/* <View style={{height: responsiveHeight(20)}}/> */}
        </ScrollView>
      </LinearGradient>
    );
  }
}
