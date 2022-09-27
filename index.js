const express = require('express');
const dotenv = require("dotenv");
const connectDB = require("./server/config/db");
const Cost = require('./server/models/costModel');
const User = require('./server/models/userModel');
const asyncHandler = require("express-async-handler");
const { updateOne } = require('./server/models/costModel');


dotenv.config();
connectDB();
const app = express();

// for JSON data 
app.use(express.json());

// Run Api
app.get('/', async (req, res) => {
    try {
        res.send("API RUNNING ...");
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});


// // Register new user
// app.post('/register', asyncHandler(async (req, res) => {
//     try {
//         const { name, password } = req.body;

//         if (!name || !password) {
//             res.status(400);
//             throw new Error("Please Enter all the Fields");
//         }

//         const userExists = await User.findOne({ name });

//         if (userExists) {
//             res.status(400);
//             throw new Error("User already exists");
//         }

//         const user = await User.create({
//             id,
//             first_name,
//             last_name,
//         });

//         if (user) {
//             res.status(201).json({
//                 _id: user._id,
//                 first_name: user.first_name,
//                 last_name: user.last_name
//                 //token: generateToken(user._id),
//             });
//         } else {
//             res.status(400);
//             throw new Error("User not found");
//         }

//     } catch (err) {
//         console.log(err)
//         res.sendStatus(500)
//     }
// }));

// // Auth user (Login)
// app.post('/login', async (req, res) => {
//     try {
//         const { name, password } = req.body;
//         const user = await User.findOne({ name });

//         if (user && (await user.matchPassword(password))) {
//             userToken = generateToken(user._id);
//             res.json({
//                 _id: user._id,
//                 name: user.name,
//                 token: userToken,
//             });

//         } else {
//             res.status(401);
//             throw new Error("Invalid name or Password");
//         }

//     } catch (err) {
//         console.log(err);
//         res.sendStatus(500);
//     }
// });

//Get all users 
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

//Get all costs
app.get('/costs', async (req, res) => {
    try {
        const costs = await Cost.find();
        res.send(costs);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// Add New User
app.post('/new-user', async (req, res) => {
    try {
        console.log(req.body);
        let userBody = req.body;
        const newUser = new User(userBody);
        await newUser.save();
        res.send({ msg: 'New User Added Succesfully' });

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// Add New Cost
app.post('/new-cost', async (req, res) => {
    try {
        console.log(req.body);
        let costBody = req.body;
        const newCost = new Cost(costBody);
        await newCost.save();
        res.send({ msg: 'New Cost Added Succesfully' });

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});


// Delete user
app.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        console.log('Deleting user: ' + userId)
        const result = await User.deleteOne({ id: userId });
        res.send(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// Delete cost
app.delete('/:id', async (req, res) => {
    try {
        const costId = req.params.id;
        console.log('Deleting cost: ' + costId)
        const result = await Cost.deleteOne({ _id: costId });
        res.send(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});


// Get Costs per User
app.get('/get-costs/:id', async (req, res) => {
    try {
        const id = req.params.id
        const costs = await Cost.find({ "userId": id });
        console.log(costs);
        res.send(costs);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// Get Costs per User per Month & Year
app.get('/get-specific-costs', async (req, res) => {
    try {
        console.log(req.query);
        const { id, month, year } = req.query;
        const costs = await Cost.find({
            $and: [
                { "userId": id },
                { "$expr": { "$eq": [{ "$year": "$creationDate" }, year] } },
                { "$expr": { "$eq": [{ "$month": "$creationDate" }, month] } }
            ]
        });
        res.send(costs);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});


const port = process.env.PORT || 10001;
app.listen(port, () => {
    console.log(`server running on port ${port}...`);
})
