const express = require("express");
const { validateSignUpData } = require('../utils/validation');
const UserModel = require("../models/user");
const bcrypt = require("bcrypt")
const router = express.Router();



router.post("/signup", async (req, res) => {

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


router.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await UserModel.findOne({ emailId: emailId })
       // console.log(user.getJWT().then(res=>console.log(res)));
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        // if(!validateSignUpData(emailId))
        // const isPasswordValid = await bcrypt.compare(password, user.password)
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {

            //create JWT token
            
            const token = await user.getJWT();
            console.log(token)

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


router.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires:new Date(Date.now()),
    })
    res.send();
    // res.cookie("token", null, {
    //     expires:new Date(Date.now()),
    // }).send()
})

module.exports = router;