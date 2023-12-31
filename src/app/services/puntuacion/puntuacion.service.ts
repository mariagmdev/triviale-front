import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PreguntaRespondida } from 'src/app/models/pregunta/pregunta-respondida';
import { UsuarioPuntuacion } from 'src/app/models/usuario/usuario-puntuacion';
import { environment } from 'src/environments/environment';

/**
 * Servicio que gestiona todo lo relacionado con la entidad de Puntuación.
 *
 * @export
 * @class PuntuacionService
 */
@Injectable({
  providedIn: 'root',
})
export class PuntuacionService {
  private readonly api = environment.api;

  constructor(private http: HttpClient) {}

  crearPuntuacion(
    preguntas: PreguntaRespondida[],
    tiempoEmpleado: number
  ): Observable<number> {
    return this.http.post<number>(`${this.api}/puntuaciones.php`, {
      preguntas: preguntas,
      tiempo: tiempoEmpleado,
      crear: true,
    });
  }

  obtenerRanking(): Observable<UsuarioPuntuacion[]> {
    return this.http.get<UsuarioPuntuacion[]>(
      `${this.api}/puntuaciones.php?ranking=true`
    );
  }
}
