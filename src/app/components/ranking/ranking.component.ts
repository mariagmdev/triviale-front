import { Component, OnInit } from '@angular/core';
import { UsuarioPuntuacion } from 'src/app/models/usuario/usuario-puntuacion';
import { PuntuacionService } from 'src/app/services/puntuacion/puntuacion.service';

/**
 * Componente que muestra la tabla de ranking.
 *
 * @export
 * @class RankingComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  usuarioPuntuaciones: UsuarioPuntuacion[];

  constructor(private puntuacionService: PuntuacionService) {}

  ngOnInit(): void {
    this.puntuacionService.obtenerRanking().subscribe((usuarioPuntuaciones) => {
      this.usuarioPuntuaciones = usuarioPuntuaciones;
    });
  }
}
