const mongoose = require('mongoose')

const costModel = mongoose.Schema(
    {
        description: { type: String, required: true },
        category: { type: String, required: true },
        sum: { type: Number, trim: true },
        userId: { type: Number },
        creationDate: {
            type: Date,
            default: Date.now
        },
    },
    {
        timestamp: true,
    }
);

const Cost = mongoose.model("costs", costModel);

module.exports = Cost;