import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTodo = async () => {
  const response = await axios.post(API_URL, {
    title: "Nueva tarea",
    completed: false,
  });
  return response.data;
};

export const updateTodo = async (id: number) => {
  const response = await axios.put(`${API_URL}/${id}`, {
    title: "Tarea actualizada",
    completed: true,
  });
  return response.data;
};

export const deleteTodo = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
