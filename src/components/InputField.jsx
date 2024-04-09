import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTFAMILY } from '../assets'; 

export default function InputField  (props)  {
  const { placeholder, onChangeText, password, value, error , Icons  } = props;
  const [hidePassword, setHidePassword] = useState(password);

  return (
    <View>
      <View style={{ ...styles.container, borderColor: error ? COLORS.RED : COLORS.GRAY }}>
        <TextInput
          style={{ color: COLORS.GRAY, fontFamily: FONTFAMILY.poppins_regular, width: '100%' }}
          placeholderTextColor={COLORS.GRAY}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={hidePassword}
          value={value}
        />
        <View
            style={{ color: COLORS.GRAY, fontSize: 22, marginLeft: -30 }}
        >
        {password ? (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            size={20}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
          />
        ) : (Icons) }
        </View>
     
      </View>
      {error && (
        <Text style={styles.styleError}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    width: '100%',
    height: 48,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  styleError: {
    color: COLORS.RED,
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: 11,
  },
});
