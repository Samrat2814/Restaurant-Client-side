import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/HomePage/Home";
import Login from "../Pages/LoginPage/Login";
import SignIn from "../Pages/SignInPage/SignIn";
import AllFoods from "../Pages/AllFoods/AllFoods";
import Gallery from "../Pages/Gallery/Gallery";
import AddFoodForm from "../Pages/AddFoodForm/AddFoodForm";
import PageDetails from "../Pages/PageDetails/PageDetails";
import FoodPurchasePage from "../Pages/FoodPurchasePage/FoodPurchasePage";
import MyFoods from "../Pages/MyFoods/MyFoods";
import MyOrders from "../Pages/MyOrders/MyOrders";
import PrivateRoutes from "./PrivateRoutes";

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
        path: "/all-foods",
        element: <AllFoods />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/addFood",
        element: <AddFoodForm />,
      },
      {
        path: "/page-details/:id",
        element: <PageDetails />,
        loader: async ({ params }) => {
          const response = await fetch(
            `http://localhost:5000/items/${params.id}`
          );
          if (!response.ok) {
            throw new Response("Food item not found", { status: 404 });
          }
          return response.json(); // Parse the response body as JSON
        },
      },
      {
        path: "food-purchase",
        element: (
          <PrivateRoutes>
            <FoodPurchasePage />
          </PrivateRoutes>
        ),
      },
      {
        path: "my-foods",
        element: <MyFoods />,
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoutes>
            <MyOrders />
          </PrivateRoutes>
        ),
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
