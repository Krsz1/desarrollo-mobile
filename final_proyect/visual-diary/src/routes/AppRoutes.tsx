import React from "react";
import { IonRouterOutlet, IonSpinner } from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { EntriesProvider } from "../context/EntriesContext";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import UserRoutes from "./UserRoutes";

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IonSpinner name="crescent" />
      </div>
    );
  }

  if (!user) {
    return (
      <IonRouterOutlet>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route render={() => <Redirect to="/login" />} />
      </IonRouterOutlet>
    );
  }

  return (
    <EntriesProvider>
      <UserRoutes />
    </EntriesProvider>
  );
};

export default AppRoutes;
