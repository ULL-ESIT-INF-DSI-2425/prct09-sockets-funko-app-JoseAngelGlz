import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { Funko } from './funko.js';

/**
 * Clase FunkoManager
 */
export class FunkoManager {
  private readonly path: string;
  private readonly user: string;

  /**
   * Constructor de la clase FunkoManager
   * @param user - Nombre del usuario
   */
  constructor(user: string) {
    this.user = user;
    this.path = path.join("funkos", this.user);

    fs.access(this.path, (err) => {
      if (err) {
        fs.mkdir(this.path, { recursive: true }, (err) => {
          if (err) {
            console.error(chalk.red(`Error al crear el directorio ${this.path}: ${err.message}`));
            return;
          }
        });

        // Si no hay error, el directorio se ha creado correctamente
        console.log(chalk.green(`Directorio ${this.path} creado correctamente`));
      }
    });
  }

  /**
   * Añade un funko
   * @param funko - Funko a añadir
   */
  public add(funko: Funko): boolean {
    const fileName = path.join(this.path, `${funko.ID}.json`);
    fs.access(fileName, fs.constants.F_OK, (err) => {
      if (err) {
        // El archivo no existe, se puede crear
        fs.writeFile(fileName, JSON.stringify(funko, null, 2), (err) => {
          if (err) {
            console.error(chalk.red(`Error al añadir el funko ${funko.name}: ${err.message}`));
            return false;
          }
          console.log(chalk.green(`Funko ${funko.name} añadido correctamente`));
        });
      } else {
        // El archivo ya existe
        console.log(chalk.red(`El funko ${funko.name} ya existe para el usuario ${this.user}`));
        return false;
      }
    });
    return true;
  }

  /**
   * Elimina un funko
   * @param ID - Identificador del funko
   */
  public remove(ID: number): boolean {
    const fileName = path.join(this.path, `${ID}.json`);
    fs.access(fileName, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(chalk.red(`El funko con ID ${ID} no existe para el usuario ${this.user}`));
        return false;
      }
      fs.unlink(fileName, (err) => {
        if (err) {
          console.error(chalk.red(`Error al eliminar el funko con ID ${ID}: ${err.message}`));
          return false;
        }
        console.log(chalk.green(`Funko con ID ${ID} eliminado correctamente`));
      });
    });
    return true;
  }

  /**
   * Actualiza un funko
   * @param funko - Funko a actualizar
   */
  public update(funko: Funko): boolean {
    const fileName = path.join(this.path, `${funko.ID}.json`);
    fs.access(fileName, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(chalk.red(`El funko ${funko.name} no existe para el usuario ${this.user}`));
        return false;
      }
      fs.writeFile(fileName, JSON.stringify(funko, null, 2), (err) => {
        if (err) {
          console.error(chalk.red(`Error al actualizar el funko ${funko.name}: ${err.message}`));
          return false;
        }
        console.log(chalk.green(`Funko ${funko.name} actualizado correctamente`));
      });
    });
    return true;
  }

  /**
   * Obtiene el color del valor de un funko
   * @param value - Valor del funko
   * @returns Color del valor
   */
  public getColour(value: number): typeof chalk {
    if (value < 10) {
      return chalk.red;
    } else if (value < 20) {
      return chalk.yellow;
    } else if (value < 50) {
      return chalk.blue;
    } else {
      return chalk.green;
    }
  }

  /**
   * Imprime los funkos
   */
  public printAll(): void {
    fs.readdir(this.path, (err, files) => {
      if (err) {
        console.error(chalk.red(`Error al leer el directorio ${this.path}: ${err.message}`));
        return;
      }
      if (files.length === 0) {
        console.log(chalk.red(`No hay funkos para imprimir para el usuario ${this.user}`));
        return;
      }
      console.log(`Listado de Funkos para el usuario ${this.user}:`);
      files.forEach((file) => {
        const fileName = path.join(this.path, file);
        fs.readFile(fileName, 'utf-8', (err, data) => {
          if (err) {
            console.error(chalk.red(`Error al leer el archivo ${fileName}: ${err.message}`));
            return;
          }
          const funko: Funko = JSON.parse(data);
          console.log(chalk.white(` ID: ${funko.ID}`));
          console.log(chalk.white(` - Nombre: ${funko.name}`));
          console.log(chalk.white(` - Descripción: ${funko.description}`));
          console.log(chalk.white(` - Tipo: ${funko.type}`));
          console.log(chalk.white(` - Género: ${funko.gender}`));
          console.log(chalk.white(` - Franquicia: ${funko.franchise}`));
          console.log(chalk.white(` - Número de piezas: ${funko.pieceNumber}`));
          console.log(chalk.white(` - Exclusivo: ${funko.exclusive ? 'Sí' : 'No'}`));
          console.log(chalk.white(` - Características especiales: ${funko.specialFeatures}`));
          console.log(this.getColour(funko.value)(` - Valor: ${funko.value}`));
          console.log(chalk.white('\n'));
        });
      });
    });
  }

  /**
   * Imprime un funko
   * @param ID - Identificador del funko
   */
  public print(ID: number): void {
    const fileName = path.join(this.path, `${ID}.json`);
    fs.access(fileName, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(chalk.red(`El funko con ID ${ID} no existe para el usuario ${this.user}`));
        return;
      }
      fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) {
          console.error(chalk.red(`Error al leer el archivo ${fileName}: ${err.message}`));
          return;
        }
        const funko: Funko = JSON.parse(data);
        console.log(chalk.white(` ID: ${funko.ID}`));
        console.log(chalk.white(` - Nombre: ${funko.name}`));
        console.log(chalk.white(` - Descripción: ${funko.description}`));
        console.log(chalk.white(` - Tipo: ${funko.type}`));
        console.log(chalk.white(` - Género: ${funko.gender}`));
        console.log(chalk.white(` - Franquicia: ${funko.franchise}`));
        console.log(chalk.white(` - Número de piezas: ${funko.pieceNumber}`));
        console.log(chalk.white(` - Exclusivo: ${funko.exclusive ? 'Sí' : 'No'}`));
        console.log(chalk.white(` - Características especiales: ${funko.specialFeatures}`));
        console.log(this.getColour(funko.value)(` - Valor: ${funko.value}`));
      });
    });
  }
}