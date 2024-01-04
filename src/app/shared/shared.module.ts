import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

const modules = [
  NzButtonModule,
  NzDropDownModule,
  NzLayoutModule,
  NzTypographyModule,
  NzCardModule,
  NzInputModule,
  NzFormModule,
  NzSpinModule,
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [...modules]
})
export class SharedModule { }
