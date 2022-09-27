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

// init data-base 
// const initUsersAndCosts = async () => {
//     console.log("starting initiating")
//     // const ids = []
//     for (let i = 1; i < 6; i++) {
//         const user = new User({
//             id: '9' + i + '5' + i + '7',
//             first_name: "User" + i,
//             last_name: "Last" + i
//         })
//         const savedUser = await user.save();
//         // ids.push(savedUser._id)
//     }
//     for (let i = 0; i < 10; i++) {
//         const cost = new Cost({
//             description: "Description+" + i,
//             category: "category" + i,
//             sum: i,
//             userId: '9' + i + '5' + i + '7'
//         })
//         const savedCost = await cost.save();
//     }
//     console.log("Users and Costs test were initiated")
// }

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