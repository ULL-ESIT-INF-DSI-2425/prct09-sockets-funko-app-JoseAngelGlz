import { Funko } from './funko.js';

/**
 * Interfaz para un comando que solicite el nombre del usuario
 */
export interface UserName {
  usuario: string;
}

/**
 * Interfaz para un comando que solicite el nombre del usuario y su ID
 */
export interface UserNameID extends UserName {
    id: number;
}

/**
 * Interfaz para un comanbdo que añada un funko con un determiunado ID a un usuario concreto
 */
export interface FunkoAtributes extends UserNameID {
  name: string;
  description: string;
  type: string;
  gender: string;
  franchise: string;
  pieceNumber: number;
  exclusive: boolean;
  specialFeatures: string;
  value: number;
}

/**
 * Interfaz para enviar una petición al servidor
 * @param type - Tipo de la petición
 * @param funkoPop - Array de funkos (opcional)
 */
export type RequestType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  funkoPop?: Funko[]
}

/**
 * Interfaz para recibir una respuesta del servidor
 * @param type - Tipo de la respuesta
 * @param success - Indica si la operación fue exitosa
 * @param funkoPops - Array de funkos (opcional)
 */
export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: boolean;
  funkoPops?: Funko[];
}