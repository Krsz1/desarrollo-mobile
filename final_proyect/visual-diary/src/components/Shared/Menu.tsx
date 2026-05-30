import React from "react";
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";
import { bookOutline, mapOutline, peopleOutline, logOutOutline, shieldOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Menu: React.FC = () => {
  const { logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.replace("/login");
  };

  return (
    <IonMenu contentId="main-content">
      <IonContent>
        <IonList>
          <IonMenuToggle autoHide={false}>
            <IonItem button routerLink="/home" routerDirection="root">
              <IonIcon slot="start" icon={bookOutline} />
              <IonLabel>My Diary</IonLabel>
            </IonItem>
            <IonItem button routerLink="/map" routerDirection="root">
              <IonIcon slot="start" icon={mapOutline} />
              <IonLabel>Map</IonLabel>
            </IonItem>
            <IonItem button routerLink="/feed" routerDirection="root">
              <IonIcon slot="start" icon={peopleOutline} />
              <IonLabel>Feed</IonLabel>
            </IonItem>
            <IonItem button routerLink="/admin" routerDirection="root">
              <IonIcon slot="start" icon={shieldOutline} />
              <IonLabel>Profile</IonLabel>
            </IonItem>
            <IonItem button onClick={handleLogout}>
              <IonIcon slot="start" icon={logOutOutline} />
              <IonLabel>Sign out</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
