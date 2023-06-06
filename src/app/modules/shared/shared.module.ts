import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReCaptchaV3Service, RecaptchaFormsModule } from 'ng-recaptcha';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { RankingComponent } from 'src/app/components/ranking/ranking.component';

const triviale = [RankingComponent];
const angular = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  RecaptchaFormsModule,
];
const ngZorro = [
  NzLayoutModule,
  NzMenuModule,
  NzCheckboxModule,
  NzIconModule,
  NzCollapseModule,
  NzModalModule,
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzDropDownModule,
  NzMessageModule,
  NzCardModule,
  NzDividerModule,
  NzTypographyModule,
  NzTableModule,
  NzToolTipModule,
  NzListModule,
  NzEmptyModule,
  NzSkeletonModule,
  NzInputNumberModule,
  NzPopconfirmModule,
  NzBadgeModule,
  NzSegmentedModule,
  NzRadioModule,
  NzSelectModule,
  NzAvatarModule,
  NzFormModule,
  NzSpinModule,
  NzDrawerModule,
  NzTabsModule,
];
@NgModule({
  imports: [...angular, ...ngZorro],
  declarations: [...triviale],
  exports: [...angular, ...triviale, ...ngZorro],
  providers: [ReCaptchaV3Service],
})
export class SharedModule {}
