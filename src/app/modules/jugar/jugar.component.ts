import { Component, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/models/pregunta/pregunta';
import { PartidaService } from 'src/app/services/partida/partida.service';
import { PreguntaService } from 'src/app/services/pregunta/pregunta.service';

@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.component.html',
  styleUrls: ['./jugar.component.scss'],
})
export class JugarComponent implements OnInit {
  indexPreguntaActual: number;
  preguntas: Pregunta[];
  puntuacion = 0;
  constructor(
    private partidaService: PartidaService,
    private preguntaService: PreguntaService
  ) {}

  ngOnInit(): void {
    this.partidaService.obtenerPreguntasPartida(1).subscribe((preguntas) => {
      this.preguntas = preguntas;
      this.indexPreguntaActual = 0;
    });
  }

  onResponder(idRespuesta: number) {
    this.preguntaService
      .validar(this.preguntas[this.indexPreguntaActual].id, idRespuesta)
      .subscribe((esCorrecta) => {
        this.indexPreguntaActual++;
        if (esCorrecta) {
          this.puntuacion += 10;
        }
      });
  }
}
