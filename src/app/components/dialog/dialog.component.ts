import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectsService, Todo, Project } from '../../services/projects.service';

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
  		"taskTitle": new FormControl(''),
  		"taskCategory": new FormControl(''),
  		"newCategory": new FormControl('')
  	});
  }

  dialogClose(): void {
  	this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  get projects() {
    return this.service.projects;
  }

  submit(): void {
  	this.dialogClose();

  	const data = this.taskForm.value;
  	const todo: Todo = {
  		id: Date.now(),
  		text: data.taskTitle,
  		isCompleted: false
  	}

  	if (this.isNewCategory) {
  		const project: Project = {
  			id: this.service.projects.length + 1,
  			title: data.newCategory,
  			todos: []
  		}

  		project.todos.push(todo);

  		this.service.addProject(project, todo);
  	} else {
  		this.service.addTodo(todo, data.taskCategory);
  	}

  	this.isNewCategory = false;
  }

  onChange(e: any): void {
  	if (e.value === 'new') {
  		this.isNewCategory = true;
  	} else {
  		this.isNewCategory = false;
  	}
  }

}
