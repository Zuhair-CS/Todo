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