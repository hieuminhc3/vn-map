import ErrorPage from "./error-page";
import { AuthenScreen, HomeScreen, UserScreen } from "../screens";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      {
        path: "/authen",
        element: <AuthenScreen />,
      },
      {
        path: "/user/profile/detail",
        element: <UserScreen />,
      },
    ],
  },
]);
