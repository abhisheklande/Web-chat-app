const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoute')
const messageRoute = require('./routes/messageRoute')
const app = express();
const socket = require("socket.io");
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes)
app.use("/api/messages", messageRoute)


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err.message);
})

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server started on Port ${process.env.PORT}`);
});

const io = socket(server, {
    cors:{
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId)=> {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data)=> {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            console.log(data)
            socket.to(sendUserSocket).emit("msg-receive", data.msg);
        }
    })
});