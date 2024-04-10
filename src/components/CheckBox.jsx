import { Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTFAMILY, FONTSIZE } from "../assets"; 
import { useState } from "react";

export default function CheckBox({
    onPress,
    isCheckbox,
    isShowName
}) {
    return(
        <TouchableOpacity onPress={onPress} style={{flexDirection: "row" ,   alignItems: "start", justifyContent: 'start'}}>
        { isCheckbox ? (
          <Icon
            name="checkbox-outline"
            size={20}
            color={COLORS.primaryGreenHex}
          />
        ) : (
          <Icon name="square-outline" size={20} color="#666" />
        )}
     {  isShowName && <Text style={{marginLeft: 10, color: isCheckbox ? COLORS.primaryGreenHex : 'grey' ,   fontFamily: FONTFAMILY.poppins_medium , fontSize: FONTSIZE.size_14}}>Remember account</Text>}
      </TouchableOpacity>
    )
}