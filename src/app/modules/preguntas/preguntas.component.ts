import { Component, OnInit } from '@angular/core';
import { TipoNotificacion } from 'src/app/enums/tipo-notificacion/tipo-notificacion';
import { PreguntaRevision } from 'src/app/models/pregunta/pregunta-revision';
import { NotificacionService } from 'src/app/services/notificacion/notificacion.service';
import { PreguntaService } from 'src/app/services/pregunta/pregunta.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss'],
})
export class PreguntasComponent implements OnInit {
  preguntas: PreguntaRevision[] = [];
  idPreguntaSeleccionada: number;
  mostrarModalEdicion: boolean;
  constructor(
    private preguntaService: PreguntaService,
    private notificacionService: NotificacionService
  ) {}

  ngOnInit(): void {
    this.onRefrescar();
  }

  alternarVisibilidad(pregunta: PreguntaRevision): void {
    this.preguntaService
      .establecerVisibilidad(pregunta.id, !pregunta.esPublica)
      .subscribe(() => {
        this.notificacionService.mostrar({
          mensaje: 'Visibilidad establecida',
          tipo: TipoNotificacion.Exito,
        });
        pregunta.esPublica = !pregunta.esPublica;
      });
  }

  onEditar(id: number): void {
    this.idPreguntaSeleccionada = id;
    this.mostrarModalEdicion = true;
  }

  onRefrescar(): void {
    this.preguntaService.listar().subscribe((preguntas) => {
      this.preguntas = preguntas;
    });
  }
}
