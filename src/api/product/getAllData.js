import axios from "axios";
import { baseURL } from "../baseUrl";

const getAllPlant = async () => {
    try {
    const response = await axios.get(`${baseURL}/product/list-plant`);
    if (response.status === 200) {
        const data =  response.data;
        // console.log(data)
      return data.data;
      } else {
        console.error('Xảy ra lỗi getList');
      }
      console.log(data.json());
    } catch (error) {
        console.error('Đã xảy ra lỗi:', error);
    }
}

const getAllPotPlant= async () => {
    try {
    const response = await axios.get(`${baseURL}/product/list-potplant`);
    if (response.status === 200) {
        const data = await response.data;
        // console.log(data)
      return data.data;
      } else {
        console.error('Xảy ra lỗi getList');
      }
    } catch (error) {
        console.error('Đã xảy ra lỗi:', error);
    }
}

const getAllCareTool = async () => {
    try {
    const response = await axios.get(`${baseURL}/product/list-caretools`);
    if (response.status === 200) {
        const data = await response.data;
        // console.log(data)
      return data.data;
      } else {
        console.error('Xảy ra lỗi getList');
      }
    } catch (error) {
        console.error('Đã xảy ra lỗi:', error);
    }
}


const getDataBySearch = async (objKey) => {
  try {
    console.log({objKey});
  // const response = await axios.get(`${baseURL}/product/search-product`, {key : 'Spider'});
  const response = await axios.get(`${baseURL}/product/search-product`, { params: objKey});

  if (response.status === 200) {
      const data = await response.data;
      console.log({data})
    return data.data;
    } else {
      console.error('Xảy ra lỗi Search product');
    }
    console.log(data.json());
  } catch (error) {
      console.error('Đã xảy ra lỗi:', error);
  }
}
export {getAllPlant, getAllPotPlant, getAllCareTool, getDataBySearch};