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
        flexDirection: "row",
        justifyContent: "space-between",
        width: responsiveWidth(90),
        alignSelf: "center",
        borderRadius: responsiveWidth(4),

        marginTop: responsiveHeight(3)
    },
    lable: {
        fontSize: responsiveFontSize(2),
        fontFamily: fontFamily.appTextRegular,
        color: textColor.primary,

    },
    button: {
        backgroundColor: textColor.secondary,
        width: responsiveWidth(70),
        height: responsiveHeight(7),
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: responsiveWidth(5),
        marginTop: responsiveHeight(40),

    },
    buttontxt: {
        fontFamily: fontFamily.appTextMedium,
        color: "white",
        fontSize: responsiveFontSize(2.4),
        textTransform:'uppercase'
    }
})