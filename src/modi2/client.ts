import net from 'net';
import chalk from 'chalk';

const client = net.createConnection({ port: 60300 }, () => {
  chalk.blue('Connected to server!');
});

let dataBuffer = '';
client.on('data', (data) => {
  dataBuffer += data.toString();
  const messages = dataBuffer.split('\n');
  dataBuffer = '';
  messages.forEach((message) => {
    if (message.trim()) {
      console.log(chalk.green('Received from server:', message));
    }
  });
});

client.on('end', () => {
  console.log(chalk.yellow('Disconnected from server'));
});

client.on('error', (err) => {
  console.error(chalk.red('Error:', err.message));
});