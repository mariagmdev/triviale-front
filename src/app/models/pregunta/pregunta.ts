import { Respuesta } from '../respuesta/respuesta';

/**
 * Modelo básico de pregunta.
 *
 * @export
 * @interface Pregunta
 */
export interface Pregunta {
  id: number;
  titulo: string;
  imgCategoria: string;
  nombreCategoria: string;
  respuestas: Respuesta[];
}
