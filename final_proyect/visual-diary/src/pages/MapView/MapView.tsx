import React, { useEffect, useRef, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import { MapContainer, TileLayer, useMap, CircleMarker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Geolocation } from "@capacitor/geolocation";
import { useEntries } from "../../context/EntriesContext";
import MapMarker from "../../components/MapMarker/MapMarker";
import styles from "./MapView.module.scss";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIconPng,
  shadowUrl: markerShadow,
});

const DEFAULT_CENTER: [number, number] = [4.711, -74.0721];

const ResizeMap: React.FC = () => {
  const map = useMap();
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 150);
    return () => clearTimeout(t);
  }, [map]);
  return null;
};

// Centers map on a given position once, after container is ready
const CenterOn: React.FC<{ pos: [number, number] | null }> = ({ pos }) => {
  const map = useMap();
  const applied = useRef<string | null>(null);
  useEffect(() => {
    if (!pos) return;
    const key = pos.join(",");
    if (applied.current === key) return;
    applied.current = key;
    const t = setTimeout(() => {
      map.invalidateSize();
      map.setView(pos, 15);
    }, 200);
    return () => clearTimeout(t);
  }, [pos, map]);
  return null;
};

const MapView: React.FC = () => {
  const { entries } = useEntries();
  const mapRef = useRef<L.Map | null>(null);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);

  const fetchLocation = async () => {
    try {
      const result = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });
      setUserPos([result.coords.latitude, result.coords.longitude]);
    } catch {
      // Fall back to first entry if GPS unavailable
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  useIonViewDidEnter(() => {
    mapRef.current?.invalidateSize();
    fetchLocation();
  });

  const validEntries = entries.filter((e) => e.latitude && e.longitude);

  // Priority: real-time GPS → first entry → default
  const centerTarget: [number, number] | null =
    userPos ??
    (validEntries.length > 0 ? [validEntries[0].latitude, validEntries[0].longitude] : null);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false} className={styles.mapPage}>
        <MapContainer
          center={DEFAULT_CENTER}
          zoom={13}
          className={styles.mapContainer}
          ref={(m) => { mapRef.current = m; }}
        >
          <ResizeMap />
          <CenterOn pos={centerTarget} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Real-time "You are here" dot */}
          {userPos && (
            <CircleMarker
              center={userPos}
              radius={10}
              pathOptions={{
                color: "#5B7FFF",
                fillColor: "#5B7FFF",
                fillOpacity: 0.9,
                weight: 3,
              }}
            >
              <Tooltip permanent direction="top" offset={[0, -12]}>
                You
              </Tooltip>
            </CircleMarker>
          )}
          {validEntries.map((entry) => (
            <MapMarker key={entry.id} entry={entry} />
          ))}
        </MapContainer>
      </IonContent>
    </IonPage>
  );
};

export default MapView;

