import todos from "./model.js";

const getTodos = (req, res) => {
  todos.find().then((data) => res.json(data));
};

const createTodo = (req, res) => {
  const newTodo = new todos({
    task: req.body.task,
    completed: false,
  });
  newTodo.save().then((data) => res.json(data));
};

const deleteTodo = (req, res) => {
  todos
    .findByIdAndDelete(req.params.id)
    .then((data) => {
      if (data) {
        res.json({ message: "Todo deleted", data });
      } else {
        res.status(404).json({ message: "Todo not found" });
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "Error deleting todo", error: err })
    );
};

const updateTodo = (req, res) => {
  todos
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (data) {
        res.json({ message: "Todo updated", data });
      } else {
        res.status(404).json({ message: "Todo not found" });
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "Error updating todo", error: err })
    );
};

export { getTodos, createTodo, deleteTodo, updateTodo };
