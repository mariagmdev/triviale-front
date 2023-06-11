import { Component, OnInit } from '@angular/core';
import { TipoNotificacion } from 'src/app/enums/tipo-notificacion/tipo-notificacion';
import { PreguntaRevision } from 'src/app/models/pregunta/pregunta-revision';
import { NotificacionService } from 'src/app/services/notificacion/notificacion.service';
import { PreguntaService } from 'src/app/services/pregunta/pregunta.service';

/**
 * Componente del listado de preguntas a revisar.
 *
 * @export
 * @class PreguntasComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss'],
})
export class PreguntasComponent implements OnInit {
  preguntasFiltradas: PreguntaRevision[] = [];
  filtro: string;

  idPreguntaSeleccionada: number;
  mostrarModalEdicion: boolean;

  private preguntas: PreguntaRevision[] = [];

  constructor(
    private preguntaService: PreguntaService,
    private notificacionService: NotificacionService
  ) {}

  ngOnInit(): void {
    this.onRefrescar();
  }

  /**
   * Filtra las preguntas por su título y nombre de categoría si existe algún filtro.
   *
   * @memberof PreguntasComponent
   */
  onCambioFiltro(): void {
    const filtro = this.filtro.trim();

    if (!filtro) {
      this.preguntasFiltradas = this.preguntas;
    } else {
      const filtroMinus = filtro.toLowerCase();
      this.preguntasFiltradas = this.preguntas.filter(
        (pregunta) =>
          pregunta.titulo.toLowerCase().includes(filtroMinus) ||
          pregunta.nombreCategoria.toLowerCase().includes(filtroMinus)
      );
    }
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
      this.preguntasFiltradas = preguntas;
    });
  }

  /**
   * Función de ordenación de columna de visibilidad.
   *
   * @param {PreguntaRevision} a
   * @param {PreguntaRevision} b
   * @memberof PreguntasComponent
   */
  fnOrdenacionPublica = (a: PreguntaRevision, b: PreguntaRevision) =>
    a.esPublica ? (b.esPublica ? 0 : -1) : 1;
}
