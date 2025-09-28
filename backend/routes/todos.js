// backend/routes/todos.js

const express = require('express');
const router = express.Router();
const { getTodos, addTodo } = require('../controllers/todoController');


router.route('/')
.get(getTodos)
.post(addTodo);

module.exports = router;