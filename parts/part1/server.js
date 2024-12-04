const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const clients = [];

wss.on('connection', (ws) => {
  console.log('Новый клиент подключился');

  clients.push(ws);

  ws.on('message', (message) => {
   
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Клиент отключился');
    const index = clients.indexOf(ws);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

console.log('Сервер работает на ws://localhost:8080');
