/**
 * Tipo de un funko
 */
export type FunkoType = 'Pop!' | 'Pop! Rides' | ' Vynil Soda' | 'Vynil Gold';

/**
 * Género de un funko
 */
export type Gender = 'Animación' | 'Películas y TV' | 'Videojuegos' | 'Deportes' | 'Música' | 'Ánime';

/**
 * Franquicia de un funko
 */
export type Franchise = 'The Big Bang Theory' | 'Game of Thrones' | 'Sonic The Hedgehog' | 'Marvel: Guardians of the Galaxy';

/**
 * Clase Funko
 */
export class Funko {
  /**
   * Constructor de la clase Funko
   * @param ID - Identificador del funko
   * @param name - Nombre del funko
   * @param description - Descripción del funko
   * @param type - Tipo del funko
   * @param gender - Género del funko
   * @param franchise - Franquicia del funko
   * @param pieceNumber - Número de piezas del funko
   * @param exclusive - Si el funko es exclusivo
   * @param specialFeatures - Características especiales del funko
   * @param value - Valor del funko
   */
  constructor(
    public ID: number,
    public name: string,
    public description: string,
    public type: FunkoType,
    public gender: Gender,
    public franchise: Franchise,
    public pieceNumber: number,
    public exclusive: boolean,
    public specialFeatures: string,
    public value: number   
  ) {}
}