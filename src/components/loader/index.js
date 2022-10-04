import React, { Component } from "react";
import { Animated, Easing, Text, View, Image } from "react-native";
import { appImages } from "../../assets/utility";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { bggradientColor, textColor } from "../../constants/colors";

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(1),
    };
  }

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 1000,
          ease: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 1000,
          ease: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }

  render() {
    return (
      <Animated.View style={{ opacity: this.state.opacity }}>
        <View
          style={{
            height: responsiveHeight(100),
            width: responsiveWidth(100),
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: textColor.white,
          }}>
          <View
            style={{
              height: responsiveWidth(30),
              width: responsiveWidth(30),
              backgroundColor: bggradientColor.c1,
              borderRadius: responsiveWidth(30 / 2),
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Image
              source={appImages.ringIconblue2}
              style={{
                height: responsiveWidth(20),
                width: responsiveWidth(20),
                resizeMode:'contain'
              }}
            />
          </View>
        </View>
      </Animated.View>
    );
  }
}
