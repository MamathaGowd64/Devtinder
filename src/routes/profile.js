const express = require("express");
const router = express.Router();
const bcrypt=require("bcrypt")
const {validateEditProfileData}=require("../utils/validation")
const {userAuth}=require("../middlewares/auth")


router.get("/profile/view",userAuth, async (req, res) => {
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



router.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid edit request")
        }

        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        await loggedInUser.save();//save the data inside database
        res.send(`${loggedInUser.firstName}, your profile is updated successfully `)
    } catch (err) {
        res.status(400).send("ERROR:" + err.message)
    }
})


router.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const user = req.user;
        const password = req.body.password;
        console.log(user);
        console.log(password);
        //encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);// 10 rounds to encrypt the password by algorothm      
        console.log(passwordHash);
        user.password = passwordHash;
        await user.save();
        res.send("password updated successfully")
    
    }
    catch (err) {
        res.status(400).send("ERROR:" + err.message);
    }
})

module.exports = router;
