const mongoose = require('mongoose');


//mongoose.connect will return promise whether it is connected or not
const connectDB = async () => {
    await mongoose.connect("mongodb+srv://mamatha:4lqJlhOVM7UKpVbj@namastenode.kgkoi.mongodb.net/devTinder")
}

module.exports = connectDB;