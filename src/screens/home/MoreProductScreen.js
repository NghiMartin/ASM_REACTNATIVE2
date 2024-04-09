import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import NavigatorHeader from '../../components/NavigatorHeader';
import {ArrowLeft2} from 'iconsax-react-native';
import {COLORS} from '../../assets';
import Show4Product from '../../components/Show4Product';
import Category from '../../components/Category';

export default function MoreProductScreen({navigation, route}) {
  const {data, isCategory} = route.params;
  return (
    <SafeAreaView style={{flex: 1, 
    
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }}>
         <NavigatorHeader
          actionLeft={() => navigation.goBack()}
          iconLeft={<ArrowLeft2 size="32" color={COLORS.BLACK} />}
          title={data[0].productType}
          style={{height: 55, marginTop: 20, paddingHorizontal: 24}}
        />
           <ScrollView showsVerticalScrollIndicator={false}
       >
      <View>
          {isCategory && (
            <Category
              style={{
                marginTop: 18,
                marginHorizontal: 24,
              }}
              selectedAll={false}
            />
          )}
          {data ? (
            <Show4Product
              data={data}
              style={{marginTop: 15, paddingHorizontal: 25}}
              navigation={navigation}
              isHidebtnAdd={true}
            />
          ) : (
            <ActivityIndicator size={'large'} />
          )}
      </View>
      </ScrollView>

    </SafeAreaView>
  );
}
