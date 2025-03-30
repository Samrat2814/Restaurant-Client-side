import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/HomePage/Home";
import Login from "../Pages/LoginPage/Login";
import SignIn from "../Pages/SignInPage/SignIn";
import AllFoods from "../Pages/AllFoods/AllFoods";
import Gallery from "../Pages/Gallery/Gallery";
import AddFoodForm from "../Pages/AddFoodForm/AddFoodForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/foods",
        element: <AllFoods/>,
      },
      {
        path: "/gallery",
        element: <Gallery/>,
      },
      {
        path: "/addFood",
        element: <AddFoodForm/>
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
]);

export default router;
