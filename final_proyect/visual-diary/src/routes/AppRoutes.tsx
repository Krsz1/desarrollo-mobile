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
          flexDirection: "column",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(139,30,63,0.16) 0%, transparent 65%), #121218",
          gap: "20px",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            background: "linear-gradient(135deg, #6E1F32, #A12C4F)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            boxShadow: "0 8px 32px rgba(139,30,63,0.38), 0 0 0 1px rgba(161,44,79,0.2)",
          }}
        >
          🌙
        </div>
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "2rem",
            fontWeight: 700,
            background: "linear-gradient(135deg, #C4607A 0%, #8B1E3F 50%, #A12C4F 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "1px",
          }}
        >
          Lunara
        </span>
        <IonSpinner name="dots" style={{ color: "#8B1E3F", width: 36, height: 36 }} />
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
