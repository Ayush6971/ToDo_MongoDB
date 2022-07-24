const mongoose = require('mongoose');
// Connect to MongoDB
mongoose.connect(
    process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (!err) {
            console.info("Successfully Established Connection with MongoDB");
        } else {
            console.error(
                "Failed to Establish Connection with MongoDB with Error: " + err
            );
        }
    }
);