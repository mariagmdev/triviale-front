import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Usuario } from './models/usuario/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  /**
   * Escuchar el evento del cierre de la ventana para guardar la última actividad
   * del usuario en la aplicación web.
   */
  @HostListener('window:beforeunload') onCerrarApp() {
    this.guardarFechaSesion();
  }

  usuario?: Usuario;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.usuario$.subscribe((usuario) => (this.usuario = usuario));
  }

  guardarFechaSesion(): void {
    localStorage.setItem('fecha-sesion-usuario', new Date().toString());
  }
}
