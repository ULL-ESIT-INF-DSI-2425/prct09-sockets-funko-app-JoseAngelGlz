import { Funko, FunkoType, Gender, Franchise } from "./funko.js";
import { FunkoManager } from "./funkoManager.js";
import { UserName, UserNameID, FunkoAtributes } from "./interfaces.js";
import chalk from "chalk";
import yargs from 'yargs';
import net from "net";
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))

  // Comando para añadir un funko
  .command<FunkoAtributes>(
    "Añadir",
    "Añade un funko",
    (yargs) => {
      yargs.option("user", {
        alias: "u",
        type: "string",
        demandOption: true,
        description: "Nombre del usuario",
      });
      yargs.option("id", {
        alias: "i",
        type: "number",
        demandOption: true,
        description: "ID del funko",
      });
      yargs.option("name", {
        alias: "n",
        type: "string",
        demandOption: true,
        description: "Nombre del funko",
      });
      yargs.option("description", {
        alias: "d",
        type: "string",
        demandOption: true,
        description: "Descripción del funko",
      });
      yargs.option("type", {
        alias: "t",
        type: "string",
        demandOption: true,
        description: "Tipo del funko",
      });
      yargs.option("gender", {
        alias: "g",
        type: "string",
        demandOption: true,
        description: "Género del funko",
      });
      yargs.option("franchise", {
        alias: "f",
        type: "string",
        demandOption: true,
        description: "Franquicia del funko",
      });
      yargs.option("pieceNumber", {
        alias: "p",
        type: "number",
        demandOption: true,
        description: "Número de piezas del funko",
      });
      yargs.option("exclusive", {
        alias: "e",
        type: "boolean",
        demandOption: true,
        description: "Si el funko es exclusivo",
      });
      yargs.option("specialFeatures", {
        alias: "s",
        type: "string",
        demandOption: true,
        description: "Características especiales del funko",
      });
      yargs.option("value", {
        alias: "v",
        type: "number",
        demandOption: true,
        description: "Valor del funko",
      });
    },
    (args) => {
      sendCommand(
        `add ${args.user} ${args.id} ${args.name} ${args.description} ${args.type} ${args.gender} ${args.franchise} ${args.pieceNumber} ${args.exclusive} ${args.specialFeatures} ${args.value}`,
        (response) => console.log(response)
      );
    }
  )

  // Comando para eliminar un funko
  .command<UserNameID>(
    "Eliminar",
    "Elimina un funko",
    (yargs) => {
      yargs.option("user", {
        alias: "u",
        type: "string",
        demandOption: true,
        description: "Nombre del usuario",
      });
      yargs.option("id", {
        alias: "i",
        type: "number",
        demandOption: true,
        description: "ID del funko",
      });
    }
    ,
    (args) => {
      sendCommand(`remove ${args.user} ${args.id}`, (response) => console.log(response));
    }
  )

  // Comando para listar los funkos
  .command<UserName>(
    "Listar",
    "Lista los funkos",
    (yargs) => {
      yargs.option("user", {
        alias: "u",
        type: "string",
        demandOption: true,
        description: "Nombre del usuario",
      });
    },
    (args) => {
      sendCommand(`list ${args.user}`, (response) => console.log(response));
    }
  )

  // Comando para listar un funko
  .command<UserNameID>(
    "ListarFunko",
    "Lista un funko",
    (yargs) => {
      yargs.option("user", {
        alias: "u",
        type: "string",
        demandOption: true,
        description: "Nombre del usuario",
      });
      yargs.option("id", {
        alias: "i",
        type: "number",
        demandOption: true,
        description: "ID del funko",
      });
    },
    (args) => {
      sendCommand(`get ${args.user} ${args.id}`, (response) => console.log(response));
    }
  )

  .demandCommand()
  .help().argv;

/**
 * Envía un comando al servidor y maneja la respuesta.
 * @param command - Comando a enviar
 * @param callback - Función de callback para manejar la respuesta
 */
export function sendCommand(command: string, callback: (respuesta: string) => void) {
  const client = net.createConnection({ port: 60300 }, () => {
    client.write(command);
  });

  let data = "";
  client.on("data", (dataChunk) => {
    data += dataChunk.toString(); // Acumulamos todos los fragmentos
  });

  client.on("end", () => {
  try {
    // Intentamos parsear como JSON
    const jsonStart = data.indexOf("{");
    if (jsonStart !== -1) {
      const jsonData = data.slice(jsonStart).trim(); // Aislamos la parte JSON
      const message = JSON.parse(jsonData);
      callback(`${JSON.stringify(message, null, 2)}`); 
    } 
    else {
      callback(`${data.trim()}`);
    }
  }
  catch (error) {
    console.error("Error al procesar la respuesta:", error);
    console.error("Datos recibidos:", data);
  }
  });
  client.on("error", (err) => {
    console.error(chalk.red("Error en cliente:", err));
  });
}


  /**
 * Ejecuta un comando en base a la entrada del usuario.
 * @param username - Nombre del usuario
 * @param command - Comando a ejecutar (add, list, get, remove)
 * @param args - Argumentos del comando
 * @returns - Resultado del comando como string
 */
export function executeCommand( username: string, command: string, args: string[]): string {
  let output = "";

  switch (command) {

    case "add": {
      if (args.length < 10) {
        return chalk.red("Error: Faltan argumentos para añadir un Funko.");
      }

      const exclusive = args[7] === "true" ? true : false;
      const newFunko = new Funko(parseInt(args[0]), args[1], args[2], args[3] as FunkoType, args[4] as Gender, args[5] as Franchise, parseInt(args[6]), exclusive, args[8], parseFloat(args[9]));

      const user = new FunkoManager(username);
      output = user.add(newFunko) ? chalk.green(`Funko ${args[1]} añadido.`) : chalk.red("Error al añadir el Funko.");
      break;
    }

    case "list": {
      const user = new FunkoManager(username);
      const funkos = user.printAll();
      output = JSON.stringify({ funkos });
      break;
    }

    case "get": {
      if (args.length < 1) return "Error: Debes especificar un ID.";
      const user = new FunkoManager(username);
      const funko = user.print(parseInt(args[0]));
      output = JSON.stringify({ funko });
      break;
    }

    case "remove": {
      if (args.length < 1) {
        return "Error: Debes especificar un ID.";
      }
      const user = new FunkoManager(username);
      output = user.remove(parseInt(args[0])) ? chalk.green(`Funko eliminado.`) : chalk.red("Error al eliminar el Funko.");
      break;
    }

    default: {
      output = chalk.red("Comando no reconocido.");
      break;
    }
  }
  return output;
}