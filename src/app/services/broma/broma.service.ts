import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Broma } from 'src/app/models/broma/broma';
import { environment } from 'src/environments/environment';

/**
 * Servicio que gestiona todo lo relacionado con la broma
 *
 * @export
 * @class BromaService
 */
@Injectable({ providedIn: 'root' })
export class BromaService {
  private readonly api = environment.jokeApi;

  constructor(private http: HttpClient) {}

  obtener(): Observable<Broma> {
    return this.http.get<Broma>(
      `${this.api}/joke/Any?lang=es&blacklistFlags=nsfw,racist`
    );
  }
}
