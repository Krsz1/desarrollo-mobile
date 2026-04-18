import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonProgressBar,
  IonBadge,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { Mission } from "../types/Mission";

interface DatosGuardados {
  missions: Mission[];
  points: number;
}

const Results: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [points, setPoints]     = useState<number>(0);

  useEffect(() => {
    const guardado = localStorage.getItem("data");
    if (guardado) {
      const datos: DatosGuardados = JSON.parse(guardado);
      setMissions(datos.missions);
      setPoints(datos.points);
    }
  }, []);

  const completadas    = missions.filter((m) => m.completed).length;
  const total          = missions.length;
  const progreso       = total > 0 ? completadas / total : 0;
  const todasCompletas = completadas === total && total > 0;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Resultados</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard
          style={{
            borderLeft: todasCompletas ? "4px solid #00c896" : "4px solid #f4a261",
          }}
        >
          <IonCardContent>
            <IonText>
              <h2>{todasCompletas ? "Todo completado" : "En progreso..."}</h2>
              <h3>
                Puntos totales:{" "}
                <strong style={{ color: "#00c896" }}>{points}</strong>
              </h3>
              <p>Misiones completadas: {completadas} / {total}</p>
            </IonText>
            <IonProgressBar
              value={progreso}
              color="success"
              style={{ height: 10, borderRadius: 5, marginTop: 8 }}
            />
            <p style={{ textAlign: "right", color: "#00c896", marginTop: 4 }}>
              {Math.round(progreso * 100)}%
            </p>
          </IonCardContent>
        </IonCard>

        {missions.map((mision) => (
          <IonCard key={mision.id}>
            <IonCardHeader>
              <IonCardTitle style={{ fontSize: 15 }}>{mision.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <IonBadge color={mision.completed ? "success" : "medium"}>
                  {mision.completed ? "Completada" : "Pendiente"}
                </IonBadge>
                <IonBadge color={mision.completed ? "success" : "medium"}>
                  {mision.completed ? `+${mision.points} pts` : "0 pts"}
                </IonBadge>
              </div>
            </IonCardContent>
          </IonCard>
        ))}

        <IonButton
          expand="block"
          fill="outline"
          routerLink="/ranking"
          style={{ marginTop: 16 }}
        >
          Ver Ranking
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Results;