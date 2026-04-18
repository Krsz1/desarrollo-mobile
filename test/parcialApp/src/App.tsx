import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Home from './pages/Home';
import Results from './pages/Results';
import Ranking from './pages/Ranking';

/* CSS Ionic */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/flex-utils.css';

/* DARK MODE (IMPORTANTE 🔥) */
import '@ionic/react/css/palettes/dark.always.css';

/* Theme */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>

        <Route exact path="/home">
          <Home />
        </Route>

        <Route exact path="/results">
          <Results />
        </Route>

        <Route exact path="/ranking">
          <Ranking />
        </Route>

        <Route exact path="/">
          <Redirect to="/home" />
        </Route>

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;