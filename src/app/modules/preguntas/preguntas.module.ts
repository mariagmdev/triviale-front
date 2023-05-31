import { NgModule } from '@angular/core';
import { PreguntasComponent } from './preguntas.component';
import { SharedModule } from '../shared/shared.module';
import { PreguntasRoutingModule } from './preguntas-routing.module';
import { PreguntasCrearComponent } from './components/preguntas-crear/preguntas-crear.component';
import { PreguntasEditarComponent } from './components/preguntas-editar/preguntas-editar.component';

@NgModule({
  imports: [SharedModule, PreguntasRoutingModule],
  declarations: [
    PreguntasComponent,
    PreguntasCrearComponent,
    PreguntasEditarComponent,
  ],
})
export class PreguntasModule {}
