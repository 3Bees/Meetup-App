import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { appImages } from "../../assets/utility";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { fontFamily } from "../../constants/fonts";

export default class MyComponent extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const { Notificationtype, text } = this.props

        return (
            <Animatable.View
                animation={'fadeInDownBig'}
                style={{
                    top: responsiveHeight(5.5),
                    elevation: 5,
                    shadowColor:Notificationtype === 'success' ?"#0384BB":'red',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    zIndex: 1,
                    position: 'absolute',
                    flexDirection: 'row',
                    width: '95%',
                    borderRadius: 8,
                    borderLeftWidth: 5,
                    borderLeftColor: Notificationtype === 'success' ? '#0384BB' : 'red',
                    height: responsiveHeight(12),
                    backgroundColor: 'white',
                    alignSelf: 'center',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                }}>
                <Image
                    style={{
                        marginLeft: responsiveWidth(0),
                        height: responsiveWidth(13),
                        width: responsiveWidth(13),
                        marginBottom: 2,
                    }}
                    source={ Notificationtype === 'success' ? require('../../assets/images/checked.png') : require('../../assets/images/cancel.png')}
                />
                <View style={{ width: responsiveWidth(62) }}>
                    <Text
                        style={{ color: 'gray', fontSize: responsiveFontSize(2), fontFamily: fontFamily.appTextRegular }}
                        ellipsizeMode={'tail'}
                        numberOfLines={1}>
                        {text}
                    </Text>
                </View>
                <View>
                    <AntDesign name={'close'} color={'transparent'} size={20} />
                </View>
            </Animatable.View>

        );
    }
}
