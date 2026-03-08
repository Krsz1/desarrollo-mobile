import React from 'react';
import { IonItem, IonLabel, IonCheckbox, IonButton, IonIcon } from '@ionic/react';
import { trash } from 'ionicons/icons';
import './TaskItem.css';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  return (
    <IonItem className={`task-item ${task.completed ? 'completed' : ''}`}>
      <IonCheckbox
        slot="start"
        checked={task.completed}
        onIonChange={() => onToggleComplete(task.id)}
      />
      <IonLabel>
        <h2 className="task-title">{task.title}</h2>
        {task.description && <p className="task-description">{task.description}</p>}
        <p className="task-date">{new Date(task.createdAt).toLocaleDateString()}</p>
      </IonLabel>
      <IonButton
        fill="clear"
        color="danger"
        slot="end"
        onClick={() => onDelete(task.id)}
      >
        <IonIcon icon={trash} />
      </IonButton>
    </IonItem>
  );
};

export default TaskItem;
