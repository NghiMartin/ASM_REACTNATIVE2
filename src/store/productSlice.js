import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchHistoryData: [],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setHistoryData: (state, action) => action.payload,
    removeHistoryData: (state) => {
      state.searchHistoryData = null;
    }
  },
})

export const { setHistoryData, removeHistoryData } = productSlice.actions;
export default productSlice.reducer;