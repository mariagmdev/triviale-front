import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PreguntaCreacion } from 'src/app/models/pregunta/pregunta-creacion';
import { PreguntaRevision } from 'src/app/models/pregunta/pregunta-revision';
import { PreguntaEdicion } from 'src/app/models/pregunta/pregunta-edicion';
import { Pregunta } from 'src/app/models/pregunta/pregunta';

/**
 * Servicio que gestiona todo lo relacionado con la entidad de Pregunta.
 *
 * @export
 * @class PreguntaService
 */
@Injectable({ providedIn: 'root' })
export class PreguntaService {
  private readonly api = environment.api;
  constructor(private http: HttpClient) {}

  obtenerPreguntasPartida(idCategorias: number[]): Observable<Pregunta[]> {
    return this.http.post<Pregunta[]>(`${this.api}/preguntas.php`, {
      idCategorias: idCategorias,
    });
  }

  validar(idPregunta: number, idRespuesta: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.api}/preguntas.php`, {
      idPregunta: idPregunta,
      idRespuesta: idRespuesta,
      validar: true,
    });
  }

  crear(pregunta: PreguntaCreacion): Observable<void> {
    return this.http.post<void>(`${this.api}/preguntas.php`, {
      ...pregunta,
      crear: true,
    });
  }

  listar(): Observable<PreguntaRevision[]> {
    return this.http.get<PreguntaRevision[]>(`${this.api}/preguntas.php`);
  }

  obtener(id: number): Observable<PreguntaEdicion> {
    return this.http.get<PreguntaEdicion>(`${this.api}/preguntas.php?id=${id}`);
  }

  modificar(id: number, pregunta: PreguntaEdicion): Observable<void> {
    return this.http.put<void>(`${this.api}/preguntas.php?id=${id}`, {
      ...pregunta,
      modificar: true,
    });
  }

  establecerVisibilidad(id: number, esPublica: boolean): Observable<void> {
    return this.http.patch<void>(`${this.api}/preguntas.php`, {
      id: id,
      esPublica: esPublica,
      visibilidad: true,
    });
  }
}
