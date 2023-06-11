import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario';
import { AuthService } from 'src/app/services/auth/auth.service';

/**
 * Componente de cabecera.
 *
 * @export
 * @class CabeceraComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
})
export class CabeceraComponent implements OnInit {
  usuario?: Usuario;
  mostrarInicioSesion: boolean;
  mostrarRegistro: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Obtener el usuario iniciado.
    this.authService.usuario$.subscribe((usuario) => (this.usuario = usuario));
  }

  onCerrarSesion(): void {
    this.authService.cerrarSesion();
  }
}
