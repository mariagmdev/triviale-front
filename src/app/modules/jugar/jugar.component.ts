import { Component, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/models/pregunta/pregunta';
import { PreguntaRespondida } from 'src/app/models/pregunta/pregunta-respondida';
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
  puntos = 0;
  estaPartidaTerminada = false;

  private preguntasRespondidas: PreguntaRespondida[] = [];

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

  onResponder(preguntaRespondida: PreguntaRespondida) {
    this.preguntasRespondidas.push(preguntaRespondida);
    if (this.indexPreguntaActual < this.preguntas.length - 1) {
      this.indexPreguntaActual++;
      if (preguntaRespondida.esCorrecta) {
        this.puntos += 10;
      }
    } else {
      this.estaPartidaTerminada = true;
      this.partidaService
        .crearPuntuacion(this.preguntasRespondidas)
        .subscribe((puntos) => {
          this.puntos = puntos;
        });
    }
  }
}
