const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 5000;
let count = 0;

// If client opens this webpage
// A connection event will run on the server
io.on('connection', (socket) => {
    console.log("a user connected");
    count++;

    // emit sends data to all clients
    // We can watch on client using "usercnt" event
    io.emit('usercnt', count);

    // 'disconnect' event will run if client 
    // browser closes (Tab)
    socket.on("disconnect", () => {
        console.log("a user disconnected");
        count--;
        io.emit("usercnt", count);
    })
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");

});

http.listen(port, () => {
    console.log(`listening on port ${port}`);
})

