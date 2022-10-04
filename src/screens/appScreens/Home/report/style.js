import React from 'react';
import {
    StyleSheet
} from 'react-native'
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth
} from 'react-native-responsive-dimensions'
import { fontFamily } from '../../../../constants/fonts'
import { textColor, appColor } from '../../../../constants/colors'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: textColor.white,
    },
    headingtxt: {
        fontSize: responsiveFontSize(2),
        fontFamily: fontFamily.appTextBold,

    },
    headingviews: {
        paddingLeft: responsiveWidth(5),
        justifyContent: 'center',
        height: responsiveHeight(9),
        borderTopWidth: responsiveWidth(0.3),
        borderTopColor: textColor.lightgrey
    },
    btn: {
        flexDirection: 'row',
        borderTopWidth: responsiveWidth(0.3),
        paddingLeft: responsiveWidth(5),
        borderTopColor: textColor.lightgrey,
        height: responsiveHeight(8),
        alignItems: "center",
    },
    btntxt: {
        fontFamily: fontFamily.appTextMedium,
        color: "white",
        fontSize: responsiveFontSize(2.4),
    },
    submitbtn: {
        width: responsiveWidth(70),
        height: responsiveHeight(7),
        borderRadius: responsiveHeight(6),
        backgroundColor: textColor.secondary,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: responsiveHeight(30),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    ContniueTxt: {
        fontSize: responsiveFontSize(1.9),
        color: textColor.primary,
        textAlign: "center",
        marginTop: responsiveHeight(3),
        fontFamily: fontFamily.appTextRegular,
    },
    buttons1: {
        width: responsiveWidth(70),
        height: responsiveHeight(7),
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appColor.appbackground,
        borderRadius: responsiveWidth(7),
        marginTop: responsiveHeight(6),
        flexDirection: "row",
    },
    continuetologintext: {
        color: textColor.white,
        fontFamily: fontFamily.appTextBold,
        fontSize: responsiveFontSize(1.9),
    },
    circlecheck: {
        alignSelf: "center",
    },
    reportbtsheettxt: {
        fontSize: responsiveFontSize(2),
        fontFamily: fontFamily.appTextBold,
        marginTop: responsiveHeight(3),
        color: textColor.primary,
        textAlign: "center",
    }

})
