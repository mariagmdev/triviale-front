import { Injectable, ErrorHandler } from '@angular/core';
import { NotificacionService } from '../services/notificacion/notificacion.service';
import { TipoNotificacion } from '../enums/tipo-notificacion/tipo-notificacion';

/**
 * Servicio interceptor que recibe todos los errores de la aplicación.
 *
 * @export
 * @class ErrorInterceptor
 * @implements {ErrorHandler}
 */
@Injectable()
export class ErrorInterceptor implements ErrorHandler {
  constructor(private notificacionService: NotificacionService) {}

  handleError(error: any) {
    console.error(error);

    // Obtenemos el mensaje del error proveniente desde back si se puede, sino
    // utilizamos uno genérico.
    const mensaje = error?.error?.mensaje || 'Error inesperado';
    this.notificacionService.mostrar({
      mensaje: mensaje,
      tipo: TipoNotificacion.Error,
    });
  }
}
