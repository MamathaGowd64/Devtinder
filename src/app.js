const express = require('express');
const connectDB = require("./config/database")
const UserModel=require("./models/user")
const app = express();



app.post("/signup", async(req, res) => {
    const user = {
        firstName: "Mamatha",
        lastName: "G",
        emailId: "m@gmail.com",
        password: "Mamatha@123",
        age:"26"
    }

    const User = new UserModel(user)//creating instance of the UserModel
    await User.save();//returns promise
    res.send("user added successfully")

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
