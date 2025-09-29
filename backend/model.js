import mongoose from 'mongoose';

const todos = mongoose.model('Todo', new mongoose.Schema({
  task: String,
  completed: Boolean,
}));

export default todos;