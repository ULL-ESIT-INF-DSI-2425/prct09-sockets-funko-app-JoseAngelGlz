import { Funko, FunkoType, Gender, Franchise } from "./funko.js";
import { FunkoManager } from "./funkoManager.js";
import { UserName, UserNameID, FunkoAtributes } from "./interfaces.js";
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

void yargs(hideBin(process.argv))

  // Comando para añadir un funko
  .command<FunkoAtributes>(
    "Añadir",
    "Añade un funko",
    (yargs) => {
      yargs.option("usuario", {
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
    (argv) => {
      const funkoManager = new FunkoManager(argv.usuario);
      const funko = new Funko(
        argv.id,
        argv.name,
        argv.description,
        argv.type as FunkoType,
        argv.gender as Gender,
        argv.franchise as Franchise,
        argv.pieceNumber,
        argv.exclusive,
        argv.specialFeatures,
        argv.value
      );
      funkoManager.add(funko);
    }
  )

  // Comando para actualizar un funko
  .command<FunkoAtributes>(
    "Actualizar",
    "Actualiza un funko",
    (yargs) => {
      yargs.option("usuario", {
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
    (argv) => {
      const funkoManager = new FunkoManager(argv.usuario);
      const funko = new Funko(
        argv.id,
        argv.name,
        argv.description,
        argv.type as FunkoType,
        argv.gender as Gender,
        argv.franchise as Franchise,
        argv.pieceNumber,
        argv.exclusive,
        argv.specialFeatures,
        argv.value
      );
      funkoManager.update(funko);
    }
  )

  // Comando para eliminar un funko
  .command<UserNameID>(
    "Eliminar",
    "Elimina un funko",
    (yargs) => {
      yargs.option("usuario", {
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
    (argv) => {
      const funkoManager = new FunkoManager(argv.usuario);
      funkoManager.remove(argv.id);
    }
  )

  // Comando para listar los funkos
  .command<UserName>(
    "Listar",
    "Lista los funkos",
    (yargs) => {
      yargs.option("usuario", {
        alias: "u",
        type: "string",
        demandOption: true,
        description: "Nombre del usuario",
      });
    },
    (argv) => { 
      const funkoManager = new FunkoManager(argv.usuario);
      funkoManager.printAll();
    }
  )

  // Comando para listar un funko
  .command<UserNameID>(
    "ListarFunko",
    "Lista un funko",
    (yargs) => {
      yargs.option("usuario", {
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
    (argv) => {
      const funkoManager = new FunkoManager(argv.usuario);
      funkoManager.print(argv.id);
    }
  )
  .help().argv;