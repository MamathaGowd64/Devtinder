const express = require('express');
const app = express();

app.get("/user", (req, res, next) => {
    console.log("1st response")
    //res.send("1");
    next();
}, (req, res, next) => {
    console.log("2nd response")
    //res.send("2");
    next();
    console.log("hi")
},(req, res, next) => {
    console.log("3 response")
   res.send("3");
    //next();
},(req, res, next) => {
    console.log("4 response")
   // res.send("4");
  // next();
},)
app.listen(5000, () => {
    console.log('server listening on 5000');
})