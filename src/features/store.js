import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./auth/authSlice";
import mapReducer from "./map/mapSlice";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({ thunk: true, serializableCheck: false }),
  sagaMiddleware,
];

export const store = configureStore({
  reducer: {
    auth: authReducer,
    map: mapReducer,
  },
  middleware,
});

sagaMiddleware.run(rootSaga);

export default store;
