import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from 'src/app/components/cabecera/cabecera.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InicioSesionComponent } from 'src/app/components/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from 'src/app/components/registro/registro.component';
import { NotificacionComponent } from 'src/app/components/notificacion/notificacion.component';

const triviale = [
  CabeceraComponent,
  InicioSesionComponent,
  RegistroComponent,
  NotificacionComponent,
];
const angular = [CommonModule, ReactiveFormsModule];

@NgModule({
  imports: [...angular],
  declarations: [...triviale],
  exports: [...angular, ...triviale],
})
export class SharedModule {}
