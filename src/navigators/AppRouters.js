import { useAsyncStorage, } from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainNavigator from './MainNavigator';
import { SplashScreen } from '../screens';
import AuthNavigator from './AuthNavigator';
import { verifyToken } from '../api/auth/AuthApi';
import { getToken, removeToken } from '../api/auth/KeyChain';
import { removeUser } from '../store/userSlice';

const AppRouters = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [authToken, setauthToken] = useState(false);
   const  dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    checkLogin();
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [user]);

  const checkLogin = async () => {
    const token = await getToken();
    console.log('gettoken',token);
    token ?? setauthToken(false);
    const res = await verifyToken(token);
    console.log('res',res);
    res ? setauthToken(true) : resetData();
  };
 const resetData = async() => {
  setauthToken(false);
  dispatch(removeUser(null));
  await removeToken();
   
 }
  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) :  authToken ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
}

export default AppRouters