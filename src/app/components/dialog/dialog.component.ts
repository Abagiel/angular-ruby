import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ProjectsService, Todo, Project } from '../../services/projects.service';

interface FormData {
  taskTitle: string;
  taskCategory: number;
  newCategory?: string
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
	taskForm: FormGroup;
	isNewCategory: boolean = false;

  constructor(
  	private service: ProjectsService,
  	public dialogRef: MatDialogRef<DialogComponent>) {
  	this.taskForm = new FormGroup({
  		"taskTitle": new FormControl('', Validators.required),
  		"taskCategory": new FormControl('', Validators.required)
  	});
  }

  dialogClose(): void {
  	this.dialogRef.close();
  }

  ngOnInit(): void {}

  get projects(): Project[] {
    return this.service.projects;
  }

  submit(): void {
  	this.dialogClose();

  	const data: FormData = this.taskForm.value;
  	const todo: Partial<Todo> = {
  		text: data.taskTitle,
  		isCompleted: false
  	}

  	if (this.isNewCategory) {
  		const project: Partial<Project> = {
  			title: data.newCategory,
  			todos: []
  		}
  		this.service.addProject(project, todo);
  	} else {
  		this.service.addTodo(todo, data.taskCategory);
  	}

  	this.isNewCategory = false;
  }

  onChange(e: MatSelectChange): void {
  	if (e.value === 'new') {
      this.taskForm.addControl('newCategory', new FormControl('', Validators.required));
  		this.isNewCategory = true;
  	} else {
      this.taskForm.removeControl('newCategory');
  		this.isNewCategory = false;
  	}
  }

}
