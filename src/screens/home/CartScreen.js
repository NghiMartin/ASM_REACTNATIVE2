import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { getAllCart } from "../../api/cart/cartApi";
import {useSelector} from "react-redux";
import ItemCartProduct from "../../components/ItemCartProduct";
import NavigatorHeader from "../../components/NavigatorHeader";
import { ArrowLeft2, Trash } from "iconsax-react-native";
import { COLORS } from "../../assets";
import PaymentFooter from "../../components/PaymentFooter";
import { getTotalPrice } from "../../utils/getTotalPrice";
export default function CartScreen ({navigation}) {
    const user = useSelector((state) => state.user);
    console.log({user});
    const [dataAll, setDataAll] = useState(null);
    const getAlldataCartHandle = async () => {
        const data = await getAllCart(user._id);
        console.log({data});
       await data && setDataAll(data);
    }
    useEffect(() => {
        getAlldataCartHandle();
    },[])
return(
    <SafeAreaView
    style={styles.container}
    >
         <NavigatorHeader
        iconLeft={<ArrowLeft2 size="32" color={COLORS.BLACK}/>}
        title={"GIỎ HÀNG"}
        style={{ height: 55, marginTop: 20, paddingHorizontal: 24, }}
        actionLeft={() => navigation.goBack()}
        iconRight={ <Trash size="32" color={COLORS.BLACK}/>}
        actionRight={() => {}}
      />
    <ScrollView >
        {dataAll && dataAll.map(item => <ItemCartProduct  getData={getAlldataCartHandle} data={item} key={item._id}/>)}
    </ScrollView>
    <PaymentFooter getpriceTotal={() => getTotalPrice(dataAll)}/>
    </SafeAreaView>
)
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 ,
    }
})