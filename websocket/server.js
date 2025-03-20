import dotenv from 'dotenv';
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { CONFIG, CONNECTION_STATUS, SOCKET_EVENTS, isClientInLocalNetwork } from './utils/index.js';


dotenv.config();

const app = express();
const PORT = CONFIG.SERVER_PORT;
const HOST = CONFIG.SERVER_HOST;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: CONFIG.CLIENT_ORIGINS,
        methods: CONFIG.CORS_METHODS,
    },
});

io.use((socket, next) => {
    // Get the client's IP address from the WebSocket handshake
    const clientIP = socket.handshake.address;

    if (isClientInLocalNetwork(clientIP)) {
        socket.emit('connection_status', CONNECTION_STATUS.SUCCESS);
        return next();
    }

    socket.emit('connection_status', CONNECTION_STATUS.ERROR);
    return next(new Error('Connection not allowed from this IP'));
});

io.on("connection", (socket) => {
    console.log(`[${new Date().toISOString()}] Client connected: ${socket.id}`);

    socket.on(SOCKET_EVENTS.SLIDE_CHANGE, (data) => {
        socket.broadcast.emit(SOCKET_EVENTS.UPDATE_SLIDE, data);
    });

    socket.on("disconnect", () => {
        console.log(`[${new Date().toISOString()}] Client disconnected: ${socket.id}`);
    });
});

server.listen(PORT, HOST, () => {
    console.log(`WebSocket server running on http://${HOST}:${PORT}`);
});
