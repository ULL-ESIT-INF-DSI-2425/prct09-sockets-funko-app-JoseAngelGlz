import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import net from 'net';
import chalk from 'chalk';
import fs from 'fs';
import { spawn } from 'child_process';

// Configuración de yargs para procesar los comandos
interface StartCommandArgs {
  mode: string;
  file: string;
}

const argv = yargs(hideBin(process.argv))
  .command<StartCommandArgs>(
    'start',
    'Inicia el servidor para observar un archivo',
    (yargs) => {
      yargs.option('mode', {
        alias: 'm',
        type: 'string',
        demandOption: true,
        description: 'Modo de operación: l (líneas), w (palabras), c (caracteres)',
      });
      yargs.option('file', {
        alias: 'f',
        type: 'string',
        demandOption: true,
        description: 'Ruta del archivo a observar',
      });
    },
    (args: StartCommandArgs) => {
      // Pasamos los valores directamente a startServer
      startServer('-' + args.mode, args.file);
    }
  )
  .demandCommand(1, 'Debes especificar un comando válido')
  .help()
  .argv;

// Función para iniciar el servidor
function startServer(mode: string, filePath: string): void {
  const server = net.createServer({}, (socket) => {
  
    if (!mode || !filePath) {
      console.error(chalk.red('Error: Missing mode or file path'));
      socket.end();
      return;
    } else {
      socket.write(`Mode: ${mode}\n`);
      socket.write(`Watching file: ${filePath}\n`);
    }
  
    // Verificar si el archivo existe
    fs.access(filePath, (err) => {
      if (err) {
        console.error(chalk.red(`Error: Cannot access file ${filePath}: ${err.message}`));
        socket.end();
        return;
      }
    });
  
    // Veirificar el modo
    if (mode !== '-l' && mode !== '-w' && mode !== '-c') {
      console.error(chalk.red(`Error: Invalid mode ${mode}. Use -l, -w, or -c.`));
      socket.end();
      return;
    }
  
    // obtenemos el tamaño inicial del fichero
    let previousSize = 0;
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(chalk.red(`Error: Cannot get file stats for ${filePath}: ${err.message}`));
        socket.end();
        return;
      }
      previousSize = stats.size;
    });
  
    // Observar el archivo para detectar cambios
    let lastEventTime = 0;
    fs.watch(filePath, (eventType) => {
      if (eventType === 'change') {
        
        // Ignorar eventos que ocurran en menos de 100 ms
        const currentTime = Date.now();
        if (currentTime - lastEventTime < 100) {
          return;
        }
        lastEventTime = currentTime;
  
        console.log(chalk.green(`File ${filePath} changed. Running wc...`));
  
        // Obtener el tamaño actual del archivo
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error(chalk.red(`Error: Cannot get file stats for ${filePath}: ${err.message}`));
            return;
          }
          const currentSize = stats.size;
  
          // Ejecutar el comando wc
          const wc = spawn('wc', [mode, filePath]);
  
          wc.stdout.on('data', (data) => {
            const output = data.toString().trim();
  
            // Construir el mensaje detallado
            const message = `El fichero ${filePath} fue modificado;\n` +
                            `Tamaño anterior: ${previousSize} bytes\n` +
                            `Tamaño actual: ${currentSize} bytes\n` +
                            `Número de líneas/palabras/caracteres: ${output}\n`;
  
            // Enviar el mensaje al cliente
            socket.write(message + '\n');
  
            // Actualizar el tamaño anterior
            previousSize = currentSize;
          });
  
          wc.stderr.on('data', (data) => {
            console.error(chalk.red(`Error from wc: ${data.toString()}`));
          });
        });
      }
    });
  
    socket.on('end', () => {
      console.log(chalk.yellow('Client disconnected'));
    });
  
    socket.on('error', (err) => {
      console.error(chalk.red('Socket error:', err.message));
    });
  });

  server.listen(60300, () => {
    console.log(chalk.blue(`Servidor escuchando en el puerto 60300 y observando el archivo ${filePath} en modo ${mode}`));
  });
}

