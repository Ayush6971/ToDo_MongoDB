const router = require("express").Router();
const { addTodo, getTodoById, getTodoByUserId, updateTodo, deleteTodo, markAsDone } = require("../controller/ToDoController")

router.get('/getTodoById', getTodoById);
router.get('/getTodoByUserId', getTodoByUserId);
router.post('/addTodo', addTodo);
router.put('/updateTodo', updateTodo);
router.put('/markAsDone', markAsDone);
router.delete('/deleteTodo', deleteTodo);

module.exports = router;