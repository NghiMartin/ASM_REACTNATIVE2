import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";
import { AppImages } from "../../assets";
const height = Dimensions.get("window").height;
export default function SplashScreen() {
    return(
        <View style={styles.container}>
       <ImageBackground
        source={AppImages.splash_screen}
        style={styles.imageBackground}
        >
        </ImageBackground>
        </View>
    )
}
const  styles = StyleSheet.create({
    container: {
        height: height,
        width: '100%',
        alignItems: 'center',
        justifyContent:'center'
    },
    imageBackground: {
        width: 500,
        height: 500,
    }
})