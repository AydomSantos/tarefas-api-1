import React, { useState, useEffect } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from '../services/api';

const TaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [tasks, setTasks] = useState([]);

  // Carregar tarefas do backend ao montar o componente
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };
    fetchTasks();
  }, []);

  // Adicionar nova tarefa
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title: taskName,
      description: taskDescription, // Adiciona a descrição
      completed: false,
    };

    try {
      const addedTask = await addTask(newTask); // Adiciona a tarefa ao backend
      setTasks([...tasks, addedTask]); // Atualiza a lista de tarefas no frontend
      setTaskName('');
      setTaskDescription(''); 
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  // Atualizar tarefa (alternar status de concluído)
  const handleToggleComplete = async (task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed }; // Alterna o status
      const response = await updateTask(updatedTask); // Atualiza no backend
      setTasks(tasks.map((t) => (t.id === task.id ? response : t))); // Atualiza no frontend
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  // Excluir tarefa
  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId); // Exclui no backend
      setTasks(tasks.filter((task) => task.id !== taskId)); // Atualiza no frontend
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Adicionar Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="taskName" className="form-label">Título:</label>
          <input
            type="text"
            id="taskName"
            className="form-control"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="taskDescription" className="form-label">Descrição:</label>
          <textarea
            id="taskDescription"
            className="form-control"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            rows="3"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Adicionar</button>
      </form>

      <h3 className="mt-4">Lista de Tarefas</h3>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{task.title}</strong> - {task.description || 'Sem descrição'} - {task.completed ? 'Concluído' : 'Pendente'}
            </div>
            <div>
              <button
                className="btn btn-sm btn-success me-2"
                onClick={() => handleToggleComplete(task)}
              >
                {task.completed ? 'Desmarcar' : 'Concluir'}
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(task.id)}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskForm;