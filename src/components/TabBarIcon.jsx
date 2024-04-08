import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

const TabBarIcon = ({ image, focus }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={image} />
            {focus && <View style={styles.focus}></View>}
        </View>
    )
}

export default TabBarIcon

const styles = StyleSheet.create({
    focus: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'black',
        marginTop: 2,
    },
    image: {
        width: 24,
        height: 24,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    }
})