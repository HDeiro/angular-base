import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: HomeComponent}])
  ],
  exports: [RouterModule]
})
export class HomeRouting { }
