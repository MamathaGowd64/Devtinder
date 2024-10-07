const express = require('express');
const connectDB = require("./config/database")
const UserModel=require("./models/user")
const app = express();

app.use(express.json());



app.post("/signup", async (req, res) => {
    
    console.log(req.body);
    

    const User = new UserModel(req.body)//creating instance of the UserModel
    try {
        await User.save();//returns promise
    res.send("user added successfully")
    } catch (err) {
        res.status(400).send("error in saving:" + err.message)
    }

})


//get user by emailId
app.get("/user", async (req, res) => {
    const userEmailId = req.body.emailId;
    try {
        const users = await UserModel.find({ emailId: userEmailId });
        if (users.length === 0) {
            res.status(404).send("user not found")
        }
        else {
            res.send(users);
        }
    }
    catch(err) {
        res.status(400).send("something went wrong")
    }
})

//Feed API-GET /feed -get all the users from the database
app.get("/feed", async(req, res) => {
    try {
        const users = await UserModel.find({});
        if (users.length === 0) {
            res.status(404).send("user not found")
        }
        else {
            res.send(users);
        }
    }
    catch(err) {
        res.status(400).send("something went wrong")
    }
})



//delete the user

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        await UserModel.findByIdAndDelete(userId);
        res.send("user deleted successfully")
        }   
    catch(err) {
        res.status(400).send("something went wrong")
    }
})



//update the user

app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        await UserModel.findByIdAndUpdate(userId, data,
            { returnDocument: 'after' });
        console.log(req.body)
        res.send("user updated successfully")
        }   
    catch(err) {
        res.status(400).send("something went wrong")
    }
})



connectDB().then(()=> {
    console.log(" connection established successfully")
    app.listen(5000, () => {
        console.log('server listening on 5000');
    })
})
    .catch((err) => {
    console.log("database coneection is not established")
})
