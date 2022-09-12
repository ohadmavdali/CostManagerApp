const express = require('express');
const dotenv = require("dotenv");
const connectDB = require("./server/config/db");
const Cost = require('./server/models/costModel');
const User = require('./server/models/userModel');
const asyncHandler = require("express-async-handler");
// const generateToken = require("./server/config/generateToken");


dotenv.config();
connectDB();
const app = express();

// for JSON data 
app.use(express.json()); 

// Run Api
app.get('/', async (req,res) => {
    try {
        res.send("API RUNNING ...");
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
});


// Register new user
app.post('/register', asyncHandler(async (req, res) => {
try {
    const { name, password } = req.body;

    if (!name || !password) {
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }

    const userExists = await User.findOne({ name });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        password,
    });

    if (user) {
        res.status(201).json({
        _id: user._id,
        name: user.name,
        //token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("User not found");}

} catch(err){
    console.log(err)
    res.sendStatus(500)
    }
}));

// Auth user (Login)

app.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name });

        if (user && (await user.matchPassword(password))) {
        userToken = generateToken(user._id);
        res.json({
          _id: user._id,
          name: user.name,
          token: userToken,
        });
        //console.log(userToken)

        const updateToken = User.findByIdAndUpdate(
            {_id:user._id},
            [{$set:{token: userToken}}]) 
            await updateToken.save
            //console.log(updateToken);

        //await updatedUser.save();
        } else {
        res.status(401);
        throw new Error("Invalid name or Password");}

    } catch(err){
        console.log(err)
        res.sendStatus(500)
        }
});

//Get all users 

app.get('/users', async (req,res) => {
    try {
        const users = await User.find()
        res.send(users);
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
});

//Get all costs
app.get('/costs', async (req,res) => {
    try {
        const costs = await Cost.find()
        res.send(costs);
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
});


// add cost
app.post('/costs/:id', async (req,res) => {
    try {
        const newCost = new Cost(req.body)
        await Cost.save()
        res.send({msg:"new expenses created"});

    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
});

// Delete cost
app.delete('/:id', async(req,res) => {
    try {
        const costId  = req.params.id;
        const result = await Cost.deleteOne({_id: costId});
        res.send(result);
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
});

// 
app.get('/asd', async (req,res) => {
    try {
        res.send("APIasdasd ..xxxx.");
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
});

const port = process.env.PORT || 10001;
app.listen(port, () => {
    console.log(`server running on port ${port}...`)
})
