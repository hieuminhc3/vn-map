import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",
  initialState: {
    map: null,
    placeService: null,
    markers: [],
    placeText: null,
    placeType: null,
    searchText: null,
    planDataList: [],
  },
  reducers: {
    setMap: (state, action) => {
      state.map = action.payload;
    },
    setPlaceService: (state, action) => {
      state.placeService = action.payload;
    },
    setMarkers: (state, action) => {
      state.markers = action.payload;
    },
    setPlaceText: (state, action) => {
      state.placeText = action.payload;
    },
    setPlaceType: (state, action) => {
      state.placeType = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    pushMarker: (state, action) => {
      state.markers = state.markers.concat(action.payload);
    },
    setPlanDataList: (state, action) => {
      state.planDataList = action.payload;
    },
  },
});

//các action
export const {
  setMap,
  setPlaceService,
  setMarkers,
  setPlaceText,
  setPlaceType,
  setSearchText,
  pushMarker,
  setPlanDataList,
} = mapSlice.actions;

//selector
export const mapSelector = (state) => state.map;

export default mapSlice.reducer;
