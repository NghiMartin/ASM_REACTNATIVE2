import { Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTFAMILY, FONTSIZE } from "../assets"; 

export default function CheckBox({
    onPress,
    isCheckRemember,
    isShowName
}) {
    return(
        <TouchableOpacity onPress={onPress} style={{flexDirection: "row" ,   alignItems: "start", justifyContent: 'start'}}>
        { isCheckRemember ? (
          <Icon
            name="checkbox-outline"
            size={20}
            color={COLORS.primaryGreenHex}
          />
        ) : (
          <Icon name="square-outline" size={20} color="#666" />
        )}
     {  isShowName && <Text style={{marginLeft: 10, color: isCheckRemember ? COLORS.primaryGreenHex : 'grey' ,   fontFamily: FONTFAMILY.poppins_medium , fontSize: FONTSIZE.size_14}}>Remember account</Text>}
      </TouchableOpacity>
    )
}