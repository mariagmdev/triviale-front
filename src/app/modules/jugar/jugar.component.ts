import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria/categoria';
import { Pregunta } from 'src/app/models/pregunta/pregunta';
import { PreguntaRespondida } from 'src/app/models/pregunta/pregunta-respondida';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { PuntuacionService } from 'src/app/services/puntuacion/puntuacion.service';
import { PreguntaService } from 'src/app/services/pregunta/pregunta.service';

/**
 * Componente de jugar una partida.
 *
 * @export
 * @class JugarComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.component.html',
  styleUrls: ['./jugar.component.scss'],
})
export class JugarComponent implements OnInit {
  indexPreguntaActual?: number;
  preguntas?: Pregunta[];
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
    private puntuacionService: PuntuacionService,
    private preguntaService: PreguntaService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    // Listar categorías disponibles.
    this.categoriaService.listarCategoriasPartida().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  /**
   * Verifica cada pregunta para sumar o no puntuación y si es la última procede a enviarlas todas al servidor
   * para comprobar sus respuestas correctas y generar una puntuación
   *
   * @param {PreguntaRespondida} preguntaRespondida
   * @memberof JugarComponent
   */
  onResponder(preguntaRespondida: PreguntaRespondida): void {
    // Almacenar la pregunta respondida y su respuesta.
    this.preguntasRespondidas.push(preguntaRespondida);
    if (this.indexPreguntaActual! < this.preguntas!.length - 1) {
      this.indexPreguntaActual!++;
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
      this.puntuacionService
        .crearPuntuacion(this.preguntasRespondidas, this.milisegundos / 1000)
        .subscribe((puntos) => {
          this.puntos = puntos;
        });
    }
  }

  /**
   * Actualizar el total de preguntas a utilizar para el test cuando cambien las categorías seleccionadas.
   *
   * @memberof JugarComponent
   */
  onCambioCategorias(): void {
    this.totalPreguntasPorCategorias = 0;
    this.categoriasSeleccionadas.forEach((categoria) => {
      this.totalPreguntasPorCategorias += categoria.cantidadPreguntas!;
    });
  }

  /**
   * Obtiene las preguntas según las categorías seleccionadas y comienza la partida.
   *
   * @memberof JugarComponent
   */
  onComenzarPartida(): void {
    const idCategorias = this.categoriasSeleccionadas.map(
      (categoria) => categoria.id
    );
    this.preguntaService
      .obtenerPreguntasPartida(idCategorias)
      .subscribe((preguntas) => {
        this.preguntas = preguntas;
        this.indexPreguntaActual = 0;
        this.comenzarContador();
      });
  }

  /**
   * Restablece el estado de la partida al inicio, restaurando las propiedades de la misma.
   *
   * @memberof JugarComponent
   */
  onReiniciarPartida(): void {
    this.preguntas = undefined;
    this.indexPreguntaActual = undefined;
    this.puntos = 0;
    this.vidasRestantes = 3;
    this.categoriasSeleccionadas = [];
    this.onCambioCategorias();
    this.preguntasRespondidas = [];
    this.estaPartidaTerminada = false;
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
