import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import mongoose from 'mongoose';

const todos = mongoose.model('Todo', new mongoose.Schema({
  task: String,
  completed: Boolean,
}));

const app = express();

app.use(cors({
    origin: '*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send("api is running");
});
app.get('/todos', (req, res) => {
    todos.find().then(data => res.json(data));
});

app.post('/todos', (req, res) => {
    const newTodo = new todos({
        task: req.body.task,
        completed: false,
    });
    newTodo.save().then(data => res.json(data));
});

app.delete('/todos/:id', (req, res) => {
    todos.findByIdAndDelete(req.params.id)
      .then(data => {
        if (data) {
          res.json({ message: 'Todo deleted', data });
        } else {
          res.status(404).json({ message: 'Todo not found' });
        }
      })
      .catch(err => res.status(500).json({ message: 'Error deleting todo', error: err }));
  });

app.put('/todos/:id', (req, res) => {
    todos.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(data => {
            if (data) {
                res.json({ message: 'Todo updated', data });
            } else {
                res.status(404).json({ message: 'Todo not found' });
            }
        })
        .catch(err => res.status(500).json({ message: 'Error updating todo', error: err }));
});

const PORT = process.env.PORT || 8000;

connect('mongodb://localhost:27017/todo_app', 
    { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

})
  .catch(err => console.log(err));

