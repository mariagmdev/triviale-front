import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clima } from 'src/app/models/clima/clima';

/**
 * Servicio que gestiona todo lo relacionado con la entidad de Clima.
 *
 * @export
 * @class ClimaService
 */
@Injectable({ providedIn: 'root' })
export class ClimaService {
  private readonly codigoProvincia: number = 19;
  private readonly codigoMunicipio: number = 19046;
  private readonly api = environment.weatherApi;
  private readonly imgApi = environment.weatherImgApi;

  constructor(private http: HttpClient) {}

  obtener(): Observable<Clima> {
    return this.http
      .get<Clima>(
        `${this.api}/json/v2/provincias/${this.codigoProvincia}/municipios/${this.codigoMunicipio}`
      )
      .pipe(
        tap((clima) => {
          clima.imagen = `${this.imgApi}/${clima.stateSky.id}_g.png`;
        })
      );
  }
}
