import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react'
import RowComponent from './RowComponent';
import { FONTSIZE } from '../assets';

const NavigatorHeader = ({ iconLeft, title, iconRight, style, actionLeft, actionRight }) => {
    return (
        <RowComponent justify={ 'space-between'} styles={{width: '100%', paddingVertical: 10}}>
            <TouchableOpacity style={[styles.imgContainer, {}]} onPress={actionLeft}>
                {!!iconLeft && iconLeft}
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
        fontFamily: 'Lato',
        // lineHeight: 20,
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