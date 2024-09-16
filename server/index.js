const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');


const app = express();
app.use(cors())
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mern-crud")

app.get("/", (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.get("/getUser/:id", (req, res) => {
    UserModel.findById({_id:req.params.id})
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.put("/updateUser/:id", (req, res) => {
    UserModel.findByIdAndUpdate({_id:req.params.id}, {
               name: req.body.name,
               email: req.body.email,
               age: req.body.age})
        .then(users => res.json(users))
        .catch(err => res.json(err))
})
app.delete("/deleteUser/:id", (req, res) => {
    UserModel.findByIdAndDelete({_id:req.params.id})
        .then(res => res.json(res))
        .catch(err => res.json(err))
})

app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})
app.listen(3001, () => {
    console.log('Server is running on port 3001');
})