import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PreguntaCreacion } from 'src/app/models/pregunta/pregunta-creacion';

@Injectable({ providedIn: 'root' })
export class PreguntaService {
  private readonly api = environment.api;
  constructor(private http: HttpClient) {}

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
}
