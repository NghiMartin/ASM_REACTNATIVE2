import React from 'react';
import TabNavigators from './TabNavigators';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CartScreen from '../screens/home/CartScreen';
const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name = "MainNavigator" component={TabNavigators}/>
        <Stack.Screen name = "Cart" component={CartScreen}/>
    </Stack.Navigator>
  )
}

export default MainNavigator;