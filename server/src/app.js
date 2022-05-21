import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
dotenv.config()

const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: process.env.SOCKET_ORIGIN,
        credentials: true
    }
});

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log("DATABASE CONNECTED");
}).catch((err) => {
    console.log("ERROR CONNECTION DATABSE",err);
})

app.use(cors({
    origin:'*'
}));

io.on('connection', (socket) => {
    let id = socket.handshake.query.id;
    socket.userId = id;
    console.log("New client connected",socket.userId);
    io.sockets.emit('new_user', newUser);
    socket.emit("connected",newUser);
    socket.on('global',(data) => {
        io.sockets.emit("global_message",data);
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected",socket.userId);
        io.sockets.emit('user_disconnected',socket.userId);
    });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log('listening on PORT:',PORT);
});