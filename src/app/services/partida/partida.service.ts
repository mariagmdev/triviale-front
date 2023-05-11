import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pregunta } from 'src/app/models/pregunta/pregunta';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PartidaService {
  private readonly api = environment.api;

  constructor(private http: HttpClient) {}

  obtenerPreguntasPartida(idCategoria: number): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(
      `${this.api}/jugar.php?categoria=${idCategoria}`
    );
  }
}
