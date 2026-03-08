import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { IonSpinner, IonContent, IonPage } from '@ionic/react';

interface ProtectedRouteProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ exact, path, component: Component }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <IonPage>
        <IonContent fullscreen className="ion-padding ion-text-center">
          <div style={{ marginTop: '50%', transform: 'translateY(-50%)' }}>
            <IonSpinner />
            <p>Cargando...</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <Route exact={exact} path={path}>
      {isLoggedIn ? <Component /> : <Redirect to="/login" />}
    </Route>
  );
};

export default ProtectedRoute;
