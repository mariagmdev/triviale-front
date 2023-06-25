import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { Rol } from 'src/app/enums/rol/rol';
import { Broma } from 'src/app/models/broma/broma';
import { Clima } from 'src/app/models/clima/clima';
import { Usuario } from 'src/app/models/usuario/usuario';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BromaService } from 'src/app/services/broma/broma.service';
import { ClimaService } from 'src/app/services/clima/clima.service';
import { CuriosidadFechaService } from 'src/app/services/curiosidad-fecha/curiosidad-fecha.service';

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
  broma?: Broma;
  clima?: Clima;
  curiosidad?: string;
  fecha: Date = new Date();
  private activo = true;

  constructor(
    private authService: AuthService,
    private bromaService: BromaService,
    private climaService: ClimaService,
    private curiosidadFechaService: CuriosidadFechaService
  ) {}

  ngOnInit(): void {
    // Obtener el usuario iniciado.
    this.authService.usuario$
      .pipe(takeWhile(() => this.activo))
      .subscribe((usuario) => {
        this.usuario = usuario;
        this.esAdmin = usuario?.idRol === Rol.admin;
      });
    // Consumir servicio de API's
    this.bromaService.obtener().subscribe((broma) => (this.broma = broma));
    this.climaService.obtener().subscribe((clima) => (this.clima = clima));
    this.curiosidadFechaService
      .obtenerCuriosidad(this.fecha)
      .subscribe((curiosidad) => (this.curiosidad = curiosidad));
  }

  ngOnDestroy(): void {
    this.activo = false;
  }
}
