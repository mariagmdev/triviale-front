import { TipoNotificacion } from 'src/app/enums/tipo-notificacion/tipo-notificacion';

export interface Notificacion {
  tipo: TipoNotificacion;
  mensaje: string;
}
