/**
 * Modelo básico de una pregunta a revisar.
 *
 * @export
 * @interface PreguntaRevision
 */
export interface PreguntaRevision {
  id: number;
  titulo: string;
  esPublica: boolean;
  idCategoria: number;
  nombreCategoria: string;
}
