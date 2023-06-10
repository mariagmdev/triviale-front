import { Respuesta } from '../respuesta/respuesta';

export interface Pregunta {
  id: number;
  titulo: string;
  imgCategoria: string;
  nombreCategoria: string;
  respuestas: Respuesta[];
}
