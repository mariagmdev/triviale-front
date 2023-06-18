import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { Rol } from 'src/app/enums/rol/rol';
import { Usuario } from 'src/app/models/usuario/usuario';
import { AuthService } from 'src/app/services/auth/auth.service';

/**
 * Componente de inicio de la aplicación.
 *
 * @export
 * @class InicioComponent
 * @implements {OnInit, OnDestroy}
 */
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit, OnDestroy {
  usuario?: Usuario;
  esAdmin = false;
  mostrarInicioSesion: boolean;
  mostrarRegistro: boolean;
  private activo = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Obtener el usuario iniciado.
    this.authService.usuario$
      .pipe(takeWhile(() => this.activo))
      .subscribe((usuario) => {
        this.usuario = usuario;
        this.esAdmin = usuario?.idRol === Rol.admin;
      });
  }

  ngOnDestroy(): void {
    this.activo = false;
  }
}
