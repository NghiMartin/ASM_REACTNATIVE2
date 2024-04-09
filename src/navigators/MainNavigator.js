import React from 'react';
import TabNavigators from './TabNavigators';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CartScreen, MoreProductScreen } from '../screens/home';
import ProductDetail from '../screens/home/ProductDetail';
const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name = "MainNavigator" component={TabNavigators}/>
        <Stack.Screen name = "Cart" component={CartScreen}/>
        <Stack.Screen name = "MoreProduct" component={MoreProductScreen}/>
        <Stack.Screen name = "ProductDetail" component={ProductDetail}/>
    </Stack.Navigator>
  )
}

export default MainNavigator;