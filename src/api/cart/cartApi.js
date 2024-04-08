import axios from "axios";
import { baseURL } from "../baseUrl";
import { ToastAndroid } from "react-native";

const getAllCart = async (idUser) => {
    try {
    const response = await axios.get(`${baseURL}/cart/list?idUser=${idUser}`);
    const data =  response.data;
    console.log(data); 
  return data.data;
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
            console.error('Xảy ra lỗi getListCart');
          }
          console.log(data.json());
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
        }
}
const decreaseCart = async (obj) => {
    try {
        const response = await axios.post(`${baseURL}/cart/delete`, obj);
        if (response.status === 200) {
            const data =  response.data;
            console.log({data})
          return data.data;
          } else {
            console.error('Xảy ra lỗi getListCart');
          }
          console.log(data.json());
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
        }
}
export {getAllCart, increaseCart, decreaseCart}
