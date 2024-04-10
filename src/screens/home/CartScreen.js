import { useEffect, useState } from "react";
import { Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { deleleAllByIdCart, deleleByIdCart, getAllCart } from "../../api/cart/cartApi";
import {useSelector} from "react-redux";
import ItemCartProduct from "../../components/ItemCartProduct";
import NavigatorHeader from "../../components/NavigatorHeader";
import { ArrowLeft2, Trash } from "iconsax-react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../assets";
import PaymentFooter from "../../components/PaymentFooter";
import { getTotalPrice } from "../../utils/getTotalPrice";
export default function CartScreen ({navigation}) {
    const user = useSelector((state) => state.user);
    console.log({user});
    const [dataAll, setDataAll] = useState(null);
    const [arrayIdProductCheckBox, setarrayIdProductCheckBox] = useState([]); // array save into all Id isCheckbox to Delete
    console.log({arrayIdProductCheckBox});

    //Checkbox 
    const handleIsCheckBox = (idProduct) => {
        if (!arrayIdProductCheckBox.includes(idProduct)) {
            setarrayIdProductCheckBox([...arrayIdProductCheckBox, idProduct]);
          }
    }
    const handleUnCheckBox = (idProduct) => {
      setarrayIdProductCheckBox(arrayIdProductCheckBox.filter(item => item !== idProduct));
    }

    // GetAllDataCart
    const getAlldataCartHandle = async () => {
        const data = await getAllCart(user._id);
        // console.log({data});
       await data && setDataAll(data);
    }

    useEffect(() => {
        getAlldataCartHandle();
    },[])

    // Handle Delete All Product isCheckbox
    
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
      setShowModal(true);
    };
  
   const handleDeleteAllisCheckedbox = async () => {
    const response = await deleleAllByIdCart({
        idUser: user._id,
        idProduct:  arrayIdProductCheckBox
    });
    console.log({response});
    response.deletedCount > 0  && await getAlldataCartHandle();
    response.deletedCount > 0 && handleCancelDelete();
   }

    const handleCancelDelete = () => {
      setShowModal(false);
    };

return(
    <SafeAreaView
    style={styles.container}
    >
         <NavigatorHeader
        title={"GIỎ HÀNG"}
        style={{ height: 55, marginTop: 20, paddingHorizontal: 24, }}
        actionLeft={() => navigation.goBack()}
        iconRight={ <Trash size="32" color={COLORS.BLACK}/>}
        actionRight={handleDelete}
      />
    {/* MODAL  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}>
              Are you sure want to delete all product isChecked from cart?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleDeleteAllisCheckedbox}
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

      {/* SCROLL VIEW MAIN  */}
    <ScrollView 
    showsVerticalScrollIndicator={false}
    style ={{marginBottom: 200}}
    >
        {dataAll && dataAll.map(item => <ItemCartProduct handleIsCheckBox={handleIsCheckBox} handleUnCheckBox={handleUnCheckBox}  getData={getAlldataCartHandle} data={item} key={item._id}/>)}
    </ScrollView>
    
    <PaymentFooter getpriceTotal={() => getTotalPrice(dataAll)}/>
    </SafeAreaView>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 ,
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