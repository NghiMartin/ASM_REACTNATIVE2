import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchHistoryData: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setHistoryData: (state, action) => {
      state.searchHistoryData = action.payload;
    },
    addToHistoryData: (state, action) => {
      const newItem = action.payload;
      // check existingitem
      if (!state.searchHistoryData.includes(newItem)) {
        state.searchHistoryData.push(newItem);
      }
    },
    removeFromHistoryData: (state, action) => {
      const itemName = action.payload;
      state.searchHistoryData = state.searchHistoryData.filter(item => item !== itemName);
    },
    clearHistoryData: (state) => {
      state.searchHistoryData = [];
    },
  },
});

export const { setHistoryData, addToHistoryData, removeFromHistoryData, clearHistoryData } = productSlice.actions;
export default productSlice.reducer;
