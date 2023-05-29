import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreguntasComponent } from './preguntas.component';
import { PreguntasCrearComponent } from './components/preguntas-crear/preguntas-crear.component';

const routes: Routes = [
  {
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
