import { Rol } from 'src/app/enums/rol/rol';

/**
 * Modelo básico de usuario.
 *
 * @export
 * @interface Usuario
 */
export interface Usuario {
  id: number;
  nombre: string;
  idRol: Rol;
}
