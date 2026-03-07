import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from "@ionic/react"

import { Route, Redirect } from "react-router-dom"

import { list, people, person } from "ionicons/icons"

import VisitasPage from "./pages/VisitasPage"
import DetalleVisitaPage from "./pages/DetalleVisitaPage"
import MisPacientesPage from "./pages/MisPacientesPage"
import PerfilMedicoPage from "./pages/PerfilMedicoPage"

const Tabs = () => {

  return (

    <IonTabs>

      <IonRouterOutlet>

        <Route exact path="/visitas" component={VisitasPage} />
        <Route path="/visitas/:id" component={DetalleVisitaPage} />

        <Route path="/pacientes" component={MisPacientesPage} />
        <Route path="/perfil" component={PerfilMedicoPage} />

        <Redirect exact from="/" to="/visitas" />

      </IonRouterOutlet>

      <IonTabBar slot="bottom">

        <IonTabButton tab="visitas" href="/visitas">
          <IonIcon icon={list} />
          <IonLabel>Visitas</IonLabel>
        </IonTabButton>

        <IonTabButton tab="pacientes" href="/pacientes">
          <IonIcon icon={people} />
          <IonLabel>Pacientes</IonLabel>
        </IonTabButton>

        <IonTabButton tab="perfil" href="/perfil">
          <IonIcon icon={person} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>

      </IonTabBar>

    </IonTabs>

  )

}

export default Tabs
