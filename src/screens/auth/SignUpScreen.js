import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import CustomButton from '../../components/CustomButton';

import { COLORS, FONTFAMILY, FONTSIZE } from '../../assets';
import InputField from '../../components/InputField';

import { useDispatch } from 'react-redux';
import { AppImages } from '../../assets';
import { register } from '../../api/auth/AuthApi';
import {yupResolver} from '@hookform/resolvers/yup';
// import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import { schemaSignUp } from './schema';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// const schema = yup.object().shape({
//   username: yup.string().required('Username is required').label('User Name'),
//   email: yup.string().email().required('Email is required').label('Email'),
//   phone: yup.string().required('Phone is required').label('Phone'),
//   password: yup
//     .string()
//     .required('Password is required')
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
//       'Password must have at least 8 characters, one uppercase, one number',
//     )
//     .label('Password'),
//   // confirmPassword: yup
//   //   .string()
//   //   .oneOf([yup.ref('password')], 'Passwords must match')
//   //   .required('Confirm Password is required')
//   //   .label('Confirm Password'),
// });



const SignUpScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const {
    control,
    setValue,
    formState: {errors},
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schemaSignUp),
  });
  console.log(errors);
  const handleRegister = async (data) => {
  console.log(data);
  
    try {
      const response = await register({

        username :data.fullname,
        password: data.password,
        email : data.email,
        phone :data.phone
      })
      response && console.log('register successfull');
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <StatusBar hidden />

        <View style={styles.container}>
          <Image
            style={{
              width: '100%',
              height: 400,
              objectFit: 'cover',
              position: 'absolute',
              top: width - 600
            }}
            source={AppImages.background_plant}
          />
          <View
            style={{
              padding: 20,
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                color: COLORS.primaryGreenHex,
                fontSize: FONTSIZE.size_28,
                fontFamily: FONTFAMILY.poppins_bold,
                position: 'absolute',
                width: '100%'
              }}>
              Đăng Ký
            </Text>
            <View
              style={{
                paddingTop: 30
              }}
            >
              <Controller
              control={control}
              name="username"
              defaultValue=""
              render={({field: {value}}) => (
                <InputField
                value={value}
                placeholder="User name"
                error= {errors?.fullName?.message}
                onChangeText={value => setValue('username', value)}
              />
              )}
            />
             <Controller
              control={control}
              name="email"
              defaultValue=""
              render={({field: {value}}) => (
                <InputField
                value={value}
                placeholder="Email"
                error= {errors?.email?.message}
                onChangeText={value => setValue('email', value)}
              />
              )}
            />
               <Controller
              control={control}
              name="phone"
              defaultValue=""
              render={({field: {value}}) => (
                <InputField
                placeholder="Phone"
                value={value}
                error= {errors?.phone?.message}
                onChangeText={value => setValue('phone', value)}
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
              {/* <InputField
                placeholder="Full name"
                onChangeText={setFullName}
              />
              <InputField
                placeholder="Email"
                onChangeText={setEmail}
                error={checkError?.email}
              />
              <InputField
                placeholder="Phone"
                onChangeText={setPhone}
              />
              <InputField
                inputType={'password'}
                placeholder="Password"
                password={true}
                onChangeText={setPassword}
              /> */}

            </View>
            <Text style={{
              marginTop: 10,
              textAlign: 'center',
              color: COLORS.GRAY,
              fontFamily: FONTFAMILY.poppins_medium
            }}>Để đăng ký tài khoản, bạn đồng ý
              <Text style={{
                textDecorationLine: 'underline',
                color: COLORS.primaryGreenHex,
                fontFamily: FONTFAMILY.poppins_bold,
              }}>
                {` `} Terms &  Conditions {'\n'}
              </Text>  and
              <Text style={{
                color: COLORS.primaryGreenHex,
                textDecorationLine: 'underline',
                fontFamily: FONTFAMILY.poppins_bold,

              }}>
                {` `} Privacy Policy
              </Text>
            </Text>
            <CustomButton label="SignUp" onPress={handleSubmit(handleRegister)} />
            <View style={{ width: width - 40, alignItems: 'center' }}>
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
                Bạn đã có tài khoản?
              </Text>
              <TouchableOpacity onPress={() => {navigation.navigate('LoginScreen')}}>
                <Text
                  style={{
                    color: COLORS.primaryGreenHex,
                    fontFamily: FONTFAMILY.poppins_medium,
                    marginLeft: 5,
                  }}>
                  Đăng nhập
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>

  );
};
export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: height,
    paddingTop: width - 200
  },
});
