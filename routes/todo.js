const express = require('express');
const {createTodoList, getTodoList, updateTask} = require('../controllers/todo.js');

const taskRouter = express.Router();

taskRouter.post('/task', createTodoList);
taskRouter.get('/task', getTodoList);
taskRouter.put('/task', updateTask);

module.exports = taskRouter;
