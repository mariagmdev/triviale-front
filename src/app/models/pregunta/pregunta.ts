import { Respuesta } from '../respuesta/respuesta';

export interface Pregunta {
  id: number;
  titulo: string;
  respuestas: Respuesta[];
}
