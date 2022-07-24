const todoModel = require('../models/todo');

const addTodo = async (req, res) => {
    try {
        const requestUser = req.user;
        if (!requestUser || !requestUser.id) return res.status(401).send({ message: 'Not logged in' });

        const { todo } = req.body;
        if (!todo) return res.status(422).send({ message: 'Please fill all required fields!' });

        const createTodo = await todoModel.create({
            todo, user: requestUser.id, isDone: false
        });
        if (!createTodo) return res.status(400).send({
            message: "Something went wrong!",
        });

        return res.status(200).send({
            message: `Wohoo! Your Todo is added successfully!`, todoData: createTodo
        });

    } catch (error) {
        console.error("🚀 ~ file: ToDoController.js ~ addTodo ~ error", error)
        throw new Error(error);
    }
}

const getTodoById = async (req, res) => {
    try {
        const requestUser = req.user;
        if (!requestUser || !requestUser.id) return res.status(401).send({ message: 'Not logged in' });

        const { todoId } = req.query;
        if (!todoId) return res.status(422).send({ message: 'Please fill all required fields!' });

        const findTodoById = await todoModel.findOne({
            _id: todoId
        });
        if (!findTodoById) return res.status(400).send({
            message: "ToDo not Found!",
        });

        return res.status(200).send({
            toDo: findTodoById
        });

    } catch (error) {
        console.error("🚀 ~ file: ToDoController.js ~ getTodoById ~ error", error)
        throw new Error(error);
    }
}

const getTodoByUserId = async (req, res) => {
    try {
        const requestUser = req.user;
        if (!requestUser || !requestUser.id) return res.status(401).send({ message: 'Not logged in' });

        const findTodoByUserId = await todoModel.find({
            user: requestUser.id,
        });
        if (!findTodoByUserId) return res.status(400).send({
            message: "ToDo not Found!",
        });

        return res.status(200).send({
            userToDo: findTodoByUserId
        });

    } catch (error) {
        console.error("🚀 ~ file: ToDoController.js ~ getTodoByUserId ~ error", error)
        throw new Error(error);
    }
}

const updateTodo = async (req, res) => {
    try {
        const requestUser = req.user;
        if (!requestUser || !requestUser.id) return res.status(401).send({ message: 'Not logged in' });

        const { todo, todoId } = req.body;
        if (!todoId || !todo) return res.status(422).send({ message: 'Please fill all required fields!' });

        const updateTodo = await todoModel.findOneAndUpdate({ _id: todoId }, { $set: { todo: todo } })

        if (!updateTodo) return res.status(200).send({ message: 'Something went wrong, Please try again!' });
        return res.status(200).send({ message: 'Todo Updated successfully!' });

    } catch (error) {
        console.error("🚀 ~ file: ToDoController.js ~ updateTodo ~ error", error)
        throw new Error(error);
    }
}

const deleteTodo = async (req, res) => {
    try {
        const requestUser = req.user;
        if (!requestUser || !requestUser.id) return res.status(401).send({ message: 'Not logged in' });

        const { todoId } = req.query;
        if (!todoId) return res.status(422).send({ message: 'Please fill all required fields!' });

        const deleteTodo = await todoModel.findOneAndDelete({
            _id: todoId
        });
        if (!deleteTodo) return res.status(400).send({ message: "Something went wrong!" });

        return res.status(200).send({ message: 'Todo deleted successfully!' });

    } catch (error) {
        console.error("🚀 ~ file: ToDoController.js ~ deleteTodo ~ error", error)
        throw new Error(error);
    }
}

const markAsDone = async (req, res) => {
    try {
        const requestUser = req.user;
        if (!requestUser || !requestUser.id) return res.status(401).send({ message: 'Not logged in' });

        const { isDone, todoId } = req.body;
        if (!todoId || !isDone) return res.status(422).send({ message: 'Please fill all required fields!' });

        const updateTodo = await todoModel.findOneAndUpdate({ _id: todoId }, { $set: { isDone } })
        if (!updateTodo) return res.status(200).send({ message: 'Something went wrong, Please try again!' });

        return res.status(200).send({ message: 'Todo Marked As Done successfully!' });

    } catch (error) {
        console.error("🚀 ~ file: ToDoController.js ~ markAsDone ~ error", error)
        throw new Error(error);
    }
}
module.exports = { addTodo, getTodoById, getTodoByUserId, updateTodo, deleteTodo, markAsDone }
