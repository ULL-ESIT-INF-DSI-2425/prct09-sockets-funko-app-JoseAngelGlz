import net from "net";
import chalk from "chalk";
import { executeCommand } from "./comands.js";

const server = net.createServer((socket) => {
  chalk.green("Cliente conectado.");

  socket.on("data", (data) => {
    const message = data.toString().trim();
    const [command, user, ...args] = message.split(" ");

    if (!command || !user) {
      socket.write("Comando inválido\n");
      return;
    }

    try {
      const response = executeCommand(user, command, args);
      socket.write(response + "\n", () => {
        socket.end();
      });

    } catch (err) {
      if (err instanceof Error) {
        socket.write(`Error: ${err.message}\n`);
      } else {
        socket.write(`Error: ${err}\n`);
      }
    }

  });

  socket.on("end", () => {
    chalk.yellow("Cliente desconectado.");
  });

  socket.on("error", (err) => {
    chalk.red("Error en el servidor:", err);
  });
});

server.listen(60300, () => {
  chalk.gray("Servidor Funko escuchando en el puerto 60300...");
});