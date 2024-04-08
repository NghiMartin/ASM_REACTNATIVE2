import RowComponent from "./RowComponent";
import {Clock, CloseSquare} from 'iconsax-react-native';
import { Icon } from "react-native-vector-icons/MaterialCommunityIcons";
import CustomButton from "./CustomButton";
import { COLORS } from "../assets";
import { Text } from "react-native";
export default function ItemSearch ({data, onPress}) {
    return (
        <RowComponent
        styles= {{padding : 10}}
        justify='space-around'
        key= {data.key}>
            <Clock size="32" color="#d9e3f0"/>
            <Text
            style={{
               textAlign: 'left'
            }}
            >{data.name || 'Null name'}</Text>
            <CustomButton
            onPress={onPress}
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