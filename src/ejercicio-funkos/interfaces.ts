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
  