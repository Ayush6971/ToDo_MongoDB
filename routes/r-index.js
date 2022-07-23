const rToDo = require('./r-ToDo');
const rAuth = require('./r-auth');
const { isAuthenticated } = require('../middleware/isAuthenticated')

module.exports = (app) => {
    app.use("/", rAuth);
    app.use("/todo", isAuthenticated, rToDo);
}