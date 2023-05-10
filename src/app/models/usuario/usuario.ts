import { Rol } from 'src/app/enums/rol/rol';

export interface Usuario {
  id: number;
  nombre: string;
  idRol: Rol;
}
