import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTFAMILY, FONTSIZE } from "../assets";
import RowComponent from "./RowComponent";
import CustomButton from "./CustomButton";
import { AddSquare, MinusSquare } from "iconsax-react-native";
import CheckBox from "./CheckBox";
import { decreaseCart, increaseCart } from '../api/cart/cartApi';
import { useDispatch, useSelector } from 'react-redux';
export default function ItemCartProduct ({data, onPress, navigation, getData}) {
    const user = useSelector((state) => state.user);

    const handleIncreaseCart= async (idProduct)=> {
      const response =  await increaseCart({
            idUser: user?._id,
            idProduct: idProduct
        })
        await getData();
    }
    
    const handleDecreaseCart= async (idProduct)=> {
        const response = await decreaseCart({
            idUser: user?._id,
            idProduct: idProduct
        })
        await getData();
    }
    return (
        <View style={styles.container}>
            <CheckBox  />
            <Image
            source={{uri: data?.product?.image[0]}}
            style={styles.image}
            resizeMode="contain" /> 
            <View>
            <Text style={styles.title}>{data?.product?.name} | {data?.product?.size} </Text>
            <Text style={styles.price}>{data?.product?.price} đ </Text>
            <Text style={styles.status}>{data?.product?.status} </Text>
            <View>
            <RowComponent
               justify='space-between'
               key= {data.key}
            >
            <CustomButton
            isIcon={true}
            onPress={ () => handleDecreaseCart(data?.idProduct)}
            Icon={<MinusSquare
                size="32"
                color={COLORS.greenHex}
               />}
            />
            <Text>{data?.quantity}</Text>
            <CustomButton
            isIcon={true}
            onPress={ () => handleIncreaseCart(data?.idProduct)}
            Icon={<AddSquare
                size="32"
                color={COLORS.greenHex}
               />}
            />
                 <TouchableOpacity>
                <Text style={styles.btnDelete}>Xoá</Text>
            </TouchableOpacity>
            </RowComponent>
            </View>
            
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
        borderRadius: 20,
        marginHorizontal: 10,
        backgroundColor: '#eee'

    },
    title: {
        color: COLORS.primaryGreenHex,
        fontSize: FONTSIZE.size_16,
        fontFamily: FONTFAMILY.poppins_bold
    },
    price: {
        color: COLORS.primaryGreenHex,
        fontSize: FONTSIZE.size_16,
        fontFamily: FONTFAMILY.poppins_medium
    },
    status:{
        fontSize: FONTSIZE.size_16,
        fontFamily: FONTFAMILY.poppins_medium
    },
    btnDelete: {
        textDecorationLine: 'underline',
        fontFamily: FONTFAMILY.poppins_bold,
        color: COLORS.GRAY
    }
})