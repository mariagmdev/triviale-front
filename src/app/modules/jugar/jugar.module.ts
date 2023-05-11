import { NgModule } from '@angular/core';
import { JugarComponent } from './jugar.component';
import { SharedModule } from '../shared/shared.module';
import { JugarRoutingModule } from './jugar-routing.module';

@NgModule({
  imports: [SharedModule, JugarRoutingModule],
  declarations: [JugarComponent],
})
export class JugarModule {}
