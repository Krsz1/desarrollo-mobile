import { useAuth } from "../hooks/useAuth";

const Tasks = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>Tasks</h2>
      <p>{user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Tasks;