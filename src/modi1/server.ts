import net from 'net';
import chalk from 'chalk';

interface Client {
  id: number;
  socket: net.Socket;
}

const clients: Client[] = [];
let clientID = 1;

const server = net.createServer({ allowHalfOpen: true }, (socket) => {

  // Asignar un ID único al cliente y almacenarlo en el array de clientes
  const newClient: Client = { id: clientID, socket };
  clients.push(newClient);
  console.log(`Client ${clientID} connected`);
  ++clientID;

  let dataBuffer = "";

  // Procesar los datos recibidos del cliente
  socket.on("data", (data) => {
    dataBuffer += data.toString();
    const messages = dataBuffer.split('\n'); // Dividir los datos en mensajes separados por '\n'
    dataBuffer = ""; // Limpiar el buffer después de procesar los datos
  
    // Procesar cada mensaje recibido
    messages.forEach((message) => {
      socket.emit("response", JSON.parse(message).content); // Emitir el evento "response" con el contenido del mensaje
    });
  });

  // Reenviar el mensaje a todos los demás clientes
  socket.on("response", (message: string) => {
    clients.forEach((client) => {
      if (client.socket !== socket) { // Evitar enviar el mensaje al cliente que lo envió
        client.socket.write(
          JSON.stringify({ sender: newClient.id, message: message })
        );
      }
    });
  });

  // Manejar errores en el socket
  socket.on("error", (err) => {
    chalk.red(`Socket error for client ${newClient.id}:`, err.message);
  });
});

// Iniciar el servidor
server.listen(60300, () => {
  console.log(chalk.blue("Server listening on port 60300"));
});