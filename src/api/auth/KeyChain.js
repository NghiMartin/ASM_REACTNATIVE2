import  Keychain  from 'react-native-keychain';

const storeToken = async (token) => {
  try {
  const keychain =  await Keychain.setGenericPassword('auth_token', token);
  console.log('keychain authtoken: ',keychain);
    return keychain;
  } catch (error) {
    console.log('Error storing token:', error);
  }
};
const getToken = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log('token',credentials.password);
        return credentials.password;
      }
    } catch (error) {
      console.log('Error getting token:', error);
      return null;
    }
  };

  const removeToken = async () => {
    try {
      const credentials = await Keychain.resetGenericPassword();
      if (credentials) {
        console.log('reset chain',credentials);
        return credentials;
      }
    } catch (error) {
      console.log('Error remove token:', error);
      return null;
    }
  };

export {storeToken, getToken, removeToken}