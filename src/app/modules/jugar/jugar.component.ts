import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria/categoria';
import { Pregunta } from 'src/app/models/pregunta/pregunta';
import { PreguntaRespondida } from 'src/app/models/pregunta/pregunta-respondida';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
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
  vidasRestantes: number = 3;
  fechaComienzo: number;
  milisegundos: number = 0;
  categorias: Categoria[];
  categoriasSeleccionadas: Categoria[];
  totalPreguntasPorCategorias: number = 0;
  private intervalo: NodeJS.Timer;

  private preguntasRespondidas: PreguntaRespondida[] = [];

  constructor(
    private partidaService: PartidaService,
    private preguntaService: PreguntaService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.categoriaService.listarCategoriasPartida().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  onResponder(preguntaRespondida: PreguntaRespondida): void {
    this.preguntasRespondidas.push(preguntaRespondida);
    if (this.indexPreguntaActual < this.preguntas.length - 1) {
      this.indexPreguntaActual++;
      if (preguntaRespondida.esCorrecta) {
        this.puntos += 10;
      } else {
        this.vidasRestantes--;
        if (this.vidasRestantes === 0) {
          this.terminarPartida();
        }
      }
    } else {
      this.terminarPartida();
      this.partidaService
        .crearPuntuacion(this.preguntasRespondidas, this.milisegundos / 1000)
        .subscribe((puntos) => {
          this.puntos = puntos;
        });
    }
  }
  onCambioCategorias(categorias: Categoria[]): void {
    this.totalPreguntasPorCategorias = 0;
    this.categoriasSeleccionadas = categorias;
    categorias.forEach((categoria) => {
      this.totalPreguntasPorCategorias += categoria.cantidadPreguntas!;
    });
  }

  onComenzarPartida(): void {
    const idCategorias = this.categoriasSeleccionadas.map(
      (categoria) => categoria.id
    );
    this.partidaService
      .obtenerPreguntasPartida(idCategorias)
      .subscribe((preguntas) => {
        this.preguntas = preguntas;
        this.indexPreguntaActual = 0;
        this.comenzarContador();
      });
  }
  private comenzarContador(): void {
    this.fechaComienzo = new Date().getTime();
    this.intervalo = setInterval(() => {
      this.milisegundos = new Date().getTime() - this.fechaComienzo;
    }, 1000);
  }

  private terminarPartida(): void {
    this.estaPartidaTerminada = true;
    clearInterval(this.intervalo);
  }
}
