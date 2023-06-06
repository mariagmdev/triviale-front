import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notificacion } from 'src/app/models/notificacion/notificacion';

@Injectable({ providedIn: 'root' })
export class NotificacionService {
  notificacion = new Subject<Notificacion>();
  constructor() {}

  mostrar(notificacion: Notificacion) {
    this.notificacion.next(notificacion);
  }
}
