const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const clients = [];

wss.on('connection', (ws) => {
  let username = null;

  ws.on('message', (message) => {
    if (!username) {
      username = message;
      ws.send(`Добро пожаловать, ${username}!`);
      const userList = clients.map(client => client.username).join(', ');
      const welcomeMessage = userList ? `В чате уже присутствуют: ${userList}` : "Вы первый в чате.";
      ws.send(welcomeMessage);
      clients.forEach(client => {
        if (client !== ws) {
          client.send(`${username} присоединился`);
        }
      });
    } else {
      clients.forEach(client => {
        if (client !== ws) {
          client.send(`${username}: ${message}`);
        }
      });
    }
  });

  ws.on('close', () => {
    console.log(`${username} покинул чат`);
    clients.forEach(client => {
      client.send(`${username} покинул чат`);
    });
    const index = clients.indexOf(ws);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });

  clients.push(ws);
});
