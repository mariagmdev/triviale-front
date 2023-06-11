import { RespuestaEdicion } from '../respuesta/respuesta-edicion';
import { PreguntaRevision } from './pregunta-revision';

/**
 * Modelo básico de edición de una pregunta.
 *
 * @export
 * @interface PreguntaRevision
 */
export interface PreguntaEdicion extends PreguntaRevision {
  imgCategoria?: string;
  respuestas: RespuestaEdicion[];
}
