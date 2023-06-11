import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { InicioComponent } from './components/inicio/inicio.component';

// Rutas generales de la aplicación.
const routes: Routes = [
  {
    path: 'jugar',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/jugar/jugar.module').then((m) => m.JugarModule),
  },
  {
    path: 'preguntas',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/preguntas/preguntas.module').then(
        (m) => m.PreguntasModule
      ),
  },
  {
    path: '',
    component: InicioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
