// LoginForm.js
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import CustomButton from '../../components/CustomButton';

import { TouchableOpacity } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE } from '../../assets';
import InputField from '../../components/InputField';

import { AppImages } from '../../assets';
import CheckBox from '../../components/CheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/userSlice';
import { login } from '../../api/auth/AuthApi';
import { removeToken, storeToken } from '../../api/auth/KeyChain';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { schemaSignIn } from './schema';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const LoginScreen = ({onLogin, navigation}) => {
  const {
    control,
    setValue,
    formState: {errors},
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schemaSignIn),
  });
  const [isCheckbox, setisCheckbox] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleCheckBox = () => setisCheckbox(!isCheckbox);

  const handleLogin= async(data)=>{
    try {
    console.log('loginnn');

      const response = await login({
        username: data.username,
        password : data.password
      })
      console.log('response',response);
      response && await storeToken(response?.token);
      dispatch(setUser(response?.data));
      console.log('user login', user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView>
      <StatusBar hidden />
      <View style={styles.container}>
        <Image
          style={{
            width: '100%',
            height: 400,
            objectFit: 'cover',
            marginTop: -200,
          }}
          source={AppImages.background_plant}
        />
        <View style={styles.childContainer}>
          <Text
            style={{
              color: COLORS.primaryGreenHex,
              fontSize: FONTSIZE.size_28,
              fontFamily: FONTFAMILY.poppins_bold,
            }}>
            Chào mừng bạn
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: FONTSIZE.size_16,
              fontFamily: FONTFAMILY.poppins_,
              marginBottom: 20
            }}>
            Đăng nhập tài khoản
          </Text>
          <Controller
              control={control}
              name="username"
              defaultValue=""
              render={({field: {value}}) => (
                <InputField
                value={value}
                placeholder="User name"
                error= {errors?.username?.message}
                onChangeText={value => setValue('username', value)}
              />
              )}
            />
              <Controller
              control={control}
              name="password"
              defaultValue=""
              render={({field: {value}}) => (
                <InputField
                inputType={'password'}
                placeholder="Password"
                password={true}
                error= {errors?.password?.message}
                value={value}
                onChangeText={value => setValue('password', value)}
              /> 
              )}
            />

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              marginTop: 20
            }}>
            <CheckBox
              isCheckbox={isCheckbox}
              onPress={handleCheckBox}
            />

            <TouchableOpacity
              onPress={() => {}}
              style={{
                flexDirection: 'row',
                alignItems: 'start',
                justifyContent: 'start',
              }}>
              <Text
                style={{
                  marginLeft: 10,
                  color: COLORS.primaryGreenHex,
                  fontFamily: FONTFAMILY.poppins_medium,
                  fontSize: FONTSIZE.size_14,
                }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
                
          <CustomButton label="Login" onPress={handleSubmit(handleLogin)} />
          <View style={{width: width - 40, alignItems: 'center'}}>
            <View
              style={{
                marginTop: 10,
                borderColor: COLORS.primaryGreenHex,
                borderWidth: 1,
                width: width - 40,
              }}></View>
            <Text
              style={{
                position: 'absolute',
                textAlign: 'center',
                backgroundColor: 'white',
                width: 50,
              }}>
              Hoặc
            </Text>
          </View>
          <View
            style={{
              width: 200,
              margin: 20,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity>
              <Image
                style={{
                  width: 50,
                  height: 50,
                }}
                source={AppImages.facebook_icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{
                  width: 50,
                  height: 50,
                }}
                source={AppImages.google_icon}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontFamily: FONTFAMILY.poppins_medium,
              }}>
              Bạn không có tài khoản?
            </Text>
            <TouchableOpacity onPress={() => {navigation.navigate('SignUpScreen')}}>
              <Text
                style={{
                  color: COLORS.primaryGreenHex,
                  fontFamily: FONTFAMILY.poppins_medium,
                  marginLeft: 5,
                }}>
                Tạo tài khoản
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: height,
  },
  childContainer: {
    paddingBottom: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
