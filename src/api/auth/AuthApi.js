import axios from 'axios';
import { baseURL } from '../baseUrl';
import { ToastAndroid } from 'react-native';

const login = async (objUser) => {
  try {
    console.log({objUser});
    const response = await axios.post(`${baseURL}/user/login`,objUser);
    if (response.status === 200) {
      console.log('Đăng nhập thành công!');
      ToastAndroid.showWithGravity(
        `Đăng nhập thành công!`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      const data = await response.data;
      console.log('data login in AuthAPI',data);
      return data;
    } else {
      console.error('Xảy ra lỗi khi thêm người dùng.');
      return false;
    }
  } catch (error) {
    console.log(error);
    // ToastAndroid.showWithGravity(
    //   `Sai tài khoản hoặc mật khẩu, mời bạn nhập lại!`,
    //   ToastAndroid.SHORT,
    //   ToastAndroid.CENTER,
    // ); 
    return false;
  }
  };
  
  const register = async (objUser) => {
    try {
      console.log('is registering...');
      const response = await axios.post(`${baseURL}/user/register`,objUser, {
        headers: {
          accept: 'application/json'
        }
      });
      // Kiểm tra phản hồi từ máy chủ
      if (response.status === 200) {
        console.log('Người dùng đã được thêm thành công!');
        ToastAndroid.showWithGravity(
          `Người dùng ${objUser.fullname} đã được thêm thành công!`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        return true;
      } else {
        console.error('Xảy ra lỗi khi thêm người dùng.');  
        return false;
      }
    } catch (error) {
     ToastAndroid.showWithGravity(
        `Email hoặc username đã có người đăng ký, mời bạn nhập lại!`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return false;
    }
  };
  const changePassword = async (id,objUser) => {
    try {
      // Gửi yêu cầu POST đến một URL hoặc API cụ thể với dữ liệu của người dùng mới
      const response = await axios.patch(`${baseURL}/user/editpass/${id}`,objUser, {
        headers: {
          accept: 'application/json'
        }
      });
      // Kiểm tra phản hồi từ máy chủ
      if (response.status === 200) {
        console.log('Đổi mật khẩu thành công!');
        ToastAndroid.showWithGravity(
          `Đổi mật khẩu thành công!`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        return true;
      } else {
        console.error('Xảy ra lỗi khi thêm người dùng.');  
        return false;
      }
    } catch (error) {
     ToastAndroid.showWithGravity(
        `Mật khẩu không đúng, mời bạn nhập lại!`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return false;

    }
  };
  const changeInfo = async (id,objUser) => {
    try {
      // Gửi yêu cầu POST đến một URL hoặc API cụ thể với dữ liệu của người dùng mới
      const response = await axios.patch(`${baseURL}/user/edit/${id}`,objUser, {
        headers: {
          accept: 'application/json'
        }
      });
      // Kiểm tra phản hồi từ máy chủ
      if (response.status === 200) {
        console.log('Đổi thông tin thành công!');
        ToastAndroid.showWithGravity(
          `Đổi thông tin thành công!`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        return true;
      } else {
        console.error('Xảy ra lỗi khi Đổi thông tin dùng.');  
        return false;
      }
    } catch (error) {
     ToastAndroid.showWithGravity(
        `Xảy ra lỗi khi Đổi thông tin dùng!`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return false;
    }
  };
const verifyToken = async (tokendata) => {
    try {
        const response = await axios.post(`${baseURL}/user/verifyToken`, {
            token: tokendata
        });
        if (response.status === 200) {
          console.log('Chào mừng bạn đến với thế giới Cây!');
          ToastAndroid.showWithGravity(
            `Chào mừng bạn đến với thế giới Cây!`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          console.error('Xảy ra lỗi khi xác thực token.');
          return false;
        }
        const user = response.data;
        console.log(user);
        return user;
      } catch (error) {
        console.log(error);
     console.log('Token đã hết hạn');
     return false;

      }

  };
  export { login,register, changePassword , changeInfo, verifyToken};
  
  