import React, { useState } from 'react';
import NavBar from './components/NavBar';
import TaskForm from './components/TaskForm';


const App = () => {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    return (
        <div>
            <NavBar />
            <div className="container mt-4">
                <TaskForm addTask={addTask} />
            </div>
        </div>
    );
};

export default App;