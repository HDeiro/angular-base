import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AvatarComponent],
  exports: [AvatarComponent],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class AvatarModule { }
