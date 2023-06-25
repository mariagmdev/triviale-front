import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
/**
 * Servicio que gestiona todo lo relacionado con la curiosidad de una fecha
 *
 * @export
 * @class CuriosidadFechaService
 */
@Injectable({ providedIn: 'root' })
export class CuriosidadFechaService {
  private readonly api = environment.fecha;

  constructor(private http: HttpClient) {}

  obtenerCuriosidad(fecha: Date): Observable<string> {
    return this.http.get<string>(
      `${this.api}/${fecha.getMonth() + 1}/${fecha.getDate()}/date`,
      { responseType: 'text' as 'json' }
    );
  }
}
