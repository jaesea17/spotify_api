const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 2,
    },
    artist: {
        type: String,
        required: true,
        min: 2
    }
})

module.exports = mongoose.model("Music",userSchema);