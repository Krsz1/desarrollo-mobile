import {
  IonButton,
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonText,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import { useGeolocation } from "../hooks/useGeolocation";
import { checkConnection } from "../services/networkService";
import { vibratePhone } from "../services/hapticsService";
import { getBatteryLevel } from "../services/batteryService";
import { saveTracking } from "../services/storageService";
import "./Home.css";

const Home: React.FC = () => {
  const position = useGeolocation();
  const history = useHistory();
  const [connected, setConnected] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkConnection().then(setConnected);
    getBatteryLevel().then((lvl) => setBatteryLevel(lvl ?? null));
  }, []);

  const startTracking = async () => {
    await vibratePhone();

    const battery = await getBatteryLevel();
    if (battery !== null && battery !== undefined && battery < 0.15) {
      setMessage("⚠️ Batería baja. Tracking detenido.");
      return;
    }

    if (position) {
      saveTracking({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        date: new Date().toISOString(),
      });
      setMessage("✅ Ubicación guardada en historial");
    } else {
      setMessage("⏳ Esperando GPS...");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Maps Challenge</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonCard>
          <IonCardContent>
            <p>
              📶 Internet: <strong>{connected ? "Conectado" : "Sin conexión"}</strong>
            </p>
            {batteryLevel !== null && (
              <p>
                🔋 Batería: <strong>{Math.round(batteryLevel * 100)}%</strong>
                {batteryLevel < 0.15 && <IonText color="danger"> — Baja</IonText>}
              </p>
            )}
            {position && (
              <p>
                📍 <strong>{position.coords.latitude.toFixed(5)}, {position.coords.longitude.toFixed(5)}</strong>
              </p>
            )}
          </IonCardContent>
        </IonCard>

        {position ? (
          <MapComponent
            lat={position.coords.latitude}
            lng={position.coords.longitude}
          />
        ) : (
          <IonCard>
            <IonCardContent>
              <p style={{ textAlign: "center", color: "#888" }}>⏳ Obteniendo ubicación GPS...</p>
            </IonCardContent>
          </IonCard>
        )}

        {message && (
          <p style={{ margin: "12px 0", fontWeight: 500 }}>{message}</p>
        )}

        <IonButton expand="block" onClick={startTracking} style={{ marginTop: "12px" }}>
          📍 Guardar ubicación actual
        </IonButton>

        <IonButton expand="block" fill="outline" onClick={() => history.push("/history")}>
          📋 Ver historial
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Home;

