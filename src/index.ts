import { WebSocketServer, WebSocket } from 'ws';
import express from 'express';

const app = express();

// Create an HTTP server using Express
const server = app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});

// Create a WebSocket server using the HTTP server
const wss = new WebSocketServer({server:server});

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  ws.on('error', console.error);
  
  ws.send('hello from server');

  ws.on('message', (message: string) => {
    console.log(`Received message: ${message}`);
    // Broadcast the message to all clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');