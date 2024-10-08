const jwt = require("jsonwebtoken")
const User=require("../models/user")

const userAuth = async (req, res, next) => {
    //read the token from the request cookies validate the token and find the user

    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("token is not valid")
        }
    const decodedObj = await jwt.verify(token, "Dev@Tinder123");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
        throw new Error("user not exist")
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(400).send("ERROR:" + err.message)
    }
}

module.exports={userAuth}