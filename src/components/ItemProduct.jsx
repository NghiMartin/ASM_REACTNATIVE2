import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE } from '../assets';
import CustomButton from './CustomButton';
import { AddSquare } from 'iconsax-react-native';
import { increaseCart } from '../api/cart/cartApi';
import { useDispatch, useSelector } from 'react-redux';

const RenderItems = ({ data, navigation }) => {
  const user = useSelector((state) => state.user);

const handleAddCart= async (idProduct,size,price)=> {
    await increaseCart({
        idUser: user?._id,
        idProduct: idProduct,
        size,
        price
    })
}
    return data.map(item => (
        <TouchableOpacity key={item?._id} style={styles.item} onPress={() => navigation.navigate('Panse', {product: item})}>
            <Image source={{uri: item.image[0]}} 
                style={styles.imgProduct}
                resizeMode='contain' />
            <Text style={styles.txtName}>{item?.name}</Text>
            <Text style={styles.txtType}>{item?.detailType || 'Ưa bóng'}</Text>
            <Text style={styles.txtPrice}>{item?.price + ' đ' || '250.000đ'}</Text>
            <View style={styles.btnAddCart}>
            <CustomButton
            isIcon={true}
            onPress={ () => handleAddCart(item?._id, item?.product?.size, item?.price)}
            Icon={<AddSquare
                size="32"
                color={COLORS.greenHex}
               />}
            />
            </View>
          
        </TouchableOpacity>
    ));
};
const ItemProduct = ({data, navigation}) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <RenderItems
                data={data}
                navigation={navigation} />
        </ScrollView>
    )
}

export default ItemProduct

const styles = StyleSheet.create({
    txtPrice: {
        color: COLORS.primaryGreenHex,
        fontWeight: '500',
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: 16,
        lineHeight: 22,
    },
    txtType: {
        color: '#7D7B7B',
        fontWeight: '400',
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: 14,
        lineHeight: 20,
    },
    txtName: {
        color: COLORS.BLACK,
        fontWeight: '500',
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        lineHeight: 22,
        marginTop: 4,
    },
    imgProduct: {
        width: 155,
        height: 134,
        borderRadius: 8,
        backgroundColor: '#eee'
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    item: {
        width: 155,
        height: 'auto',
        margin: 5,
        borderRadius: 8,
    },
    btnAddCart: {
        position: 'absolute',
        bottom: 0,
        right: 0
    }
})