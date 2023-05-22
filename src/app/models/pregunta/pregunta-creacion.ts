import { RespuestaCreacion } from '../respuesta/respuesta-creacion';

export interface PreguntaCreacion {
  titulo: string;
  respuestas: RespuestaCreacion[];
  idCategoria: number;
  esPublica: boolean;
}
