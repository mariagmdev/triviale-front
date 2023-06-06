import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resultado-partida',
  templateUrl: './resultado-partida.component.html',
  styleUrls: ['./resultado-partida.component.scss'],
})
export class ResultadoPartidaComponent {
  @Input() puntos: number;
  @Input() vidasRestantes: number;
}
