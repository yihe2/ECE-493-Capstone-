const mongoose = require("mongoose");


const healthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, ""],
        unique: true
    },
});