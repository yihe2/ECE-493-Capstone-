const mongoose = require("mongoose");

const finSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, ""],
        unique: true
    },
});