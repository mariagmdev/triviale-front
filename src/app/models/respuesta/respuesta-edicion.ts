import { Respuesta } from './respuesta';

/**
 * Modelo derivado de respuesta para la edición de respuesta.
 *
 * @export
 * @interface RespuestaEdicion
 * @extends {Respuesta}
 */
export interface RespuestaEdicion extends Respuesta {
  esCorrecta: boolean;
}
