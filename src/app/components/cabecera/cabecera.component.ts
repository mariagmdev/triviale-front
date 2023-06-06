import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario';
import { AuthService } from 'src/app/services/auth/auth.service';

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
    this.authService.usuario$.subscribe((usuario) => (this.usuario = usuario));
  }

  onCerrarSesion(): void {
    this.authService.cerrarSesion();
  }
}
