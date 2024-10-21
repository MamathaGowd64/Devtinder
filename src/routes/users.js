const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
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

module.exports = router;