const express = require('express');
const connectDB = require("./config/database")
const UserModel = require("./models/user");
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const {userAuth}=require("./middlewares/auth")
const { validateSignUpData } = require('./utils/validation');
const app = express();


app.use(express.json());
app.use(cookieParser());



app.post("/signup", async (req, res) => {

    try {
        validateSignUpData(req);
        //validate the data 
        const {firstName,lastName,emailId,password}=req.body
        //encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);// 10 rounds to encrypt the password by algorothm
        console.log(passwordHash)
    
    //creating new instance of the users
        const User = new UserModel({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
    })//
        await User.save();//returns promise
    res.send("user added successfully")
    } catch (err) {
        res.status(400).send("error in saving:" + err.message)
    }

})


app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await UserModel.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid Credentials")
        }
        // if(!validateSignUpData(emailId))
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (isPasswordValid) {

            //create JWT token
            
            const token = await jwt.sign({ _id: user._id }, "Dev@Tinder123",{expiresIn:"1d"});
           // console.log(token)

            //add the token to cookie and send the response to the client
            res.cookie("token",token,{expires: new Date(Date.now()+ 8 * 900000)});
            res.send("Login Successfull!!");
        } else {
            throw new Error("Invalid Credentials")
        }
    } catch (err) {
        res.status(400).send("ERROR:" + err.message)
    }
})



app.get("/profile",userAuth, async (req, res) => {
    try {
        const user = req.user;
        // const { token } = req.cookies;
        // if (!token) {
        //     throw new Error("Invalid Token")
        // }

    //validate my token

    // const decodedMessage = await jwt.verify(token, "Dev@Tinder123")
    // console.log(decodedMessage)
    // const { _id } = decodedMessage;
    //     const user = await UserModel.findById(_id)
    //     if (!user) {
    //         throw new ERROR("user doesnot exist")
    //     }
    // console.log("user id is " + _id);
        // res.send("name is "+ user.firstName)
        
        res.send(user);
    } catch (err) {
        res.send("ERROR: " + err.message)
    }
});


app.post("/sendRequest", userAuth, (req, res) => {
    const user = req.user;
   // console.log(user)
    res.send("connetion sent by " + user.firstName);
    
})







// //get user by emailId
// app.get("/user", async (req, res) => {
//     const userEmailId = req.body.emailId;
//     try {
//         const users = await UserModel.find({ emailId: userEmailId });
//         if (users.length === 0) {
//             res.status(404).send("user not found")
//         }
//         else {
//             res.send(users);
//         }
//     }
//     catch(err) {
//         res.status(400).send("something went wrong")
//     }
// })
// //Feed API-GET /feed -get all the users from the database
// app.get("/feed", async(req, res) => {
//     try {
//         const users = await UserModel.find({});
//         if (users.length === 0) {
//             res.status(404).send("user not found")
//         }
//         else {
//             res.send(users);
//         }
//     }
//     catch(err) {
//         res.status(400).send("something went wrong")
//     }
// })

// //delete the user

// app.delete("/user", async (req, res) => {
//     const userId = req.body.userId;
//     try {
//         await UserModel.findByIdAndDelete(userId);
//         res.send("user deleted successfully")
//         }
//     catch(err) {
//         res.status(400).send("something went wrong")
//     }
// })

//update the user

// app.patch("/user/:userId", async (req, res) => {
//     const userId = req.params?.userId;
//     const data = req.body;
//     try {

//         const allowedUpdates = ["about", "photoURL", "skills"];
//         const allowed = Object.keys(data).every((k) => allowedUpdates.includes(k));
//         if (!allowed) {
//             throw new Error("can not update the user");
//         }
//         if (data?.skills.length > 10) {
//             throw new Error("skill can not include more than 10");
//         }
//         await UserModel.findByIdAndUpdate(userId, data,
//             { returnDocument: 'after',runValidators:true });
//         console.log(req.body)
//         res.send("user updated successfully")
//         }
//     catch(err) {
//         res.status(400).send("something went wrong" + err)
//     }
// })





connectDB().then(()=> {
    console.log(" connection established successfully")
    app.listen(5000, () => {
        console.log('server listening on 5000');
    })
})
    .catch((err) => {
    console.log("database coneection is not established")
})
