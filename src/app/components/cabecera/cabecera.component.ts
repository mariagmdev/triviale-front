import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
})
export class CabeceraComponent {
  constructor(private authService: AuthService) {}

  onCerrarSesion(): void {
    this.authService.cerrarSesion();
  }
}
