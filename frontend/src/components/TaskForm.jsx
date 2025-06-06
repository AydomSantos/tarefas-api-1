import React, { useState, useEffect } from 'react';
import mockTasks from '../data/mockTasks.json'; 

const TaskForm = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [tasks, setTasks] = useState([]); 

    // Carregar tarefas do JSON ao montar o componente
    useEffect(() => {
        setTasks(mockTasks);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            id: tasks.length + 1, 
            name: taskName,
            description: taskDescription,
            status: 'pending',
        };
        setTasks([...tasks, newTask]); 
        setTaskName('');
        setTaskDescription('');
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
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Adicionar</button>
            </form>

            <h3 className="mt-4">Lista de Tarefas</h3>
            <ul className="list-group">
                {tasks.map((task) => (
                    <li key={task.id} className="list-group-item">
                        <strong>{task.name}</strong> - {task.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskForm;