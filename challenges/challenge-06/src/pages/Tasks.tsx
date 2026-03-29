import { useTasks } from "../hooks/useTasks";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { v4 as uuid } from "uuid";
import { useNetworkStatus } from "../hooks/useNetworkStatus"; // 

const Tasks = () => {
  const { tasks, addTask, deleteTask, toggleTask } = useTasks();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { isOnline } = useNetworkStatus(); 

  const { values, handleChange, reset } = useForm({ title: "", description: "" });

  const handleAdd = () => {
    if (!values.title || !isOnline) return; // valida internet

    addTask({
      id: uuid(),
      title: values.title,
      description: values.description,
      completed: false
    });

    reset();
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0 }}>Tasks</h2>
        <button
          style={{ width: "auto", padding: "8px 16px" }}
          onClick={() => { logout(); navigate("/"); }}
        >
          Logout
        </button>
      </div>

      {/* NO WIFI */}
      {!isOnline && <p style={{ color: "red" }}>Sin conexión a internet</p>}

      <input
        name="title"
        placeholder="Title"
        value={values.title}
        onChange={handleChange}
        disabled={!isOnline} 
      />

      <input
        name="description"
        placeholder="Description"
        value={values.description}
        onChange={handleChange}
        disabled={!isOnline}
      />

      {/* BOTÓN DESHABILITADO */}
      <button onClick={handleAdd} disabled={!isOnline}>
        Add Task
      </button>

      {tasks.map(task => (
        <div key={task.id} className="task">
          <h4 className={task.completed ? "done" : ""}>
            {task.title}
          </h4>

          <p>{task.description}</p>

          <div className="task-buttons">
            {/* TAMBIÉN DESHABILITAR ESTOS */}
            <button onClick={() => toggleTask(task.id)} disabled={!isOnline}>
              {task.completed ? "Undo" : "Done"}
            </button>

            <button onClick={() => deleteTask(task.id)} disabled={!isOnline}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;