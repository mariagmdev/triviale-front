import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TipoNotificacion } from 'src/app/enums/tipo-notificacion/tipo-notificacion';
import { Notificacion } from 'src/app/models/notificacion/notificacion';
import { NotificacionService } from 'src/app/services/notificacion/notificacion.service';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss'],
})
export class NotificacionComponent implements OnInit {
  notificacion?: Notificacion;
  readonly TipoNotificacion = TipoNotificacion;
  constructor(
    private notificacionService: NotificacionService,
    private msgService: NzMessageService
  ) {}

  ngOnInit() {
    this.notificacionService.notificacion.subscribe((notificacion) => {
      this.msgService.create(notificacion.tipo as string, notificacion.mensaje);
    });
  }
}
