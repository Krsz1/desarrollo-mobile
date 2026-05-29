import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEntries } from "../../context/EntriesContext";
import MapMarker from "../../components/MapMarker/MapMarker";
import styles from "./MapView.module.scss";

// Fix Leaflet default icon paths in Vite
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIconPng,
  shadowUrl: markerShadow,
});

const DEFAULT_CENTER: [number, number] = [4.711, -74.0721]; // Bogotá

const MapView: React.FC = () => {
  const { entries } = useEntries();

  const center: [number, number] =
    entries.length > 0 && entries[0].latitude
      ? [entries[0].latitude, entries[0].longitude]
      : DEFAULT_CENTER;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mapa</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={styles.mapPage}>
        <div className={styles.mapContainer}>
          <MapContainer
            center={center}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {entries
              .filter((e) => e.latitude && e.longitude)
              .map((entry) => (
                <MapMarker key={entry.id} entry={entry} />
              ))}
          </MapContainer>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MapView;
