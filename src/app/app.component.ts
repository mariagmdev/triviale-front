import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Usuario } from './models/usuario/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  usuario?: Usuario;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.usuario$.subscribe((usuario) => (this.usuario = usuario));
  }
}
