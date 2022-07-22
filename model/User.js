const mongoose = require('mongoose');
const Userschema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = new mongoose.model("User", Userschema);