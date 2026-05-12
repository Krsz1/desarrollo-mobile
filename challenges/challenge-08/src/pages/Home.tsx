import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoService";
import "./Home.css";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const data = await getTodos();
    setTodos(data.slice(0, 10));
  };

  const handleCreate = async () => {
    const newTodo = await createTodo();
    alert("Tarea creada");
    console.log(newTodo);
  };

  const handleUpdate = async () => {
    const updated = await updateTodo(1);
    alert("Tarea actualizada");
    console.log(updated);
  };

  const handleDelete = async () => {
    await deleteTodo(1);
    alert("Tarea eliminada");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>API Challenge</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonButton expand="block" onClick={handleCreate}>
          POST - Crear
        </IonButton>

        <IonButton expand="block" onClick={handleUpdate}>
          PUT - Actualizar
        </IonButton>

        <IonButton expand="block" color="danger" onClick={handleDelete}>
          DELETE - Eliminar
        </IonButton>

        <IonList>
          {todos.map((todo) => (
            <IonItem key={todo.id}>
              <IonLabel>{todo.title}</IonLabel>
            </IonItem>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Home;

