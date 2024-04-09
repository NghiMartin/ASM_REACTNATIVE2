import RowComponent from "./RowComponent";
import {Clock, CloseSquare} from 'iconsax-react-native';
import { Icon } from "react-native-vector-icons/MaterialCommunityIcons";
import CustomButton from "./CustomButton";
import { COLORS } from "../assets";
import { Text } from "react-native";
export default function ItemSearch ({data, onPressItem, onPressRemove}) {
    return (
        <RowComponent
        onPress={() => onPressItem(data)}
        styles= {{padding : 10}}
        justify='space-around'
      >
            <Clock size="32" color="#d9e3f0"/>
            <Text
            numberOfLines={1}
            style={{
               width: 150,
               textAlign: 'center'
            }}
          
            >
                {data.length < 25
              ? `${data}`
              : `${data.substring(0, 22)}...`}
            </Text>
            <CustomButton
            onPress={() => onPressRemove(data)}
             isIcon={true} 
             Icon={<CloseSquare
                size="32"
                color="#37d67a"
                variant="Outline"
               />} 
             />
        </RowComponent>
    )
} 