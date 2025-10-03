import todos from './model.js';

const getTodos = (req, res) => {
    todos.find()
        .then((data) => res.json({ message: 'Todos retrieved successfully', data }))
        .catch((err) => {
            console.error('Error fetching todos:', err);
            res.status(500).json({ message: 'Error fetching todos', error: err.message });
        });
};

const createTodo = (req, res) => {
    const { task } = req.body;
    
    // Validate task field
    if (!task || task.trim() === '') {
        return res.status(400).json({ message: 'Task is required and cannot be empty' });
    }
    
    const newTodo = new todos({
        task: task.trim(),
        completed: false,
    });
    
    newTodo.save()
        .then((data) => res.status(201).json({ message: 'Todo created successfully', data }))
        .catch((err) => {
            console.error('Error creating todo:', err);
            res.status(500).json({ message: 'Error creating todo', error: err.message });
        });
};

const deleteTodo = (req, res) => {
    todos
        .findByIdAndDelete(req.params.id)
        .then((data) => {
            if (data) {
                res.json({ message: 'Todo deleted', data });
            } else {
                res.status(404).json({ message: 'Todo not found' });
            }
        })
        .catch((err) => res.status(500).json({ message: 'Error deleting todo', error: err }));
};

const updateTodo = (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    
    // Validate that we have data to update
    if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'No update data provided' });
    }
    
    // Validate task field if provided
    if (updateData.task !== undefined && (!updateData.task || updateData.task.trim() === '')) {
        return res.status(400).json({ message: 'Task cannot be empty' });
    }
    
    todos
        .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
        .then((data) => {
            if (data) {
                res.json({ message: 'Todo updated successfully', data });
            } else {
                res.status(404).json({ message: 'Todo not found' });
            }
        })
        .catch((err) => {
            console.error('Error updating todo:', err);
            res.status(500).json({ message: 'Error updating todo', error: err.message });
        });
};

export { getTodos, createTodo, deleteTodo, updateTodo };
