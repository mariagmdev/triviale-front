import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, skip, tap } from 'rxjs';
import { Usuario } from 'src/app/models/usuario/usuario';
import { UsuarioInicioSesion } from 'src/app/models/usuario/usuario-login';
import { UsuarioRegistro } from 'src/app/models/usuario/usuario-registro';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly usuario$ = new BehaviorSubject<Usuario | undefined>(undefined);

  private readonly api = environment.api;

  constructor(private http: HttpClient, private router: Router) {
    this.usuario$.pipe(skip(1)).subscribe((usuario) => {
      if (usuario) {
        localStorage.setItem('usuario-triviale', JSON.stringify(usuario));
      } else {
        localStorage.removeItem('usuario-triviale');
      }
    });

    const usuarioStr = localStorage.getItem('usuario-triviale');
    const fechaStr = localStorage.getItem('fecha-sesion-usuario');
    if (usuarioStr && fechaStr) {
      const fecha = new Date(fechaStr);
      const fechaAhora = new Date();
      if (fechaAhora.getTime() < fecha.getTime() + 30 * 60 * 1000) {
        // Comprobamos que la sesión lleve menos de 30 minutos
        const usuario = JSON.parse(usuarioStr);
        this.usuario$.next(usuario);
      } else {
        this.limpiarDatosSesion();
      }
    } else {
      this.limpiarDatosSesion();
    }
  }

  registrar(usuario: UsuarioRegistro): Observable<Usuario> {
    return this.http
      .post<Usuario>(`${this.api}/auth.php`, usuario)
      .pipe(tap((usuario) => this.usuario$.next(usuario)));
  }

  iniciarSesion(usuario: UsuarioInicioSesion): Observable<Usuario> {
    return this.http
      .post<Usuario>(`${this.api}/auth.php`, usuario)
      .pipe(tap((usuario) => this.usuario$.next(usuario)));
  }

  cerrarSesion(): void {
    this.usuario$.next(undefined);
    this.limpiarDatosSesion();
    this.router.navigateByUrl('/');
  }

  verificarRecaptcha(token: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.api}/recaptcha.php`, {
      verificar: true,
      token: token,
    });
  }

  private limpiarDatosSesion(): void {
    localStorage.removeItem('usuario-triviale');
    localStorage.removeItem('fecha-sesion-usuario');
  }
}
