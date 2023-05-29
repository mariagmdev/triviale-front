import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    private cdr: ChangeDetectorRef
  ) {
    this.notificacionService.notificacion.subscribe((notificacion) => {
      this.notificacion = notificacion;
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {}

  onCerrar() {
    this.notificacionService.ocultar();
  }
}
