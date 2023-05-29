import { Component, OnInit } from '@angular/core';
import { PreguntaRevision } from 'src/app/models/pregunta/pregunta-revision';
import { PreguntaService } from 'src/app/services/pregunta/pregunta.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss'],
})
export class PreguntasComponent implements OnInit {
  preguntas: PreguntaRevision[];
  constructor(private preguntaService: PreguntaService) {}

  ngOnInit() {
    this.preguntaService.listar().subscribe((preguntas) => {
      this.preguntas = preguntas;
      console.log(preguntas);
    });
  }
}
