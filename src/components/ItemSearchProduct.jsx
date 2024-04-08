import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS, FONTFAMILY, FONTSIZE } from "../assets";

export default function ItemSearchProduct ({data, onPress}) {
    return (
        <View style={styles.container}>
            <Image
            source={require('../assets/images/imgProduct.png')}
            style={styles.image}
            resizeMode="contain" /> 
            <View>
            <Text style={styles.title}>{data.name} | {data.size} </Text>
            <Text style={styles.title}>{data.price} đ </Text>
            <Text style={styles.status}>{data.status} </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 20
    },
    title: {
        color: COLORS.primaryGreenHex,
        fontSize: FONTSIZE.size_16,
        fontFamily: FONTFAMILY.poppins_bold
    },
    status:{
        fontSize: FONTSIZE.size_16,
        fontFamily: FONTFAMILY.poppins_medium

    }
})