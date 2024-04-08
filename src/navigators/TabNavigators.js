import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { HomePageScreen } from '../screens';
import TabBarIcon from '../components/TabBarIcon';
import UserScreen from '../screens/home/UserScreen';
import SearchScreen from '../screens/home/SearchScreen';

const tabIcons = {
  HomePageScreen: require('../assets/icons/home.png'),
  Search: require('../assets/icons/search.png'),
  Notification: require('../assets/icons/notification.png'),
  User: require('../assets/icons/user.png'),
};

const TabNavigators = () => {
  const Tab = createBottomTabNavigator();

  const tabScreenOptions = ({ route }) => {
    return {
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: '#fff'
      },
      tabBarIcon: ({ focused }) => {
        const iconSource = tabIcons[route.name];
        return <TabBarIcon image={iconSource} focus={focused} />;
      },
    };
  };

  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen name="HomePageScreen" component={HomePageScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Notification" component={HomePageScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigators;
