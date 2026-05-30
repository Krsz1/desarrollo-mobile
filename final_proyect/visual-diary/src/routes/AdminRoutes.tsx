import React from "react";
import { Route } from "react-router-dom";
import UserProfile from "../pages/UserProfile/UserProfile";

// AdminRoutes: gestiona las rutas del perfil del usuario (/admin → UserProfile)
const AdminRoutes: React.FC = () => (
  <Route exact path="/admin" component={UserProfile} />
);

export default AdminRoutes;
