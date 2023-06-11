/**
 * Modelo básico de una pregunta respondida.
 *
 * @export
 * @interface PreguntaRespondida
 */
export interface PreguntaRespondida {
  idPregunta: number;
  idRespuesta: number;
  esCorrecta: boolean;
}
