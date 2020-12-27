import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: AboutComponent}])
  ],
  exports: [RouterModule]
})
export class AboutRouting { }
