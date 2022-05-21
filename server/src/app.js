const express =  require("express");
const { Server } =  require('socket.io');
const http = require('http');
const _ = require('lodash');

const app = express();
require('dotenv').config()
const cors = require('cors');
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: process.env.SOCKET_ORIGIN,
        credentials: true
    }
});


app.use(cors({
    origin:'*'
}));


let interval;
const defineFakeUsers = (name,x) => ({
    id: faker.datatype.uuid(),
    username: name || faker.internet.userName(),
    avatar: toonavatar.generate_avatar({gender:x}),
})
const users =[];

io.on('connection', (socket) => {
    let id = socket.handshake.query.id;
    socket.userId = id;
    users.push(newUser);
    console.log("New client connected",socket.userId);
    io.sockets.emit('new_user', newUser);
    socket.emit("connected",newUser);
    socket.on('global',(data) => {
        io.sockets.emit("global_message",data);
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected",socket.userId);
        io.sockets.emit('user_disconnected',socket.userId);
        _.remove(users,{
            id:socket.userId
        });
        clearInterval(interval);
    });
});
const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    console.log(response);
    socket.emit("FromAPI", {response,users});
  };
  
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log('listening on PORT:',PORT);
});