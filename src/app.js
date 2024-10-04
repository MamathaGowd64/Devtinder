const express = require('express');
const app = express();

app.get("/u*ser", (req, res) => {
    res.send("mamatha")
})
app.listen(5000, () => {
    console.log('server listening on 5000');
})