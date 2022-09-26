import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TodoListService } from 'src/app/common/services/todo-list/todo-list.service';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { Todo } from 'src/app/common/models/todo';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  list: any;
  filters: string[] = ['tilte', 'content'];
  dataSource: MatTableDataSource<Todo>;
  displayedColumns: string[] = ['title', 'content', 'createdAt', 'action-buttons'];
  
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public todolistservice: TodoListService,
    public dialog: MatDialog,
    private translate: TranslateService
  ) {
    const {language} = window.navigator;
    this.translate.use(language.toLowerCase());
  }

  ngOnInit(): void {
    this.listAllItems();
  }

  listAllItems(): void {
    this.todolistservice.getItems().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
    });
  }

  createNewItem(): void {
    this.dialog.open(TodoFormComponent, {
      width: '600px',
      disableClose: true
    })
    .afterClosed().subscribe(res=> {
      if(res == true) {
        this.listAllItems();
      }
    });
  }

  deleteItem(id: number): void {
    this.todolistservice.deleteItem(id).subscribe(res => {
      console.log("Deleted successfully!");
      this.listAllItems();
    });
  }

  editItem(element: any): void {
    this.dialog.open(TodoFormComponent, {
      data: { element: element },
      width: '600px',
      disableClose: true
    })
    .afterClosed().subscribe(res=> {
      if(res == true) {
        this.listAllItems();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
