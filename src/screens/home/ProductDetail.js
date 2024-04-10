import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import NavigatorHeader from '../../components/NavigatorHeader';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../assets';
import {Image} from 'react-native';
import RowComponent from '../../components/RowComponent';
import Category from '../../components/Category';
import {useRef, useState} from 'react';
import {AddSquare, MinusSquare} from 'iconsax-react-native';
import CustomButton from '../../components/CustomButton';

export default function ProductDetail({navigation, route}) {
  const {data} = route.params;

  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(data => data +=1);
  };

  const decreaseCount = () => {
    count > 0 && setCount(data => data -=1);
  };
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}>
      <NavigatorHeader
        title={data?.name}
        actionLeft={() => navigation.goBack()}
        iconRight={
          <Image
            source={require('../../assets/icons/cart.png')}
            style={{width: 24, height: 24}}
          />
        }
        actionRight={() => {}}
      />
      <ScrollView
      style={{
        marginBottom: 10
      }}
      showsVerticalScrollIndicator={false}
      >
<View style={styles.wrapperImage}>
        <Image
          source={{uri: data?.image[0]}}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.infoList}>
        <Category
          data={
            data?.detailType
              ? [{name: data?.productType}, {name: data?.detailType}]
              : [{name: data?.productType}]
          }
          selectedAll={true}
          styleItem={{marginEnd: 5}}
        />
        <Text
          style={styles.priceProduct}>
          {Number(data?.price).toLocaleString('vi-VN')}đ
        </Text>
        <RowComponent styles={styles.inforItems}>
          <Text style={styles.txtDetail}>Chi tiết sản phẩm</Text>
        </RowComponent>
        <RowComponent
          justify={'space-between'}
          styles={[styles.inforItems, styles.doubleInfoText]}>
          <Text style={styles.txtLight}>Kích cỡ</Text>
          <Text style={styles.txtLight}>{data?.size}</Text>
        </RowComponent>
        <RowComponent
          justify={'space-between'}
          styles={[styles.inforItems, styles.doubleInfoText]}>
          <Text style={styles.txtLight}>Xuất xứ</Text>
          <Text style={styles.txtLight}>{data?.origin}</Text>
        </RowComponent>

        <RowComponent
          justify={'space-between'}
          styles={[styles.inforItems, styles.doubleInfoText]}>
          <Text style={styles.txtLight}>Tình trạng</Text>
          <Text style={[styles.txtLight, {color: COLORS.primaryGreenHex}]}>
            {data?.status}
          </Text>
        </RowComponent>
      </View>
      <View style={styles.footer}>
        <RowComponent justify={'space-between'}>
          <Text style={styles.footerInfoText}>
            Đã chọn {count} sản phẩm
          </Text>
          <Text style={styles.footerInfoText}>Tạm tính</Text>
        </RowComponent>
        <RowComponent justify="space-between">
          <RowComponent justify="space-between" styles={{width: 120}}>
            <CustomButton
              isIcon={true}
              onPress={() => decreaseCount()}
              Icon={<MinusSquare size="40" color={COLORS.greenHex} />}
            />
            <Text style={styles.quantity}>{count}</Text>
            <CustomButton
              isIcon={true}
              onPress={() => increaseCount()}
              Icon={<AddSquare size="40" color={COLORS.greenHex} />}
            />
          </RowComponent>

          <Text style={styles.priceTotal}> 0đ</Text>
        </RowComponent>
        <CustomButton style={{alignItems: 'center'}} label={'Chọn mua'} />
      </View>
      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapperImage: {
    width: '100%',
    height: 250,
    backgroundColor: COLORS.GRAYLIGHT,
  },
  image: {
    width: '100%',
    height: 200,
  },
  infoList: {
    padding: 30,
  },
  priceProduct: {
      fontSize: FONTSIZE.size_30,
      fontFamily: FONTFAMILY.poppins_medium,
      color: COLORS.primaryGreenHex,
      marginVertical: 10,
  },
  inforItems: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY,
  },
  doubleInfoText: {},
  txtDetail: {
    padding: 5,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.BLACK,
    fontSize: FONTSIZE.size_20,
  },
  txtLight: {
    padding: 5,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.BLACK,
    fontSize: FONTSIZE.size_16,
  },
  footer: {
    paddingHorizontal: 20,
  },
  footerInfoText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.GRAY,
    fontSize: FONTSIZE.size_16,
  },
  quantity: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_20,
  },
  priceTotal: {
    fontSize: FONTSIZE.size_30,
      fontFamily: FONTFAMILY.poppins_medium,
      color: COLORS.primaryGreenHex,
      marginVertical: 20,
  }
});
