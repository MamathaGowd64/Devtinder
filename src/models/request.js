const mongoose = require("mongoose")


const connectionSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User",
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User",
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`,
        },
    },
},
    {
        timestamps: true
    }
)

//connectionRequest.find(fromUserId:97endkjvfkm ) it will search fast
connectionSchema.index({fromUserId:1,toUserId:1})

//this function called before saving the collection to database like pre save we will use this for validations
connectionSchema.pre("save", function (next) {
    const connectionRequest = this;
    //check if the fromUserId and toUserId are same
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("can not send connection request to yourself")
    }
    next();
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionSchema);
module.exports={ConnectionRequestModel}