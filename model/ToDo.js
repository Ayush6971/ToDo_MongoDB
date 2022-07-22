const mongoose = require('mongoose');
const Todoschema = new mongoose.Schema(
    {
        todo: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        isDone: {
            type: Boolean,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = new mongoose.model("Todo", Todoschema);