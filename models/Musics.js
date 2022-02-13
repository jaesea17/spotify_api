const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    expenseType: {
        type: String,
        required: true,
        min: 2,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Expenses",userSchema);