import express from "express";
import { Server } from "socket.io";
import { createServer } from 'http';
import cors from "cors";
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"

const port = 3000;
const secretKeyJWT = " ahauycuywuiufwe24"

const app = express();

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    })
);


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/login", (req, res) => {

    const token = jwt.sign({ _id: "afgrwerrtfaadf" }, secretKeyJWT)
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
        .json({
            message: "Login Successfull"
        })
});

const user = false;

io.use((socket, next) => {
    cookieParser()(socket.request, socket.request.res, (err) => {

        if (err) return next(err)
            
        const token = socket.request.cookies.token;

        if(!token) return next(new Error("Authentication Error"))

        const decoded = jwt.verify(token, secretKeyJWT);
        next();

    });

    // if (user) next();
})


io.on("connection", (socket) => {
    console.log(`A User connected`, socket.id);

    socket.on("message", ({ room, message }) => {
        console.log({ message, room });
        socket.to(room).emit("recieve message", message)
    })

    socket.on('join-room', (room) => {
        socket.join(room)
    })



    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
    })

    // socket.emit("welcome",`Welcome to the server`)
    // socket.broadcast.emit("welcome",`${socket.id} joined the server ,${socket.id}`)
})


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})