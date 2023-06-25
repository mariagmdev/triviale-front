export interface Clima {
  origin: { copyright: string };
  metadescripcion: string;
  stateSky: { description: string; id: string };
  temperatura_actual: string;
  temperaturas: { max: string; min: string };
  precipitacion: string;
  imagen: string;
}
