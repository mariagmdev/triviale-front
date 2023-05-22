import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { NotificacionService } from '../services/notificacion/notificacion.service';
import { TipoNotificacion } from '../enums/tipo-notificacion/tipo-notificacion';

@Injectable()
export class ErrorInterceptor implements ErrorHandler {
  constructor(private notificacionService: NotificacionService) {}

  handleError(error: any) {
    console.error(error);

    const mensaje = error?.error?.mensaje || 'Error inesperado';
    this.notificacionService.mostrar({
      mensaje: mensaje,
      tipo: TipoNotificacion.Error,
    });
  }
}
