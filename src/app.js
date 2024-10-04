const express = require('express');
const app = express();

app.use("/test", (req, res) => {
    res.send("hello testing")
})

app.use("/hello", (req, res) => {
    res.send("hello hello")
})
app.listen(5000, () => {
    console.log('server listening on 5000');
})