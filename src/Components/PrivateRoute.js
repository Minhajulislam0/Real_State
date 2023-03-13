import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "./../Hooks/useAuthStatus";

export default function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <h3 className="text-center">Loading...</h3>;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
