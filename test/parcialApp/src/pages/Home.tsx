import {
  IonPage,
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonText,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { Mission } from "../types/Mission";
import { useCamera } from "../hooks/useCamera";
import { useGeolocation } from "../hooks/useGeolocation";
import { useHaptics } from "../hooks/useHaptics";
import { useNotifications } from "../hooks/useNotifications";

const Home: React.FC = () => {
  const { takePhoto } = useCamera();
  const { getLocation } = useGeolocation();
  const { vibrate } = useHaptics();
  const { notify } = useNotifications();

  const [missions, setMissions] = useState<Mission[]>([
    { id: 1, name: "Tomar foto", completed: false, points: 50 },
    { id: 2, name: "Moverse 30m", completed: false, points: 50 },
    { id: 3, name: "Quedarse quieto 10s", completed: false, points: 50 },
  ]);

  const [points, setPoints] = useState<number>(0);
  let start: any = null;

  const updateMission = (id: number) => {
    setMissions((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, completed: true } : m
      )
    );

    setPoints((prev) => prev + 50);

    notify("Misión completada", "Has ganado puntos 🎉");
  };

  // 📸 FOTO
  const handlePhoto = async () => {
    const photo = await takePhoto();
    if (photo) updateMission(1);
  };

  // 📍 MOVIMIENTO
  const handleMovement = async () => {
    const current = await getLocation();

    if (!start) {
      start = current;
      return;
    }

    const distance = Math.sqrt(
      Math.pow(current.latitude - start.latitude, 2) +
      Math.pow(current.longitude - start.longitude, 2)
    );

    if (distance > 0.0003) {
      updateMission(2);
    }
  };

  // 📳 QUIETO
  const handleStill = () => {
    setTimeout(() => {
      vibrate();
      updateMission(3);
    }, 10000);
  };

  // 📊 PROGRESO
  const completed = missions.filter((m) => m.completed).length;
  const progress = Math.round(
    (completed / missions.length) * 100
  );

  // 💾 GUARDAR LOCAL
  useEffect(() => {
    localStorage.setItem(
      "data",
      JSON.stringify({ missions, points })
    );
  }, [missions, points]);

  return (
    <IonPage>
      <IonContent className="ion-padding">

        <IonText>
          <h1>Misiones</h1>
          <p>Puntos: {points}</p>
          <p>Progreso: {progress}%</p>
        </IonText>

        {missions.map((m) => (
          <IonCard key={m.id}>
            <IonCardContent>
              <h2>{m.name}</h2>
              <p>
                {m.completed ? "✅ Completada" : "⏳ Pendiente"}
              </p>

              {!m.completed && m.id === 1 && (
                <IonButton onClick={handlePhoto}>
                  Tomar foto
                </IonButton>
              )}

              {!m.completed && m.id === 2 && (
                <IonButton onClick={handleMovement}>
                  Moverse
                </IonButton>
              )}

              {!m.completed && m.id === 3 && (
                <IonButton onClick={handleStill}>
                  Quedarse quieto
                </IonButton>
              )}
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;