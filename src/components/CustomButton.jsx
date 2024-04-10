import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE } from '../assets';
import LinearGradient from 'react-native-linear-gradient';
export default function CustomButton({label, onPress, isIcon, Icon, style}) {
  return (
    <TouchableOpacity
    onPress={onPress}
    style={{
    alignItems: 'center'

    }}
  >
    {isIcon ? 
    (
      <View styles = {style}>
      {Icon}
      </View>
    ) :(
      <LinearGradient
          colors={[COLORS.primaryGreenHex, COLORS.greenHex]}
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.5, y: 1.0 }}
          style={styles.containerButton}
          >
        
            <Text
              style={styles.text}>
              {label}
            </Text>
          </LinearGradient>
    )}
  </TouchableOpacity>
 
  
 
  )
}
const styles = StyleSheet.create({
  containerButton: {
    padding: 20,
    borderRadius: BORDERRADIUS.radius_10,
    marginVertical: 20,
    width: 350,
  },
  text:{
    textAlign: 'center',
    fontWeight: '700',
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_medium,
    color: '#fff',
  }
})