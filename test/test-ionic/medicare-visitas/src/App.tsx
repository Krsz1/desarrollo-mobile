import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useState, useEffect } from 'react';

import LoginPage from './pages/LoginPage';
import Tabs from './Tabs';
import { getCurrentUser } from './services/authService';
import { Usuario } from './types';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {

  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loggedUser = getCurrentUser();
    setUser(loggedUser);
    setIsLoading(false);
  }, []);

  const handleLogin = (userData: Usuario) => {
    setUser(userData);
  };

  if (isLoading) {
    return <IonApp></IonApp>;
  }

  return (
    <IonApp>
      <IonReactRouter>
        {!user ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <Tabs />
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
