import { TipoNotificacion } from 'src/app/enums/tipo-notificacion/tipo-notificacion';

/**
 * Modelo básico de notificación.
 *
 * @export
 * @interface Notificacion
 */
export interface Notificacion {
  tipo: TipoNotificacion;
  mensaje: string;
}
