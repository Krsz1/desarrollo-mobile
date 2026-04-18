import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../hooks/useAuth";

interface RankingEntry {
  uid: string;
  name: string;
  points: number;
}

const Ranking: React.FC = () => {
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [cargando, setCargando] = useState(true);

  const { user } = useAuth();
  const miUid = user?.uid;

  useEffect(() => {
    const cargarRanking = async () => {
      try {
        const consulta = query(
          collection(db, "users"),
          orderBy("points", "desc"),
          limit(10)
        );
        const resultado = await getDocs(consulta);
        const lista: RankingEntry[] = resultado.docs.map((docSnap) => ({
          uid:    docSnap.id,
          name:   docSnap.data().name || docSnap.data().email || "Usuario",
          points: docSnap.data().points || 0,
        }));
        setRanking(lista);
      } catch {
        const guardado = localStorage.getItem("data");
        const misPoints = guardado ? JSON.parse(guardado).points : 0;
        const fallback: RankingEntry[] = [
          { uid: "u1",  name: "Ana",    points: 200 },
          { uid: "u2",  name: "Luis",   points: 150 },
          { uid: "u3",  name: "Carlos", points: 120 },
          { uid: "u4",  name: "Maria",  points: 80  },
          { uid: miUid || "yo", name: "Tu", points: misPoints },
        ].sort((a, b) => b.points - a.points);
        setRanking(fallback);
      } finally {
        setCargando(false);
      }
    };
    cargarRanking();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Ranking</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonText>
          <p style={{ color: "#aaa", marginBottom: 12 }}>Top jugadores por puntos</p>
        </IonText>

        {cargando && (
          <p style={{ textAlign: "center", color: "#aaa" }}>Cargando ranking...</p>
        )}

        {!cargando && (
          <IonList>
            {ranking.map((entrada, index) => (
              <IonItem
                key={entrada.uid}
                style={entrada.uid === miUid ? { "--background": "#1a3a2a" } : {}}
              >
                <div
                  slot="start"
                  style={{ fontSize: 18, width: 32, textAlign: "center" }}
                >
                  #{index + 1}
                </div>

                <IonLabel>
                  <h2>
                    {entrada.name}
                    {entrada.uid === miUid ? " (Tu)" : ""}
                  </h2>
                </IonLabel>

                <IonBadge
                  slot="end"
                  color={entrada.uid === miUid ? "success" : "primary"}
                >
                  {entrada.points} pts
                </IonBadge>
              </IonItem>
            ))}
          </IonList>
        )}

        <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
          <IonButton expand="block" fill="outline" routerLink="/home" style={{ flex: 1 }}>
            Misiones
          </IonButton>
          <IonButton expand="block" fill="outline" routerLink="/results" style={{ flex: 1 }}>
            Resultados
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Ranking;