const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const UserModel=require("../models/user")
const { ConnectionRequestModel } = require("../models/request");
//get all pending connection request for the loggedIn user

const USER_SAFE_DATA="firstName lastName photoURL age about skills"

router.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const requests = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", USER_SAFE_DATA);
        //populate("fromUserId",["firstName", "lastName"])
        res.json({
            message: "Data fetched successfully",
            data:requests,
        })
    }
    catch (err) {
        res.status(400).send("ERROR:", + err.message);
    }
})


router.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connections = await ConnectionRequestModel.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },
            ]
        }).populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);
        const data = connections.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId
        } )
        res.json({ data });
    }
    catch (err) {
        res.status(400).send("ERROR:" + err.message);
    }
})


router.get("/feed", userAuth, async (req, res) => {
    try {

        //User should see all the profiles except
        //0. his own profile
        //1.his connections
        //2.ignored people
        //3. already sent the connection request

        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;

        const skip = (page - 1) * limit;

        //find all connection requests(sent+ received)
        const requests = await ConnectionRequestModel.find({
            $or: [
                { fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();
        requests.forEach(req => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })
        console.log(hideUsersFromFeed);

        const users = await UserModel
            .find({
                $and: [
                    { _id: { $nin: Array.from(hideUsersFromFeed) } },//convert set into array
                    { _id: { $ne: loggedInUser._id } }//to own profile
                ]
            }).select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit);//pagination
        
        
        res.send({ data: users });
    }
    catch (err) {
        res.status(400).send("ERROR:" + err.message);
    }
})
module.exports = router;