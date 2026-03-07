import { useState } from "react";
import type { User } from "./services/auth";
import { getCurrentUser, logout } from "./services/auth";

import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/Dashboard";

import "./App.css";

const App = () => {
  const [usuario, setUsuario] = useState<User | null>(() => getCurrentUser());

  const handleLogin = (user: User) => {
    setUsuario(user);
  };

  const handleLogout = () => {
    logout();
    setUsuario(null);
  };

  if (!usuario) {
    return (
      <div className="app-root">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return <Dashboard user={usuario} onLogout={handleLogout} />;
};

export default App;