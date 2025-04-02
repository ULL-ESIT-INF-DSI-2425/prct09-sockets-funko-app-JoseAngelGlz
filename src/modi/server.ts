import net from 'net';
import chalk from 'chalk';
import fs from 'fs';
import { spawn } from 'child_process';
import { fstat } from 'fs';

const server = net.createServer((socket) => {
  console.log(chalk.green(`Cliente conectado`));

  let wholeData = '';
  socket.on('data', (data) => {
    wholeData += data.toString();
    if (wholeData.endsWith('\n')) {
      wholeData = wholeData.trim();
      let [command, ...args] = wholeData.split(' ');

      fs.access(wholeData.split(' ')[wholeData.split(' ').length - 1], (err) => {
        if (err) {
          console.error(chalk.red(`No se puede acceder a la ruta ${wholeData.split(' ')[wholeData.split(' ').length - 1]}`))
          socket.write(`No se puede acceder a la ruta ${wholeData.split(' ')[wholeData.split(' ').length - 1]}\n`)
          socket.end();
        }
      })

      let command_execution = spawn(command, args);

      command_execution.stdout.on('data', (data) => {
        console.log(chalk.green(`Comando ${wholeData} ejecutado correctamente!`));
        let output = data.toString();
        socket.write(output + '\n');
      })

      command_execution.on('error', (err) => {
        console.error(chalk.red(`Error al intentar ejecutar el comando: ${err.message}`));
        socket.write(`Error: No se pudo ejecutar el comando "${command}"\n`);
      });
    }
  })

  socket.on('end', () => {
    console.log(chalk.yellow(`Cliente desconectado`));
  })

  socket.on('error', (err) => {
    console.error(chalk.red(`Error con el socket ${err.message}`));
  });
})

server.listen(60300, () => {
  console.log(chalk.blue(`El servidor está escuchando por el puerto 60300...`));
})