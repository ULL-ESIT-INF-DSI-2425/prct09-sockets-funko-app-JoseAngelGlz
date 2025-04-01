import net from 'net';
import chalk from 'chalk';

 // Creamos la conexión al servidor
const client = net.createConnection({ port: 60300}, () => {
  chalk.blue('Connected to server!');
});

// Enviamos un mensaje al servidor en formato JSON
process.stdin.on('data', (data) => {
  client.write(JSON.stringify({ type: 'message', content: data.toString().trim() })); // Enviar mensaje normal
});

// Recibimos la respuesta del servidor y la mostramos en consola
client.on("data", (data) => {
  console.log(JSON.parse(data.toString()));
});

// Cerramos la conexión al servidor
client.on('end', () => {
  chalk.yellow('Disconnected from server');
});

// Manejamos un error de conexión
client.on('error', (err) => {
  chalk.red(`Error de conexión: ${err.message}`);
});