import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioInicioSesion } from 'src/app/models/usuario/usuario-login';
import { UsuarioRegistro } from 'src/app/models/usuario/usuario-registro';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly api = environment.api;
  constructor(private http: HttpClient) {}

  registrar(usuario: UsuarioRegistro): Observable<any> {
    return this.http.post<any>(`${this.api}/auth.php`, usuario);
  }

  iniciarSesion(usuario: UsuarioInicioSesion): Observable<any> {
    return this.http.post<any>(`${this.api}/auth.php`, usuario);
  }
}
