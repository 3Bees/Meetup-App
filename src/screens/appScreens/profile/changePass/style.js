import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions'
import { textColor, buttonColor } from '../../../../constants/colors'
import { fontFamily } from '../../../../constants/fonts'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: textColor.white
    },
    lineview: {
        height: responsiveHeight(0.1),
        width: responsiveWidth(100),
        backgroundColor: textColor.lightgrey
    },
    TextInpute: {
        height: responsiveHeight(10),
        width: responsiveWidth(90),
        alignSelf: "center",
        borderRadius: responsiveWidth(4),
        borderWidth: responsiveWidth(0.3),
        borderColor: textColor.lightgrey,
        marginTop: responsiveHeight(3)
    },
    lable: {
        fontSize: responsiveFontSize(1.5),
        fontFamily: fontFamily.appTextBold,
        color: textColor.secondary,
        paddingTop: responsiveWidth(2),
        marginLeft: responsiveWidth(3)
    },
    button: {
        backgroundColor: textColor.secondary,
        width: responsiveWidth(65),
        height: responsiveHeight(7),
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: responsiveWidth(5),
        marginTop: Platform.OS === 'android' ? responsiveHeight(40) : responsiveHeight(10),

    },
    buttontxt: {
        fontFamily: fontFamily.appTextMedium,
        color: "white",
        fontSize: responsiveFontSize(2.4),
        textTransform: 'uppercase'
    }
})