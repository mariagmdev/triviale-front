import { Component, OnInit } from '@angular/core';
import { UsuarioPuntuacion } from 'src/app/models/usuario/usuario-puntuacion';
import { PartidaService } from 'src/app/services/partida/partida.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  usuarioPuntuaciones: UsuarioPuntuacion[];

  constructor(private partidaService: PartidaService) {}

  ngOnInit(): void {
    this.partidaService.obtenerRanking().subscribe((usuarioPuntuaciones) => {
      this.usuarioPuntuaciones = usuarioPuntuaciones;
    });
  }
}
