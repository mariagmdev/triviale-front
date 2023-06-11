import { Component, EventEmitter, Input, Output } from '@angular/core';

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
export class ResultadoPartidaComponent {
  @Input() puntos: number;
  @Input() vidasRestantes: number;
  @Output() reiniciar = new EventEmitter<void>();

  onJugar(): void {
    this.reiniciar.emit();
  }
}
