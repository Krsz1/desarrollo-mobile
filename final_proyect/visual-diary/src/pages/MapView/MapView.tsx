import React, { useEffect, useRef, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import { MapContainer, TileLayer, CircleMarker, useMap } from "react-leaflet";
import { Geolocation } from "@capacitor/geolocation";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
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

const SetInitialView: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  const prevCenter = useRef<string>("");
  useEffect(() => {
    const key = center.join(",");
    if (prevCenter.current === key) return;
    if (center[0] === DEFAULT_CENTER[0] && center[1] === DEFAULT_CENTER[1]) return;
    prevCenter.current = key;
    const t = setTimeout(() => {
      map.invalidateSize();
      map.setView(center, 15);
    }, 200);
    return () => clearTimeout(t);
  }, [center, map]);
  return null;
};

const MapView: React.FC = () => {
  const { entries } = useEntries();
  const mapRef = useRef<L.Map | null>(null);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const watchIdRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const startWatch = async () => {
      try {
        // watchPosition delivers network position first (fast), then refines with GPS
        watchIdRef.current = await Geolocation.watchPosition(
          { enableHighAccuracy: true, timeout: 10000 },
          (pos) => {
            if (!cancelled && pos) {
              setUserPos([pos.coords.latitude, pos.coords.longitude]);
            }
          }
        );
      } catch { /* no permission */ }
    };

    startWatch();

    return () => {
      cancelled = true;
      if (watchIdRef.current !== null) {
        Geolocation.clearWatch({ id: watchIdRef.current });
        watchIdRef.current = null;
      }
    };
  }, []);

  useIonViewDidEnter(() => {
    mapRef.current?.invalidateSize();
  });

  const validEntries = entries.filter((e) => e.latitude && e.longitude);

  // Priority: real GPS → first saved entry → Bogotá default
  const center: [number, number] =
    userPos ??
    (validEntries.length > 0
      ? [validEntries[0].latitude, validEntries[0].longitude]
      : DEFAULT_CENTER);

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
          <SetInitialView center={center} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
          />
          {userPos && (
            <>
              {/* Outer glow ring */}
              <CircleMarker
                center={userPos}
                radius={18}
                pathOptions={{
                  color: "#8B1E3F",
                  fillColor: "transparent",
                  fillOpacity: 0,
                  weight: 1.5,
                  opacity: 0.35,
                }}
              />
              {/* Inner solid dot */}
              <CircleMarker
                center={userPos}
                radius={7}
                pathOptions={{
                  color: "#A12C4F",
                  fillColor: "#8B1E3F",
                  fillOpacity: 0.95,
                  weight: 2,
                }}
              />
            </>
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
