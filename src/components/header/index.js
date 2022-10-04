import React from 'react'
import { TouchableOpacity, Text, View, Image, Platform } from 'react-native'
import { Icon } from 'react-native-elements'
import { StyleSheet } from 'react-native';
import { appColor, buttonColor, iconColor, textColor } from '../../constants/colors'
import { fontFamily } from '../../constants/fonts'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import { appImages } from '../../assets/utility'

export const Header = props => {
    const { backIcon, backIcontype, title, addicon, addIcontype, color, onpress, onPress1, done } = props
    return (
        <View style={{ backgroundColor: textColor.white }}>
            <View style={styles.mainview1}>
                {done?
                 <Icon
                 name={addicon}
                 type={addIcontype}
                 color={'transparent'}
                 size={responsiveFontSize(3.5)}
             />
             :
                    <TouchableOpacity
                        onPress={onpress}>
                        <Image source={appImages.cheveronbackblack} />
                    </TouchableOpacity>
                }
                <Text style={styles.txt}>
                    {title}
                </Text>
                {
                    done ?
                        <TouchableOpacity
                            onPress={onPress1}
                        >
                            <Text style={styles.doneText}>Done</Text>
                        </TouchableOpacity>
                        :

                        <TouchableOpacity
                            onPress={onPress1}
                        >
                            <Icon
                                name={addicon}
                                type={addIcontype}
                                color={color}
                                size={responsiveFontSize(3.5)}
                            />
                        </TouchableOpacity>
                }
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    mainview: {
        backgroundColor: appColor.secondary,
        flexDirection: 'row',
        paddingTop: responsiveHeight(2),
        alignItems: 'center',

    },
    mainview1: {
        flexDirection: 'row',
        paddingTop: Platform.OS === "ios" ? responsiveHeight(5) : responsiveHeight(3),
        paddingBottom: responsiveHeight(2),
        alignItems: 'center',
        width: responsiveWidth(90),
        justifyContent: 'space-between',
        alignSelf: 'center',

    },
    txt: {
        color: textColor.primary,
        fontFamily: fontFamily.appTextBold,
        fontSize: responsiveFontSize(2.5),
    },
    doneText: {
        fontSize: responsiveFontSize(2),
        fontFamily: fontFamily.appTextBold,
        color: textColor.secondary

    }
})

