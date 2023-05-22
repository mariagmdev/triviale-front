import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pregunta } from 'src/app/models/pregunta/pregunta';
import { PreguntaRespondida } from 'src/app/models/pregunta/pregunta-respondida';
import { PreguntaService } from 'src/app/services/pregunta/pregunta.service';

@Component({
  selector: 'app-pregunta-partida',
  templateUrl: './pregunta-partida.component.html',
  styleUrls: ['./pregunta-partida.component.scss'],
})
export class PreguntaPartidaComponent {
  @Input() pregunta: Pregunta;
  @Input() indexPregunta: number;
  @Output() preguntaRespondida = new EventEmitter<PreguntaRespondida>();

  constructor(private preguntaService: PreguntaService) {}

  onResponder(idRespuesta: number): void {
    this.preguntaService
      .validar(this.pregunta.id, idRespuesta)
      .subscribe((esCorrecta) => {
        this.preguntaRespondida.emit({
          idPregunta: this.pregunta.id,
          idRespuesta: idRespuesta,
          esCorrecta: esCorrecta,
        });
      });
  }
}
