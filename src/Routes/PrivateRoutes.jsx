import React from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Components/SmallComponents/Loading";

const PrivateRoutes = ({children}) => {
const {user, loading} = useContext(AuthContext)
  const location = useLocation();
  if (loading) {
    return <Loading/>;
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/login"} />;
};

export default PrivateRoutes;
