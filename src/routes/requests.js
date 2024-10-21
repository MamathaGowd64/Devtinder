const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth")
const { ConnectionRequestModel } = require("../models/request")
const UserModel=require("../models/user")



router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    const user = req.user;
    try {
        const fromUserId = user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({message:"Invalid status type:" + status})
        }
        const toUser = await UserModel.findById(toUserId); {
            if (!toUser) {
                return res.status(404).json({ message: "User not found" })
            }


            const existingRequest = await ConnectionRequestModel.findOne({
                $or: [
                    { fromUserId, toUserId },
                    { fromUserId: toUserId, toUserId: fromUserId },
                    
                ]
            });
            if (existingRequest) {
                return res.status(400).send({ message: "Connection request already exists!!" })
            }

            const connectionRequest = new ConnectionRequestModel({
                fromUserId, toUserId, status,
            });
            const data = await connectionRequest.save();
            res.json({
                message:  status + " message"+ " sent "+  "to " + toUser.firstName,
                data,
            });
        }
    }
        catch (err) {
            res.status(400).send("ERROR:" + err.message)
        }
   }
    
)


router.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;
        console.log(loggedInUser);
        console.log(status);
        console.log(requestId);
        //loggedInUser == toUserId
        //status shoud be accept or reject in the url
        //toUserId's status should be equal to interested then only we can allowed it
        //request id should be valid
        
        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({message:"Status not allowed"})
        }

        const connectionRequest = await ConnectionRequestModel.findOne({          
            toUserId: loggedInUser._id,
            status: "interested",
           
        });
        console.log(connectionRequest);
        
        
        if (!connectionRequest) {
            return res.status(404).json({message:"Connection request not found"})
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.json({ message: "Connection request" + status, data });
    }
    catch (err) {
        res.status(400).send("ERROR:" + err.message)
    }
})

module.exports = router;