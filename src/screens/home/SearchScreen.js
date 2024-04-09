import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import InputField from '../../components/InputField';
import {ArrowLeft2, SearchNormal1} from 'iconsax-react-native';
import ItemProduct from '../../components/ItemProduct';
import ItemSearch from '../../components/ItemSearch';
import {COLORS} from '../../assets';
import {useState} from 'react';
import {getDataBySearch} from '../../api/product/getAllData';
import ItemSearchProduct from '../../components/ItemSearchProduct';
import NavigatorHeader from '../../components/NavigatorHeader';
import {useDispatch, useSelector} from 'react-redux';
import { addToHistoryData, removeFromHistoryData, setHistoryData } from '../../store/productSlice';
const data = [
  {
    key: 1,
    name: 'Spider Plant',
  },
  {
    key: 2,
    name: 'Spider Plant',
  },
  {
    key: 3,
    name: 'Spider Plant',
  },
  {
    key: 4,
    name: 'Spider Plant',
  },
];
export default function SearchScreen({navigation}) {
  const dispatch = useDispatch();
  const searchHistoryData = useSelector((state) => state.product.searchHistoryData);
  const [dataProductSearch, setdataProductSearch] = useState();
  const [search, setSearch] = useState();
console.log({searchHistoryData});
  const handleRemoveHistory = (name) => {
      name && dispatch(removeFromHistoryData(name));
  }
  const getAllDataSearchHandle = async (name) => {
    const data =  await getDataBySearch({key: name});
    data && setdataProductSearch(data);
    return data;

  }

  const hadleSearchProduct = async () => {
    if (search) {
     const data =  await getAllDataSearchHandle(search);
      console.log({data});
      data && dispatch(addToHistoryData(search));
    } else {
      ToastAndroid.showWithGravity(
        `Vui lòng nhập thông tin tìm kiếm!`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };
  return (
    <SafeAreaView>
      <View
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          paddingHorizontal: 10,
        }}>
        <NavigatorHeader
          title={'TÌM KIẾM'}
          style={{height: 55, marginTop: 20, paddingHorizontal: 24}}
        />
        <InputField
          placeholder="search your product"
          onChangeText={setSearch}
          Icons={
            <SearchNormal1
              onPress={hadleSearchProduct}
              size="28"
              color={COLORS.greenHex}
              variant="Outline"
            />
          }
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginBottom: 100}}>
          {search ? null : (
            <View>
              {searchHistoryData.length > 0 && <Text>Tìm kiếm gần đây</Text>}
              {
                searchHistoryData.length > 0 && searchHistoryData?.map((item, index )=> <ItemSearch onPressItem={getAllDataSearchHandle} onPressRemove={handleRemoveHistory} data={item} key={index} />)}
                </View>    
          )}
          {dataProductSearch && 
            dataProductSearch?.map(item => (
              <ItemSearchProduct navigation={navigation} data={item} key={item._id} />
              // <ItemCartProduct data ={item} key ={item._id} />
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
