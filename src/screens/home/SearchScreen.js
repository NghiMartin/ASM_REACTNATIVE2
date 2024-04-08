import {Platform, SafeAreaView, ScrollView, StatusBar, Text, ToastAndroid, View} from 'react-native';
import InputField from '../../components/InputField';
import {ArrowLeft2, SearchNormal1} from 'iconsax-react-native';
import ItemProduct from '../../components/ItemProduct';
import ItemSearch from '../../components/ItemSearch';
import { COLORS } from '../../assets';
import { useState } from 'react';
import { getDataBySearch } from '../../api/product/getAllData';
import ItemSearchProduct from '../../components/ItemSearchProduct';
import ItemCartProduct from '../../components/ItemCartProduct';
import NavigatorHeader from '../../components/NavigatorHeader';

const data = [
    {
        key : 1 ,
        name : "Spider Plant"
    },
    {
        key : 2 ,
        name : "Spider Plant"
    },
    {
        key : 3 ,
        name : "Spider Plant"
    },
    {
        key : 4,
        name : "Spider Plant"
    }
]
export default function SearchScreen() {

    const [search, setSearch] = useState('');
    const [dataProductSearch, setdataProductSearch] = useState([]);

    const hadleSearchProduct = async () => {
       if(search){
        const data = await getDataBySearch({key : search});
        console.log({data});
        data && setdataProductSearch(data);
       } else{
        ToastAndroid.showWithGravity(
            `Vui lòng nhập thông tin tìm kiếm!`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
       }
    }
  return (
    <SafeAreaView>
    <View 
        style={{
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 ,
            paddingHorizontal:10
        }}
        >
              <NavigatorHeader
        iconLeft={<ArrowLeft2 size="32" color={COLORS.BLACK}/>}
        title={"TÌM KIẾM"}
        style={{ height: 55, marginTop: 20, paddingHorizontal: 24, }}
      />
        <InputField
            placeholder="search your product"
            onChangeText = {setSearch}
            Icons={<SearchNormal1 onPress = {hadleSearchProduct} size="28" color={COLORS.greenHex} variant="Outline" />}
        />
        <ScrollView>

       {search ? null :( 
       <View>
        {data  && <Text>Tìm kiếm gần đây</Text>}
            {data && data.map( item => (
                <ItemSearch data = {item}  key ={item.key}/>
            ))}
        </View>
        ) }
        {dataProductSearch &&  (
            dataProductSearch.map(item => (
                <ItemSearchProduct data ={item} key ={item._id} />
                // <ItemCartProduct data ={item} key ={item._id} />

            ))
        )}
        </ScrollView>

        </View>
    </SafeAreaView>
    
  );
}
