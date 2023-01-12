const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 4000;


http.listen(port, () => {
    console.log(`listening on port ${port}`);
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");

});

