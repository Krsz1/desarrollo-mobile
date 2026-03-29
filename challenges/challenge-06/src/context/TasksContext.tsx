import { createContext } from "react";
import type { ReactNode } from "react";
import type { Task, TasksContextType } from "../types/task";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const TasksContext = createContext<TasksContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const TasksProvider = ({ children }: Props) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

  const addTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleTask = (id: string) => {
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