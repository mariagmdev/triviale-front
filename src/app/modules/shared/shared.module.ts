import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from 'src/app/components/cabecera/cabecera.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InicioSesionComponent } from 'src/app/components/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from 'src/app/components/registro/registro.component';

const triviale = [CabeceraComponent, InicioSesionComponent, RegistroComponent];
const angular = [ReactiveFormsModule];

@NgModule({
  imports: [CommonModule, ...angular],
  declarations: [...triviale],
  exports: [...angular, ...triviale],
})
export class SharedModule {}
