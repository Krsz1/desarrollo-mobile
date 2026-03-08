import React from 'react';
import { IonList, IonListHeader, IonLabel } from '@ionic/react';
import TaskItem from './TaskItem';
import './TaskList.css';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDelete }) => {
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="task-list-container">
      <IonListHeader>
        <IonLabel>
          <h2>Mis Tareas</h2>
          <p className="tasks-summary">
            {pendingCount} pendiente{pendingCount !== 1 ? 's' : ''} · {completedCount} completada{completedCount !== 1 ? 's' : ''}
          </p>
        </IonLabel>
      </IonListHeader>
      
      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>📝 No hay tareas aún. ¡Crea una para comenzar!</p>
        </div>
      ) : (
        <IonList>
          {/* Tareas pendientes */}
          {tasks.filter(t => !t.completed).length > 0 && (
            <>
              <div className="task-section-header">
                <span>Pendientes</span>
              </div>
              {tasks
                .filter(t => !t.completed)
                .map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                  />
                ))}
            </>
          )}

          {/* Tareas completadas */}
          {tasks.filter(t => t.completed).length > 0 && (
            <>
              <div className="task-section-header">
                <span>Completadas</span>
              </div>
              {tasks
                .filter(t => t.completed)
                .map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                  />
                ))}
            </>
          )}
        </IonList>
      )}
    </div>
  );
};

export default TaskList;
