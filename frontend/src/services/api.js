import axios from 'axios';
const API_BASE_URL = 'http://localhost:3000';

// função para obter tarefas
export const getTasks = async () => {
    try{
        const response = await axios.get(`${API_BASE_URL}/tasks`);
        return response.data;
    }catch (error) {
        console.error("Erro ao obter tarefas:", error);
        throw error;
    }
}

// função para adicionar uma nova tarefa
export const addTask = async (task) => {
    const response = await axios.post('http://localhost:3000/tasks', task);
    return response.data;
}

// função para atualizar uma tarefa
export const updateTask = async (task) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tasks/${task.id}`, task);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    throw error;
  }
};

// função para excluir uma tarefa
export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    throw error;
  }
};