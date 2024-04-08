import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTFAMILY } from '../assets'

export default function HomeHeader ({navigation}) {
    return(
        <View style={styles.header}>
        <View style={styles.mainHeader}>
          <Image source={require('../assets/images/imgHeader.png')} style={styles.imgMainHeader} />
          
        </View>
        <View style={styles.topHeader}>
          <Text style={styles.title}>Planta - toả sáng{`\n`}không gian nhà bạn</Text>
          <TouchableOpacity style={styles.imgHeader} onPress={() => navigation.navigate('Cart')}>
            <Image source={require('../assets/icons/cart.png')} style={{ width: 24, height: 24, margin: 11 }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.newProduct}>
            <Text style={styles.txtNewProduct}>Xem hàng mới về</Text>
            <Image source={require('../assets/icons/next.png')} />
          </TouchableOpacity>
        </View>
      </View>
    )
}


const styles = StyleSheet.create({
 
    txtNewProduct: {
      color: COLORS.primaryGreenHex,
      width: '100%',
      marginEnd: 4,
      fontSize: 16,
      fontFamily: FONTFAMILY.poppins_regular,
      fontWeight: '500',
      start: 25,
    },
    newProduct: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      top: 115,
    },
    imgMainHeader: {
      width: '100%',
      height: 205,
      marginTop: 69,
    },
    mainHeader: {
      width: '100%',
      flexDirection: 'column',
    },
    imgHeader: {
      position: 'absolute',
      width: 48,
      height: 46,
      borderRadius: 24,
      backgroundColor: '#fff',
      end: 0,
      top: 24,
      end: 25,
    },
    title: {
      fontSize: 23,
      fontWeight: '600',
      fontFamily: FONTFAMILY.poppins_medium,
      color: COLORS.BLACK,
      position: 'absolute',
      marginTop: 21,
      start: 25,
    },
    topHeader: {
      width: '100%',
      flexDirection: 'row',
      position: 'absolute',
      paddingHorizontal: 25,
      marginTop: 31,
    },
    header: {
      width: '100%',
      backgroundColor: '#F6F6F6'
    },
 
  })