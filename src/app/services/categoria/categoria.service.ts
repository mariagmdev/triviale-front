import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Categoria } from 'src/app/models/categoria/categoria';
import { Observable } from 'rxjs';

/**
 * Servicio que gestiona todo lo relacionado con la entidad de Categoría.
 *
 * @export
 * @class CategoriaService
 */
@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private readonly api = environment.api;

  constructor(private http: HttpClient) {}

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.api}/categorias.php`);
  }

  listarCategoriasPartida(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.api}/categorias.php?partida`);
  }
}
