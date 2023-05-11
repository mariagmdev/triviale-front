import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Usuario } from './models/usuario/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  usuario?: Usuario;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.usuario$.subscribe((usuario) => (this.usuario = usuario));
  }

  onJugar(): void {
    this.router.navigateByUrl('/jugar');
  }
}
