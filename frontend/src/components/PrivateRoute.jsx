// frontend/src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../api";

/**
 * 🔒 PrivateRoute Component
 * -------------------------
 * Protects routes that require authentication.
 * If the user is not logged in (no token), they are redirected to the login page.
 * 
 * Usage:
 * <Route element={<PrivateRoute />}>
 *    <Route path="/dashboard" element={<Dashboard />} />
 * </Route>
 */

const PrivateRoute = () => {
  const authenticated = isLoggedIn();

  return authenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
