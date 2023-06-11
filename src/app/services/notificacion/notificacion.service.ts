import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Notificacion } from 'src/app/models/notificacion/notificacion';

/**
 * Servicio que gestiona las notificaciones de la aplicación web.
 *
 * @export
 * @class NotificacionService
 */
@Injectable({ providedIn: 'root' })
export class NotificacionService {
  constructor(private msgService: NzMessageService) {}

  mostrar(notificacion: Notificacion): void {
    this.msgService.create(notificacion.tipo as string, notificacion.mensaje);
  }
}
