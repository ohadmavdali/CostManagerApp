const express = require('express');
const dotenv = require("dotenv");
const connectDB = require("./server/config/db");
const Cost = require('./server/models/costModel');
const User = require('./server/models/userModel');


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
app.delete('/delete-user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        console.log('Deleting user: ' + userId)
        const result = await User.deleteOne({ _id: userId });
        res.send(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});


// Delete cost
app.delete('/delete-cost/:id', async (req, res) => {
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
