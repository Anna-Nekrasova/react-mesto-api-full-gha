import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...props }) => {
  return (
    props.isloggedIn ? <Component {...props} /> : <Navigate to="./signin" replace/>)
};

export default ProtectedRoute;
