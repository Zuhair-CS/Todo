// backend/controllers/todoController.js
const Todo = require('../models/Todo');

//get
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

//post
exports.addTodo = async (req, res) => {
  try {
    const { task } = req.body;
    if (!task) {
      return res.status(400).json({ success: false, error: 'Please provide a task' });
    }
    const newTodo = await Todo.create({ task });
    res.status(201).json({ success: true, data: newTodo });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

//put
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

//destroy
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};