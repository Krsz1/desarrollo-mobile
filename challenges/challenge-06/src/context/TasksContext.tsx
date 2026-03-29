import { createContext } from "react";
import type { ReactNode } from "react";
import type { Task, TasksContextType } from "../types/task";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNetworkStatus } from "../hooks/useNetworkStatus";

export const TasksContext = createContext<TasksContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const TasksProvider = ({ children }: Props) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const { isOnline } = useNetworkStatus();

  const addTask = (task: Task) => {
    if (!isOnline) {
      console.warn("Cannot add task while offline");
      return;
    }

    setTasks(prev => [...prev, task]);
  };

  const deleteTask = (id: string) => {
    if (!isOnline) {
      console.warn("Cannot delete task while offline");
      return;
    }

    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleTask = (id: string) => {
    if (!isOnline) {
      console.warn("Cannot toggle task while offline");
      return;
    }

    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, deleteTask, toggleTask }}>
      {children}
    </TasksContext.Provider>
  );
};