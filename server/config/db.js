const mongoose = require("mongoose");
const Cost = require("../models/costModel");
const User = require("../models/userModel");


const connectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // initUsersAndCosts(); // for init database remove '//' then save.

        console.log(`MongoDB Connected: ${conn}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};

const initUsersAndCosts = async () => {
    console.log("starting initiating");

    const user = new User({
        id: '313414955',
        first_name: "Dotan",
        last_name: "Gotshtein"
    })
    const savedUser = await user.save();

    const cost = new Cost({
        description: "First Product",
        category: "Products",
        sum: 989,
        userId: '313414955'
    })
    const savedCost = await cost.save();
    
    console.log("Users and Costs test were initiated");
}

module.exports = connectDB;