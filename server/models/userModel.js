const { Double } = require('mongodb');
const mongoose = require('mongoose');


const userSchema = mongoose.Schema(
    {
        id: { type: Number },
        first_name: { type: String },
        last_name: { type: String },
    }
);


const User = mongoose.model("users", userSchema);

module.exports = User;