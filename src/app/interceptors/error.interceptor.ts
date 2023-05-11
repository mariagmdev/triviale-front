import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { NotificacionService } from '../services/notificacion/notificacion.service';
import { TipoNotificacion } from '../enums/tipo-notificacion/tipo-notificacion';

@Injectable()
export class ErrorInterceptor implements ErrorHandler {
  constructor(private notificacionService: NotificacionService) {}

  handleError(error: any) {
    // Check if it's an error from an HTTP response
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }

    const mensaje = error?.error?.mensaje || 'Error inesperado';
    this.notificacionService.mostrar({
      mensaje: mensaje,
      tipo: TipoNotificacion.Error,
    });
  }
}
