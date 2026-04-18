import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// Pantallas de autenticación
import Login    from './pages/Login';
import Register from './pages/Register';

// Pantallas principales
import Home    from './pages/Home';
import Results from './pages/Results';
import Ranking from './pages/Ranking';

/* CSS base de Ionic */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/flex-utils.css';

/* Modo oscuro siempre activo */
import '@ionic/react/css/palettes/dark.always.css';

/* Colores personalizados */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>

        {/* Pantallas de login y registro */}
        <Route exact path="/login">    <Login />    </Route>
        <Route exact path="/register"> <Register /> </Route>

        {/* Pantallas principales */}
        <Route exact path="/home">    <Home />    </Route>
        <Route exact path="/results"> <Results /> </Route>
        <Route exact path="/ranking"> <Ranking /> </Route>

        {/* Por defecto, ir al login */}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;