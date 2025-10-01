import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Backend_base_url = import.meta.env.VITE_API_URL;

function App() {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        // Fetch todos from the backend API
        axios
            .get(Backend_base_url)
            .then((response) => {
                setTodos(response.data);
            })
            .catch((error) => console.error('Error fetching todos:', error));
    }, []);

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const handleDelete = (id) => {
        // Handle task deletion
        setTodos(todos.filter((todo) => todo._id !== id));
        axios
            .delete(`${Backend_base_url}/${id}`)
            .then((response) => {
                console.log('Todo deleted:', response.data);
            })
            .catch((error) => console.error('Error deleting todo:', error));
    };

    const handleComplete = (id) => {
        setTodos(
            todos.map((todo) => (todo._id === id ? { ...todo, completed: !todo.completed } : todo))
        );
        axios
            .put(`${Backend_base_url}/${id}`, { completed: true })
            .then((response) => {
                console.log('Todo updated:', response.data);
            })
            .catch((error) => console.error('Error updating todo:', error));
    };

    const handleFormSubmit = () => {
        // e.preventDefault();
        // Handle form submission to add a new task
        if (newTask.trim()) {
            axios
                .post('http://localhost:8000/todos', { task: newTask })
                .then((response) => {
                    setTodos([...todos, response.data]);
                    setNewTask('');
                })
                .catch((error) => console.error('Error adding todo:', error));
        }
    };

    return (
        <>
            {/* creating a todo app */}
            <div className="min-h-screen bg-gray-100 p-4">
                <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4">Todo App</h1>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Enter a new task"
                            className="w-full p-2 border border-gray-300 rounded mb-2"
                            value={newTask}
                            onChange={handleInputChange}
                        />
                        <button
                            onClick={() => {
                                handleFormSubmit();
                                setNewTask('');
                            }}
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Add Task
                        </button>
                    </div>
                    <ul>
                        {todos.map((todo) => (
                            <li key={todo._id} className="flex items-center justify-between mb-2">
                                <span
                                    className={todo.completed ? 'line-through text-gray-500' : ''}
                                >
                                    {todo.task}
                                </span>
                                <button
                                    className="text-red-500 hover:underline"
                                    onClick={() => handleDelete(todo._id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className={`ml-4 ${todo.completed ? 'text-green-500' : 'text-red-500'} hover:underline `}
                                    onClick={() => {
                                        handleComplete(todo._id);
                                    }}
                                >
                                    {todo.completed ? 'Completed' : 'Mark as Completed'}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default App;
