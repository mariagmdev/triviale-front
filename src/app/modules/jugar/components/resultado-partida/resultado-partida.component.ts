import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actividad } from 'src/app/models/actividad/actividad';
import { ActividadService } from 'src/app/services/actividad/actividad.service';

/**
 * Componente de resultado de la partida.
 *
 * @export
 * @class ResultadoPartidaComponent
 */
@Component({
  selector: 'app-resultado-partida',
  templateUrl: './resultado-partida.component.html',
  styleUrls: ['./resultado-partida.component.scss'],
})
export class ResultadoPartidaComponent implements OnInit {
  @Input() puntos: number;
  @Input() vidasRestantes: number;
  @Output() reiniciar = new EventEmitter<void>();
  actividad?: Actividad;

  constructor(private actividadService: ActividadService) {}

  ngOnInit(): void {
    this.actividadService
      .obtener()
      .subscribe((actividad) => (this.actividad = actividad));
  }

  onJugar(): void {
    this.reiniciar.emit();
  }
}
