const rToDo = require('./r-ToDo');
const rAuth = require('./r-auth');
module.exports = (app) => {
    app.use("/", rToDo);
    app.use("/", rAuth);
}