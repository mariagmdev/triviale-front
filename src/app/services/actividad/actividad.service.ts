import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividad } from 'src/app/models/actividad/actividad';
/**
 * Servicio que gestiona todo lo relacionado con la entidad Actividad
 *
 * @export
 * @class ActividadService
 */
@Injectable({ providedIn: 'root' })
export class ActividadService {
  constructor(private http: HttpClient) {}

  obtener(): Observable<Actividad> {
    return this.http.get<Actividad>(`http://www.boredapi.com/api/activity/`);
  }
}
