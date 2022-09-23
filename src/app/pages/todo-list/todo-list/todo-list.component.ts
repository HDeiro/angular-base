import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoListService } from 'src/app/common/services/todo-list/todo-list.service';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  list: any[] = [];

  constructor(
    public todolistservice: TodoListService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listAllItems();
  }

  listAllItems(): void {
    this.todolistservice.getItems().subscribe(res => res.forEach(element => {
      this.list.push(element);
    }));
  }

  createNewItem(): void {
    this.dialog.open(TodoFormComponent)
    .afterClosed().subscribe(res=> {
      if(res == true) {
        this.list = [];
        this.listAllItems();
      }
    });
  }

  deleteItem(id: number): void {
    this.todolistservice.deleteItem(id).subscribe(res => {
      console.log("Deleted successfully!");
      this.refreshList(id);
    });
  }

  editItem(element: any): void {
    this.dialog.open(TodoFormComponent, { data: { element: element }})
    .afterClosed().subscribe(res=> {
      if(res == true) {
        this.list = [];
        this.listAllItems();
      }
    });
    
  }

  refreshList(id: number): void {
    let obj = this.list.filter(obj => {
      return obj.id != id;
    })
    this.list = obj;
  }

}
