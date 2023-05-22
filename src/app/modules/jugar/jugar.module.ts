import { NgModule } from '@angular/core';
import { JugarComponent } from './jugar.component';
import { SharedModule } from '../shared/shared.module';
import { JugarRoutingModule } from './jugar-routing.module';
import { ResultadoPartidaComponent } from './components/resultado-partida/resultado-partida.component';
import { PreguntaPartidaComponent } from './components/pregunta-partida/pregunta-partida.component';

@NgModule({
  imports: [SharedModule, JugarRoutingModule],
  declarations: [
    JugarComponent,
    ResultadoPartidaComponent,
    PreguntaPartidaComponent,
  ],
})
export class JugarModule {}
