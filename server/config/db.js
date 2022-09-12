const mongoose = require("mongoose");
const Cost = require("../models/costModel");
const User = require("../models/userModel");


const connectDB = async() => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        //initUsers() // for init database remove '//' then save.

        console.log(`MongoDB Connected: ${conn}`);
    }   catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};

// init data-base 
const initUsers = async()=>{
    const ids = []
     for(let i = 1; i < 6; i++){
         const user =  new User({
             first_name:"User"+i,
             last_name: "Last"+i 
         })
        const savedUser = await user.save()
        ids.push(savedUser._id)
     }
     for(let i = 0; i < 10; i++){
     const cost =  new Cost({
        description: "des+" +i,
        category: "category" +i,
        sum: i
    })
    .save()
}
}


module.exports = connectDB;