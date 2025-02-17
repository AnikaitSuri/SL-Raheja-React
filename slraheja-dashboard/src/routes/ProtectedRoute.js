import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ element }) => {
  const authStatus = isAuthenticated();
  // console.log("ProtectedRoute - User Authenticated:", authStatus);

  return authStatus ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;