import { useTasks } from "../hooks/useTasks";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { v4 as uuid } from "uuid";

const Tasks = () => {
  const { tasks, addTask, deleteTask, toggleTask } = useTasks();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { values, handleChange, reset } = useForm({ title: "", description: "" });

  const handleAdd = () => {
    if (!values.title) return;

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

      <input
        name="title"
        placeholder="Title"
        value={values.title}
        onChange={handleChange}
      />

      <input
        name="description"
        placeholder="Description"
        value={values.description}
        onChange={handleChange}
      />

      <button onClick={handleAdd}>Add Task</button>

      {tasks.map(task => (
        <div key={task.id} className="task">
          <h4 className={task.completed ? "done" : ""}>
            {task.title}
          </h4>

          <p>{task.description}</p>

          <div className="task-buttons">
            <button onClick={() => toggleTask(task.id)}>
              {task.completed ? "Undo" : "Done"}
            </button>

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;