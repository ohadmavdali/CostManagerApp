const mongoose = require('mongoose')

const costModel = mongoose.Schema(
    {
        description: {type: String, required: true},
        category: {type: String, required: true},
        sum: { type: Number, trim: true},
        creationDate : {
            type:Date,
            default:Date.now
        },
    },
    {
    timestamp: true,
    }
);

const Cost = mongoose.model("Cost", costModel);

module.exports = Cost;