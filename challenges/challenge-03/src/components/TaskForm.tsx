import React, { useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonInput,
  IonTextarea,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import './TaskForm.css';

interface TaskFormProps {
  onAddTask: (title: string, description: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      onAddTask(title, description);
      setTitle('');
      setDescription('');
    }
  };

  const isFormValid = title.trim().length > 0;

  return (
    <IonCard className="task-form-card">
      <IonCardContent>
        <h2 className="form-title">Nueva Tarea</h2>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonInput
                placeholder="Título de la tarea *"
                value={title}
                onIonChange={(e) => setTitle(e.detail.value || '')}
                className="task-input"
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonTextarea
                placeholder="Descripción (opcional)"
                value={description}
                onIonChange={(e) => setDescription(e.detail.value || '')}
                rows={3}
                className="task-textarea"
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonButton
                expand="block"
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="submit-button"
              >
                <IonIcon icon={add} slot="start" />
                Agregar Tarea
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default TaskForm;
