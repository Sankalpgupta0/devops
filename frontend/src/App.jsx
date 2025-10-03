import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Backend_base_url = import.meta.env.VITE_API_URL;

function App() {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all'); // all | active | completed

    useEffect(() => {
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
        setTodos(todos.filter((todo) => todo._id !== id));
        axios
            .delete(`${Backend_base_url}/${id}`)
            .then((response) => {
                console.log('Todo deleted:', response.data);
            })
            .catch((error) => console.error('Error deleting todo:', error));
    };

    const handleToggleComplete = (id) => {
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

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            handleFormSubmit();
        }
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const remainingCount = todos.filter((t) => !t.completed).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-xl mx-auto">
                <header className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
                            Todo
                        </h1>
                        <p className="text-sm text-slate-500">
                            {remainingCount} task{remainingCount === 1 ? '' : 's'} remaining
                        </p>
                    </div>
                    <span className="inline-flex items-center rounded-md bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 ring-1 ring-inset ring-indigo-200">
                        v1
                    </span>
                </header>

                <div className="bg-white/90 backdrop-blur rounded-xl shadow-md border border-slate-200 p-4 mb-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Add a new task..."
                            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                            value={newTask}
                            onChange={handleInputChange}
                            onKeyDown={handleEnterKey}
                        />
                        <button
                            onClick={handleFormSubmit}
                            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 active:bg-indigo-800"
                        >
                            Add
                        </button>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                        <button
                            className={`filter-chip ${filter === 'all' ? 'chip-active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </button>
                        <button
                            className={`filter-chip ${filter === 'active' ? 'chip-active' : ''}`}
                            onClick={() => setFilter('active')}
                        >
                            Active
                        </button>
                        <button
                            className={`filter-chip ${filter === 'completed' ? 'chip-active' : ''}`}
                            onClick={() => setFilter('completed')}
                        >
                            Completed
                        </button>
                    </div>
                </div>

                <ul className="space-y-3">
                    {filteredTodos.length === 0 && (
                        <li className="text-center text-slate-500">No tasks to show</li>
                    )}
                    {filteredTodos.map((todo) => (
                        <li
                            key={todo._id}
                            className="group bg-white rounded-xl border border-slate-200 shadow-sm p-3 flex items-center gap-3"
                        >
                            <button
                                aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
                                className={`h-5 w-5 flex items-center justify-center rounded border transition-colors ${
                                    todo.completed
                                        ? 'bg-green-500 border-green-500 text-white'
                                        : 'border-slate-300 text-transparent'
                                }`}
                                onClick={() => handleToggleComplete(todo._id)}
                            >
                                ✓
                            </button>
                            <span
                                className={`flex-1 text-slate-800 ${todo.completed ? 'line-through text-slate-400' : ''}`}
                            >
                                {todo.task}
                            </span>
                            <button
                                className="opacity-80 hover:opacity-100 text-rose-600 hover:text-rose-700 text-sm font-medium"
                                onClick={() => handleDelete(todo._id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>

                {todos.length > 0 && (
                    <footer className="mt-6 text-center text-xs text-slate-400">
                        Double‑click Enter to add quickly. Use filters to focus.
                    </footer>
                )}
            </div>
        </div>
    );
}

export default App;
