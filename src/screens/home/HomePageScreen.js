import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Show4Product from '../../components/Show4Product';
import HomeHeader from '../../components/HomeHeader';
import {
  getAllCareTool,
  getAllData,
  getAllPlant,
  getAllPotPlant,
  getAllProduct,
} from '../../api/product/getAllData';
import { FONTFAMILY } from '../../assets';

// const data = [
//   { key: '1', name: 'Item 1' },
//   { key: '2', name: 'Item 2' },
//   { key: '3', name: 'Item 3' },
//   { key: '4', name: 'Item 4' },
//   { key: '5', name: 'Item 4' },
//   { key: '6', name: 'Item 4' },
// ];
const HomePageScreen = props => {
  const {navigation} = props;
  const [dataAllPlant, setdataAllPlant] = useState([]);
  const [dataAllPotPlant, setdataAllPotPlant] = useState([]);
  const [dataAllCareTool, setdataAllCareTool] = useState([]);

  const getAllPlantData = async () => {
    const plants = await getAllPlant();
    setdataAllPlant(plants);
  };
  const getAllPotPlantData = async () => {
    const plants = await getAllPotPlant();
    setdataAllPotPlant(plants);
  };
  const getAllCareToolData = async () => {
    const plants = await getAllCareTool();
    setdataAllCareTool(plants);
  };
  useEffect(() => {
    getAllPlantData();
    getAllPotPlantData();
    getAllCareToolData();
  }, []);

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    >
      <View style={[styles.container]}>
        <StatusBar
          translucent
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
        />
        <HomeHeader  navigation={navigation} />
        {dataAllPlant ? (
          <Show4Product
            data={dataAllPlant}
            title={'Cây trồng'}
            quantityShow={4}
            style={{marginTop: 15, paddingHorizontal: 25}}
            onPressShowMore={() => navigation.navigate('MoreProduct', {data :dataAllPlant, isCategory : true})}
            txtShowMore={true}
            navigation={navigation}
          />
        ) : (
          <ActivityIndicator size={'large'} />
        )}

        {dataAllPotPlant ? (
          <Show4Product
          navigation = {navigation}
            data={dataAllPotPlant}
            quantityShow={4}
            txtShowMore={true}
            title={'Chậu cây trồng'}
            onPressShowMore={() => navigation.navigate('MoreProduct', {data :dataAllPotPlant})}
            style={{marginTop: 15, paddingHorizontal: 25}}
          />
        ) : (
          <ActivityIndicator size={'large'} />
        )}
        {dataAllCareTool ? (
          <Show4Product
            data={dataAllCareTool}
            quantityShow={4}
            navigation={navigation}
            txtShowMore={true}
            onPressShowMore={() => navigation.navigate('MoreProduct', {data :dataAllCareTool})}
            title={'Phụ kiện'}
            style={{marginTop: 15, paddingHorizontal: 25}}
          />
        ) : (
          <ActivityIndicator size={'large'} />
        )}

        <View style={styles.newComboContainer}>
          <Text style={styles.txtCombo}>Combo chăm sóc (mới)</Text>
          <View style={styles.itemNew}>
            <View style={styles.txtNewContainer}>
              <Text style={styles.txtNewTitle}>Lemon Balm Grow Kit</Text>
              <Text style={styles.txtNewInfo}>
                Gồm: hạt giống Lemon Balm, gói đất hữu cơ, chậu Planta, marker
                đánh dấu...
              </Text>
            </View>
            <Image
              source={require('../../assets/images/imgNewCombo.png')}
              style={styles.imgNewCombo}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePageScreen;

const styles = StyleSheet.create({
  newComboContainer: {
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginBottom: 10,
  },
  imgNewCombo: {
    width: '35%',
    height: 134,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  txtNewInfo: {
    color: '#7D7B7B',
    fontWeight: '400',
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: 14,
    lineHeight: 20,
  },
  txtNewTitle: {
    color: '#221F1F',
    fontWeight: '500',
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: 16,
    lineHeight: 22,
  },
  txtNewContainer: {
    width: '65%',
    padding: 24,
    flexDirection: 'column',
  },
  itemNew: {
    borderRadius: 8,
    height: 134,
    backgroundColor: '#F6F6F6',
    flexDirection: 'row',
    width: '100%',
  },
  txtCombo: {
    color: '#221f1f',
    marginTop: 15,
    textAlign: 'left',
    width: '100%',
    fontSize: 24,
    height: 49,
    lineHeight: 34,
    fontWeight: '500',
    fontFamily: FONTFAMILY.poppins_light,
  },
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
