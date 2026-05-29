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
import { bookOutline, mapOutline, peopleOutline, logOutOutline } from "ionicons/icons";
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
              <IonLabel>Mi Diario</IonLabel>
            </IonItem>
            <IonItem button routerLink="/map" routerDirection="root">
              <IonIcon slot="start" icon={mapOutline} />
              <IonLabel>Mapa</IonLabel>
            </IonItem>
            <IonItem button routerLink="/feed" routerDirection="root">
              <IonIcon slot="start" icon={peopleOutline} />
              <IonLabel>Feed</IonLabel>
            </IonItem>
            <IonItem button onClick={handleLogout}>
              <IonIcon slot="start" icon={logOutOutline} />
              <IonLabel>Cerrar sesión</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
