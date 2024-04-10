import axios from "axios";
import { baseURL } from "../baseUrl";
import { ToastAndroid } from "react-native";

const getAllCart = async (idUser) => {
    try {
    const response = await axios.get(`${baseURL}/cart/list?idUser=${idUser}`);
    if(response.status === 200 || 304){
      const data =  response.data;
      console.log(data); 
    return data.data;
    }
  
    } catch (error) {
        console.error('Đã xảy ra lỗi:', error);
    }
}
const increaseCart = async (obj) => {
    try {
        const response = await axios.post(`${baseURL}/cart/add`, obj);
        if (response.status === 200) {
            const data =  response.data;
            console.log({data})
            // ToastAndroid.showWithGravity(
            //     `Product đã được thêm thành công!`,
            //     ToastAndroid.SHORT,
            //     ToastAndroid.CENTER,
            //   );
          return data.data;
          } else {
            console.error('Xảy ra lỗi AddtCart');
          }
          console.log(data.json());
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
        }
}
const decreaseCart = async (obj) => {
    try {
        const response = await axios.post(`${baseURL}/cart/decrease`, obj);
        if (response.status === 200) {
            const data =  response.data;
            console.log({data})
          return data.data;
          } else {
            console.error('Xảy ra lỗi DecreaseCart');
          }
          console.log(data.json());
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
        }
}
const deleleByIdCart = async (obj) => {
  try {
      const response = await axios.post(`${baseURL}/cart/delete-by-id`, obj);
      if (response.status === 200) {
          const data =  response.data;
          console.log({data})
              ToastAndroid.showWithGravity(
                `Product đã được xoá thành công!`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
        return data.data;
        } else {
          console.error('Xảy ra lỗi DeleteCart');
        }
        console.log(data.json());
      } catch (error) {
          console.error('Đã xảy ra lỗi:', error);
      }
}
const deleleAllByIdCart = async (obj) => {
  console.log({obj});
  try {
      const response = await axios.post(`${baseURL}/cart/delete-all-by-id`, obj);
      if (response.status === 200) {
          const data =  response.data;
          console.log({data})
              ToastAndroid.showWithGravity(
                `Product đã được xoá thành công!`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
        return data.data;
        } else {
          console.error('Xảy ra lỗi DeleteCart');
        }
        console.log(data.json());
      } catch (error) {
          console.error('Đã xảy ra lỗi:', error);
      }
}
export {getAllCart, increaseCart, decreaseCart, deleleByIdCart, deleleAllByIdCart}
