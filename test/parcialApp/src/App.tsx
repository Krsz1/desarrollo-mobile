import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Welcome  from './pages/Welcome';
import Login    from './pages/Login';
import Register from './pages/Register';
import Home    from './pages/Home';
import Results from './pages/Results';
import Ranking from './pages/Ranking';
import { AuthProvider } from './context/AuthContext';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/palettes/dark.always.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <AuthProvider>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/">      <Welcome />  </Route>
          <Route exact path="/login">    <Login />    </Route>
          <Route exact path="/register"> <Register /> </Route>
          <Route exact path="/home">    <Home />    </Route>
          <Route exact path="/results"> <Results /> </Route>
          <Route exact path="/ranking"> <Ranking /> </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </AuthProvider>
);

export default App;