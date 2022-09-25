const { Double } = require('mongodb');
const mongoose = require('mongoose');


const userSchema = mongoose.Schema(
    {
        id: {type: Double},
        first_name: {type: String},
        last_name: {type: String},
    }
);


const User = mongoose.model("User", userSchema);

module.exports = User;