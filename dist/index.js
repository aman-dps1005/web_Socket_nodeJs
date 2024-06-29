"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// Create an HTTP server using Express
const server = app.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
// Create a WebSocket server using the HTTP server
const wss = new ws_1.WebSocketServer({ server: server });
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('error', console.error);
    ws.send('hello from server');
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // Broadcast the message to all clients
        wss.clients.forEach(client => {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
console.log('WebSocket server is running on ws://localhost:8080');
