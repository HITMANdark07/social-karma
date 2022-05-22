import express from 'express';
import { Server } from 'socket.io';
import http, { get } from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { MONGO_URI } from './constants.js';

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

const corsOptions = {
    credentials: true,
    origin:["http://localhost:3000","https://social-karma-front.herokuapp.com","http://social-karma-front.herokuapp.com"],
  };
app.use(cors(corsOptions));

// import routes
import userRoutes from './routes/user.routes.js';
import foodDonationRoutes from './routes/foodDonation.routes.js';


const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: process.env.SOCKET_ORIGIN,
        credentials: true
    }
});


mongoose.connect(MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log("DATABASE CONNECTED");
}).catch((err) => {
    console.log("ERROR CONNECTION DATABSE",err);
})

// using routes
app.use("/api/user",userRoutes);
app.use("/api/fooddonation",foodDonationRoutes);

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