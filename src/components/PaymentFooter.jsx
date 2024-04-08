import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import CustomButton from "./CustomButton";

export default function PaymentFooter({onPress, getpriceTotal}) {
  
  const totalPrice = getpriceTotal();
  console.log({totalPrice});
    return (
        <View style={styles.payMent}>
        <View style={styles.titleContainer}>
          <Text style={styles.titlePay}>Tạm tính</Text>
          <Text style={styles.price}>
            {Number(totalPrice).toLocaleString('vi-VN')}đ
          </Text>
        </View>
        <CustomButton
          label={'Tiến hành thanh toán'}
         onPress={() => {}}
        />
      </View>
    )
}

const styles = StyleSheet.create({
    button: {
      marginTop: 11.5,
    },
    price: {
      color: 'black',
      fontSize: 16,
      fontFamily: 'Lato',
      fontWeight: '500',
      lineHeight: 22,
    },
    titlePay: {
      fontSize: 14,
      fontFamily: 'Lato',
      fontWeight: '400',
      lineHeight: 20,
    },
  
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%'
    },
    main: {
      paddingHorizontal: 24,
    },
    payMent: {
      position: 'absolute',
      width: '100%',
      marginHorizontal: 'auto',
      alignItems: 'center',
      flexDirection: 'column',
      bottom: 20,
      justifyContent: 'center',
      paddingHorizontal: 28,
    },
    txtCartNull: {
      color: 'black',
      fontSize: 14,
      fontFamily: 'Lato',
      fontWeight: '400',
      lineHeight: 20,
      width: '100%',
      textAlign: 'center',
    },
    container: {
      flexDirection: 'column',
      height: '100%',
    }
  })