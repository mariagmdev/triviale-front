import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreguntasComponent } from './preguntas.component';
import { PreguntasCrearComponent } from './components/preguntas-crear/preguntas-crear.component';
import { adminGuard } from 'src/app/guards/admin.guard';

// Rutas del módulo de preguntas.
const routes: Routes = [
  {
    canActivate: [adminGuard],
    path: '',
    component: PreguntasComponent,
  },
  {
    path: 'crear',
    component: PreguntasCrearComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreguntasRoutingModule {}
