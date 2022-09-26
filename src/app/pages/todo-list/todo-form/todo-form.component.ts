import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { TodoListService } from 'src/app/common/services/todo-list/todo-list.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  id: number;
  form: FormGroup;
  edit: boolean = false;
  action: string = "app.header.todo-list-form-new";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    public todolistservice: TodoListService,
    private _dialogRef: MatDialogRef<TodoFormComponent>,
    private translate: TranslateService
  ) {
    const {language} = window.navigator;
    this.translate.use(language.toLowerCase());
    this.createForm();
  }

  ngOnInit(): void {
    this.id = this.data?.element.id;
    if(this.id) {
      this.edit = true;
      this.action = "app.header.todo-list-form-edit";
      this.loadData();
    }
  }
  
  createForm(): void {
    this.form = this._fb.group({
      color: [],
      content: [],
      title: []
    })
  }

  loadData(): void {
    this.form.patchValue({
      color: this.data.element.color,
      content: this.data.element.content,
      title: this.data.element.title,
    })
  }

  submit(): void {
    if(this.id) {
      this.form.value.id = this.id;
      this.todolistservice.editItem(this.form.value, this.id).subscribe(res => {
        console.log("Edited successfully!");
        this._dialogRef.close(true);
      });
    }
    else {
      this.todolistservice.createItem(this.form.value).subscribe(res => {
        console.log("Created successfully!");
        this._dialogRef.close(true);
      });
    }
  }

}
