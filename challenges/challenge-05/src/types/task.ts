export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface TasksContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
}