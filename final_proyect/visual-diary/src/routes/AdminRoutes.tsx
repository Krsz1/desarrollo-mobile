import React from "react";
import { IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router-dom";

// Placeholder — extend with admin-only screens when needed
const AdminRoutes: React.FC = () => (
  <IonRouterOutlet>
    <Route render={() => <Redirect to="/home" />} />
  </IonRouterOutlet>
);

export default AdminRoutes;
