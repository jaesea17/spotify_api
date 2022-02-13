const mongoose = require("mongoose");
require("dotenv/config");

mongoose.connect(process.env.DB_CONNECTION)
.then (() => {
        console.log('connected to DB!');
    }).catch((err) => {
        if(err) return console.log(err)
        });
