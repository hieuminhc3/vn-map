import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",
  initialState: {
    map: null,
  },
  reducers: {
    setMap: (state, action) => {
      state.map = action.payload;
    },
  },
});

//các action
export const { setMap } = mapSlice.actions;

//selector
export const mapSelector = (state) => state.map;

export default mapSlice.reducer;
