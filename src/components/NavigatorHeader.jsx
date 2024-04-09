import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react'
import RowComponent from './RowComponent';
import { COLORS, FONTFAMILY, FONTSIZE } from '../assets';
import { ArrowLeft2 } from 'iconsax-react-native';

const NavigatorHeader = ({ iconLeft, title, iconRight, actionLeft, actionRight }) => {
    return (
        <RowComponent justify={ 'space-between'} styles={{width: '100%', paddingVertical: 10, paddingHorizontal: 10,
        }}>
            <TouchableOpacity style={[styles.imgContainer, {}]} onPress={actionLeft}>
            <ArrowLeft2 size="32" color={COLORS.BLACK}/>
            </TouchableOpacity>
            <Text style={styles.txt}>{title}</Text>
            <TouchableOpacity style={[styles.imgContainer, {}]} onPress={actionRight}>
                {!!iconRight &&
                    iconRight
                }
            </TouchableOpacity>
        </RowComponent>
    )
}

export default NavigatorHeader;

const styles = StyleSheet.create({
    txt: {
        fontSize: FONTSIZE.size_20,
        fontWeight: '500',
        color: 'black',
        textTransform: 'uppercase',
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.greenHex
    },
    icon: {
        width: 24,
        height: 24,
    },
    imgContainer: {
        width: 24,
        height: 24,
    },
})