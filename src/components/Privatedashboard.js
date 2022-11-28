import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Privatedashboard() {
  const auth = localStorage.getItem("userdata");
  return auth ? <Outlet /> : <Navigate to="signup" />;
}

export default Privatedashboard;
