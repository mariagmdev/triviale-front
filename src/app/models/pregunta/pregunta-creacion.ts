import { RespuestaCreacion } from '../respuesta/respuesta-creacion';

/**
 * Modelo básico de creación de una pregunta.
 *
 * @export
 * @interface PreguntaCreacion
 */
export interface PreguntaCreacion {
  titulo: string;
  respuestas: RespuestaCreacion[];
  idCategoria: number;
  categoria?: string;
  imgCategoria?: string;
}
