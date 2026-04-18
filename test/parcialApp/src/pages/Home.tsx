import {
  IonPage,
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonProgressBar,
  IonBadge,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { useState, useEffect, useRef } from "react";
import { signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { Mission } from "../types/Mission";
import { useCamera } from "../hooks/useCamera";
import { useGeolocation } from "../hooks/useGeolocation";
import { useHaptics } from "../hooks/useHaptics";
import { useNotifications } from "../hooks/useNotifications";
import { useMotion } from "../hooks/useMotion";
import { useHistory } from "react-router-dom";

const MISIONES_INICIAL: Mission[] = [
  { id: 1, name: "📸 Tomar foto",               points: 50, completed: false },
  { id: 2, name: "🚶 Moverse 30 metros",         points: 50, completed: false },
  { id: 3, name: "🧍 Quedarse quieto 10 segundos", points: 50, completed: false },
];

const Home: React.FC = () => {
  const { takePhoto }   = useCamera();        // 📸 Cámara
  const { getLocation } = useGeolocation();   // 📍 GPS
  const { vibrate }     = useHaptics();       // 📳 Vibración
  const { notify }      = useNotifications(); // 🔔 Notificaciones
  const { waitStill }   = useMotion();        // 🏃 Acelerómetro

  const history = useHistory();

  const [missions, setMissions] = useState<Mission[]>(MISIONES_INICIAL);
  const [points, setPoints]     = useState<number>(0);

  const [midiendo, setMidiendo] = useState(false);

  const posicionInicial = useRef<{ latitude: number; longitude: number } | null>(null);
  const [posGuardada, setPosGuardada] = useState(false); 

  useEffect(() => {
    const guardado = localStorage.getItem("data");
    if (guardado) {
      const datos = JSON.parse(guardado);
      setMissions(datos.missions);
      setPoints(datos.points);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify({ missions, points }));

    const usuario = auth.currentUser;
    if (usuario) {
      setDoc(
        doc(db, "users", usuario.uid),
        { name: usuario.email, email: usuario.email, missions, points },
        { merge: true } 
      ).catch(() => {
      });
    }
  }, [missions, points]);

  const completarMision = (id: number) => {
    setMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: true } : m))
    );
    setPoints((prev) => prev + 50);

    const pendientes = missions.filter((m) => !m.completed && m.id !== id).length;
    if (pendientes === 0) {
      notify("🏆 ¡FELICITACIONES!", "¡Completaste todas las misiones!");
    } else if (pendientes === 1) {
      notify("🎯 Misión completada!", "¡Te falta 1 misión para completar!");
    } else {
      notify("🎉 Misión completada", `Has ganado puntos. Te quedan ${pendientes} misiones.`);
    }
  };


  const handleFoto = async () => {
    const foto = await takePhoto(); 
    if (foto) {
      completarMision(1); 
    }
  };


  const handleMover = async () => {
    const ubicacion = await getLocation(); 


    if (!posicionInicial.current) {
      posicionInicial.current = {
        latitude: ubicacion.latitude,
        longitude: ubicacion.longitude,
      };
      setPosGuardada(true);
      alert("📍 Posición guardada.\n¡Ahora camina ~30 metros y vuelve a presionar!");
      return;
    }

    const distancia = Math.sqrt(
      Math.pow(ubicacion.latitude  - posicionInicial.current.latitude,  2) +
      Math.pow(ubicacion.longitude - posicionInicial.current.longitude, 2)
    );

    if (distancia > 0.0003) {
      completarMision(2); 
    } else {
      alert("📍 Aún no alcanzas los 30 metros. Sigue caminando.");
    }
  };


  const handleQuieto = () => {
    const mision2Ok = missions.find((m) => m.id === 2)?.completed;
    if (!mision2Ok) {
      alert("Primero debes completar la Misión 2 (moverse 30m).");
      return;
    }

    setMidiendo(true); 
    alert("¡Quédate completamente quieto durante 10 segundos!");

    waitStill(10, () => {
      setMidiendo(false);
      vibrate();           
      completarMision(3);  
    });
  };

  const completadas = missions.filter((m) => m.completed).length;
  const progreso    = completadas / missions.length; 

  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem("data");
    history.push("/login");
  };

  return (
    <IonPage>

      {/* app */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>🎯 Misiones</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        {/*PUNTOS Y PROGRESO ── */}
        <IonCard>
          <IonCardContent>
            <IonText>
              <h2>⭐ Puntos: <strong style={{ color: "#00c896" }}>{points}</strong></h2>
              <p style={{ margin: "4px 0 8px" }}>
                {completadas} de {missions.length} misiones completadas
              </p>
            </IonText>
            {/* value va de 0 a 1 */}
            <IonProgressBar value={progreso} color="success" style={{ height: 10, borderRadius: 5 }} />
            <p style={{ textAlign: "right", color: "#00c896", marginTop: 4 }}>
              {Math.round(progreso * 100)}%
            </p>
          </IonCardContent>
        </IonCard>

        {/*TARJETAS MISIONES*/}
        {missions.map((mision) => (
          <IonCard
            key={mision.id}
            style={{
              opacity:    mision.completed ? 0.6 : 1,
              borderLeft: mision.completed ? "4px solid #00c896" : "4px solid #444",
            }}
          >
            <IonCardHeader>
              <IonCardTitle style={{ fontSize: 15 }}>{mision.name}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                {/*estado + puntos */}
                <IonBadge color={mision.completed ? "success" : "medium"}>
                  {mision.completed ? "✅ Completada" : "⏳ Pendiente"} · {mision.points} pts
                </IonBadge>

                {/* Botón de acción según la misión*/}

                {!mision.completed && mision.id === 1 && (
                  <IonButton size="small" onClick={handleFoto}>
                    Tomar foto
                  </IonButton>
                )}

                {!mision.completed && mision.id === 2 && (
                  <IonButton size="small" onClick={handleMover}>
                    {posGuardada ? "Verificar" : "Empezar"}
                  </IonButton>
                )}

                {!mision.completed && mision.id === 3 && (
                  <IonButton
                    size="small"
                    onClick={handleQuieto}
                    disabled={midiendo || !missions.find((m) => m.id === 2)?.completed}
                  >
                    {midiendo ? "Midiendo..." : "Empezar"}
                  </IonButton>
                )}

              </div>
            </IonCardContent>
          </IonCard>
        ))}

        {/*BOTONES NAVEGACIÓN*/}
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <IonButton expand="block" fill="outline" routerLink="/results" style={{ flex: 1 }}>
            Resultados
          </IonButton>
          <IonButton expand="block" fill="outline" routerLink="/ranking" style={{ flex: 1 }}>
            Ranking
          </IonButton>
        </div>

        {/* Cerrar sesión */}
        <IonButton
          expand="block"
          fill="clear"
          color="medium"
          style={{ marginTop: 8 }}
          onClick={handleLogout}
        >
          Cerrar sesión
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Home;