import net from 'net';
import chalk from 'chalk';

if (process.argv.length <= 4) {
  console.error(`El comando ha de ser del tipo: "node /dist/modi/client.ts ls -la ./src/modi/`)
} else {
  const client = net.createConnection({ port: 60300}, () => {
    console.log(chalk.green(`Conectado al servidor por el puerto 60300.`));

    const command = process.argv.slice(2).join(' ');
    client.write(command + '\n');

    let wholeData = '';
    client.on('data', (data) => {
      wholeData = data.toString();
      if (wholeData.endsWith('\n')) {
        wholeData = wholeData.trim();
        console.log(chalk.grey(`Resultado del comando: \n${wholeData}`));
      }
    })

    client.on('end', () => {
      console.log(chalk.yellow(`Terminando conexión con el servidor`));
    })

    client.on('error', (err) => {
      console.error(chalk.red(`Error con el servidor: ${err.message}`));
    })
  })
}