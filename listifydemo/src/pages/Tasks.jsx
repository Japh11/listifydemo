import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation.jsx';
import Subnote from './Subnotes.jsx';

const Tasks = () => {
    const [todos, setTodos] = useState([]);
    const [todoValue, setTodoValue] = useState('');
    const [editId, setEditId] = useState(null);
    const [taskStatus, setTaskStatus] = useState('Pending');

    const apiUrl = 'http://localhost:8080/api/task';

    // Function to fetch todos from the API
    const fetchTodos = async () => {
        try {
            const response = await axios.get(`${apiUrl}/getAllTasks`);
            const todosWithSubnotes = response.data.map(todo => ({
                ...todo,
                subnotes: Array.isArray(todo.subnotes) ? todo.subnotes : [],
            }));
            setTodos(todosWithSubnotes);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Function to handle adding/updating todos
    const handleAddTodos = async () => {
        if (!todoValue) {
            alert("Please enter a task");
            return;
        }

        try {
            if (editId) {
                // Prompt user for confirmation before updating
                const confirmUpdate = window.confirm("Are you sure you want to update this task?");
                if (confirmUpdate) {
                    await handleUpdate(editId, {
                        task: todoValue,
                        taskStatus: taskStatus,
                    });
                }
            } else {
                const response = await axios.post(`${apiUrl}/posttask`, {
                    task: todoValue,
                    taskStatus: taskStatus,
                });
                const newTodo = {
                    ...response.data,
                    subnotes: [],
                };
                setTodos(prevTodos => [...prevTodos, newTodo]);
            }
            resetTodoInput();
        } catch (error) {
            console.error("Error adding/updating task:", error);
            alert("An error occurred while adding/updating the task.");
        }
    };

    // Function to handle task update
    const handleUpdate = async (id, updatedTask) => {
        try {
            const response = await axios.put(`${apiUrl}/putTaskDetails/${id}`, updatedTask);
            setTodos(prevTodos =>
                prevTodos.map(todo => (todo.id === id ? { ...response.data, subnotes: [] } : todo))
            );
            resetTodoInput();
        } catch (error) {
            console.error("Error updating task:", error);
            alert("An error occurred while updating the task.");
        }
    };

    // Function to handle task deletion
    const handleDeleteTodo = async (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await axios.delete(`${apiUrl}/deleteTask/${id}`);
                setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
            } catch (error) {
                console.error("Error deleting task:", error);
                alert("An error occurred while deleting the task.");
            }
        }
    };

    // Function to remove the date from a task
    const handleRemoveDateFromTask = async (id) => {
        if (window.confirm("Are you sure you want to remove the date from this task?")) {
            try {
                await axios.post(`${apiUrl}/removeDate/${id}`);
                setTodos(prevTodos =>
                    prevTodos.map(todo => (todo.id === id ? { ...todo, date: null } : todo))
                );
            } catch (error) {
                console.error("Error removing date from task:", error);
                alert("An error occurred while removing the date from the task.");
            }
        }
    };

    // Function to initiate editing of a task
    const handleEditTodo = (id) => {
        const todoToEdit = todos.find(todo => todo.id === id);
        if (todoToEdit) {
            setTodoValue(todoToEdit.task);
            setTaskStatus(todoToEdit.taskStatus);
            setEditId(id);
        }
    };

    // Function to reset input fields
    const resetTodoInput = () => {
        setTodoValue('');
        setTaskStatus('Pending');
        setEditId(null);
    };

    // Fetch todos when component mounts
    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div>
            <Navigation />
            <div className="tasks-list">
                {todos.map((todo) => (
                    <div key={todo.id}>
                        <div className="task-item">
                            <div className="task-content" style={{ flex: 1 }}>
                                <h3 style={{ display: 'inline' }}>{todo.task}</h3>
                                <span className={`task-status ${todo.taskStatus.toLowerCase()}`} style={{ marginLeft: '10px', padding: '5px 10px', borderRadius: '5px', color: '#fff', backgroundColor: '#4A7652' }}>
                                    Status: {todo.taskStatus}
                                </span>
                            </div>
                            <div className="task-actions">
                                <button className="update-btn" onClick={() => handleEditTodo(todo.id)}>
                                    Update
                                </button>
                                <button className="delete-btn" onClick={() => handleDeleteTodo(todo.id)}>
                                    Delete
                                </button>
                                {/* Only show 'Remove Date' button if the task has a date */}
                                {todo.date && (
                                    <button className="remove-date-btn" onClick={() => handleRemoveDateFromTask(todo.id)}>
                                        Remove Date
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="subnotes-section">
                            <h4>Subnotes</h4>
                            <Subnote 
                                taskId={todo.id} 
                                subnotes={Array.isArray(todo.subnotes) ? todo.subnotes : []}
                                setSubnotes={(newSubnotes) => {
                                    setTodos(prevTodos =>
                                        prevTodos.map(item =>
                                            item.id === todo.id ? { ...item, subnotes: newSubnotes } : item
                                        )
                                    );
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="todo-input">
                <input
                    type="text"
                    value={todoValue}
                    onChange={(e) => setTodoValue(e.target.value)}
                    placeholder="Enter a task"
                />
                <select
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value)}
                >
                    <option value="Pending">Pending</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Done">Done</option>
                </select>
                <button onClick={handleAddTodos}>
                    {editId ? 'Update Task' : 'Add Task'}
                </button>
            </div>
        </div>
    );
};

export default Tasks;
