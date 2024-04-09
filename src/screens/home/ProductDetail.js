import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NavigatorHeader from '../../components/NavigatorHeader';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../assets';
import {Image} from 'react-native';
import RowComponent from '../../components/RowComponent';
import Category from '../../components/Category';

export default function ProductDetail({navigation, route}) {
  const {data} = route.params;
console.log(data.image);
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
    <View
    style={styles.wrapperImage}
    >
        <Image 
        source={{uri : data?.image[0]}}
        style={styles.image}
        resizeMode='contain'
        />
    </View>
      <View style={styles.infoList}>
        <Category
         data={data?.detailType ? [{ name: data?.productType}, { name: data?.detailType}] :  [{ name: data?.productType }]}
         selectedAll={true}
         styleItem={{ marginEnd: 5 }}
        />
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
          <Text style={[styles.txtLight, {color: COLORS.primaryGreenHex}]}>{data?.status}</Text>
        </RowComponent>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    wrapperImage: {
    width: '100%',
    height: 250,
    backgroundColor: COLORS.GRAYLIGHT
    },
    image: {
        width: '100%',
        height: 200,

    },
  infoList: {
    padding: 30,
    
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
});
