import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../assets";
import RowComponent from "./RowComponent";
import CustomButton from "./CustomButton";
import { AddSquare, MinusSquare } from "iconsax-react-native";
import CheckBox from "./CheckBox";
import { decreaseCart, deleleByIdCart, increaseCart } from '../api/cart/cartApi';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
export default function ItemCartProduct ({data, handleIsCheckBox, handleUnCheckBox, onPress, navigation, getData}) {
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
    const handleDeleteCart= async (idProduct)=> {
        const response = await deleleByIdCart({
            idUser: user?._id,
            idProduct: idProduct
        })
        await getData();
    }


    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
      setShowModal(true);
    };
  
   

    const handleCancelDelete = () => {
      setShowModal(false);
    };

    const [isCheckbox, setisCheckbox] = useState(false);

    const handleIsCheckboxItem = () => {
        if(isCheckbox) {
           handleUnCheckBox(data?.idProduct);
           setisCheckbox(!isCheckbox);
        }else{
            handleIsCheckBox(data?.idProduct);
            setisCheckbox(!isCheckbox);
        }
       

    }


    return (
        <View style={styles.container}>
            <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}>
              Are you sure want to delete product from cart?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleDeleteCart(data?.idProduct)}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancelDelete}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
            <CheckBox isCheckbox={isCheckbox} onPress={handleIsCheckboxItem} />
            <Image
            source={{uri: data?.product?.image[0]}}
            style={styles.image}
            resizeMode="contain" /> 
            <View >
            <Text style={styles.title}>{data?.product?.name} | {data?.product?.size} </Text>
            <Text style={styles.price}>{Number(data?.product?.price).toLocaleString('vi-VN')} đ </Text>
            <Text style={styles.status}>{data?.product?.status} </Text>
            <View 
            style={styles.buttonsList}
            >
            <RowComponent
               justify='space-between'
               styles= {{width: '200'}}
           
            >
            <CustomButton
            isIcon={true}
            onPress={ () => handleDecreaseCart(data?.idProduct)}
            Icon={<MinusSquare
                size="32"
                color={COLORS.greenHex}
               />}
            />
            <Text
            style={styles.quantity}
            >{data?.quantity}</Text>
            <CustomButton
            isIcon={true}
            onPress={ () => handleIncreaseCart(data?.idProduct)}
            Icon={<AddSquare
                size="32"
                color={COLORS.greenHex}
               />}
            />
                 <TouchableOpacity
                 onPress={handleDelete}
                 >
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
    quantity: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14
    },
    buttonsList: {
        width: 150
    },
    status:{
        fontSize: FONTSIZE.size_16,
        fontFamily: FONTFAMILY.poppins_medium
    },
    btnDelete: {
        textDecorationLine: 'underline',
        fontFamily: FONTFAMILY.poppins_bold,
        color: COLORS.GRAY
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(227, 228, 230, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: COLORS.BLACK,
        padding: SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_10,
        alignItems: 'center',
        width: 350,
        height: 200,
        justifyContent: 'center'
      },
      modalMessage: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16,
        color: COLORS.WHITE,
        marginBottom: SPACING.space_20,
      },
      modalButtons: {
        flexDirection: 'row',
      },
      modalButton: {
        width: 100,
        alignItems: 'center',
        paddingVertical: SPACING.space_10,
        paddingHorizontal: SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_10,
        marginHorizontal: SPACING.space_10,
        backgroundColor: COLORS.primaryGreenHex,
      },
      modalButtonText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.WHITE,
      },
      cancelButton: {
        borderRadius: 10,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.WHITE,
      },
})