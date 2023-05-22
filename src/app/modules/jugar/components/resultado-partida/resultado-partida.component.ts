import { Component, Input, OnInit } from '@angular/core';
import { UsuarioPuntuacion } from 'src/app/models/usuario/usuario-puntuacion';
import { PartidaService } from 'src/app/services/partida/partida.service';

@Component({
  selector: 'app-resultado-partida',
  templateUrl: './resultado-partida.component.html',
  styleUrls: ['./resultado-partida.component.scss'],
})
export class ResultadoPartidaComponent implements OnInit {
  @Input() puntos: number;

  usuarioPuntuaciones: UsuarioPuntuacion[];

  constructor(private partidaService: PartidaService) {}

  ngOnInit(): void {
    this.partidaService.obtenerRanking().subscribe((usuarioPuntuaciones) => {
      this.usuarioPuntuaciones = usuarioPuntuaciones;
    });
  }
}
