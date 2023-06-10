import { RespuestaEdicion } from '../respuesta/respuesta-edicion';
import { PreguntaRevision } from './pregunta-revision';

export interface PreguntaEdicion extends PreguntaRevision {
  imgCategoria?: string;
  respuestas: RespuestaEdicion[];
}
