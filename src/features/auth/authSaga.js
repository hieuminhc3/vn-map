import { call, put, takeLatest } from "redux-saga/effects";
import { login, setLoginSuccess } from "./authSlice";
import authApi from "../../services/authApi";
import { toast } from "react-toastify";

function* loginSaga(action) {
  const rs = yield call(authApi.login, action.payload);
  if (rs && rs.code === 2000) {
    yield put(setLoginSuccess(rs.data));
  } else {
    toast.error(rs.errors[0].errorMessage, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
}

export default function* authSaga() {
  yield takeLatest(login, loginSaga);
}
