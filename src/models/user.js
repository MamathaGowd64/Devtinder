const mongoose = require('mongoose')
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 5,
        maxLength:20
    },
    lastName: {
        type: String,
        required: true,
        maxLength:20
        
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("invalid email" + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("enter strong password" + value);
            }
        }
    },
    age: {
        type: Number,
        min:18
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoURL: {
        type: String,
        default: "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo=",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("invalid URl" + value);
            }
        }
    },
    about: {
        type: String,
        default:"This is a deafult about the user",
    },
    skills: {
        type:[String]
    },
    
},{
    timestamps:true
})

// const User = mongoose.model("User", userSchema);

// module.exports = userModel;

module.exports=mongoose.model("User",userSchema)