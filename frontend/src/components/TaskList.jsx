import React from 'react';

const TaskList = ({ tasks }) => {
    return (
        <div className="container mt-4">
            <h2 className="mb-3">Lista de Tarefas</h2>
            {tasks && tasks.length > 0 ? (
                <ul className="list-group">
                    {tasks.map((task, index) => (
                        <li key={index} className="list-group-item">
                            <strong>{task.name}</strong> - {task.description}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted">Nenhuma tarefa disponível.</p>
            )}
        </div>
    );
};

export default TaskList;