import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JugarComponent } from './jugar.component';

// Rutas del módulo de jugar.
const routes: Routes = [
  {
    path: '',
    component: JugarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JugarRoutingModule {}
