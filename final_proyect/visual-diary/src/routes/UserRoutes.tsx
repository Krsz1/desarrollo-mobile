import React from "react";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";
import { bookOutline, mapOutline, peopleOutline } from "ionicons/icons";
import { Route, Redirect } from "react-router-dom";
import EntryList from "../pages/EntryList/EntryList";
import NewEntry from "../pages/NewEntry/NewEntry";
import EntryDetail from "../pages/EntryDetail/EntryDetail";
import MapView from "../pages/MapView/MapView";
import FeedView from "../pages/FeedView/FeedView";

const UserRoutes: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/home" component={EntryList} />
      <Route exact path="/new" component={NewEntry} />
      <Route exact path="/entry/:id" component={EntryDetail} />
      <Route exact path="/map" component={MapView} />
      <Route exact path="/feed" component={FeedView} />
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/home">
        <IonIcon icon={bookOutline} />
        <IonLabel>Diario</IonLabel>
      </IonTabButton>
      <IonTabButton tab="map" href="/map">
        <IonIcon icon={mapOutline} />
        <IonLabel>Mapa</IonLabel>
      </IonTabButton>
      <IonTabButton tab="feed" href="/feed">
        <IonIcon icon={peopleOutline} />
        <IonLabel>Feed</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default UserRoutes;
