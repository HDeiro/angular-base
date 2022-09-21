import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TodoListComponent } from './todo-list.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: TodoListComponent}])
  ],
})
export class TodoListModule { }
