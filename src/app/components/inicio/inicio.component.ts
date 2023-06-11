import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/enums/rol/rol';
import { Usuario } from 'src/app/models/usuario/usuario';
import { AuthService } from 'src/app/services/auth/auth.service';

/**
 * Componente de inicio de la aplicación.
 *
 * @export
 * @class InicioComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  usuario?: Usuario;
  esAdmin = false;
  mostrarInicioSesion: boolean;
  mostrarRegistro: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Obtener el usuario iniciado.
    this.authService.usuario$.subscribe((usuario) => {
      this.usuario = usuario;
      this.esAdmin = usuario?.idRol === Rol.admin;
    });
  }
}
