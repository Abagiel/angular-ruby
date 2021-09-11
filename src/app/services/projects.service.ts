import { Injectable } from '@angular/core';

export interface Todo {
	id: number,
	text: string,
	isCompleted: boolean
}

export interface Project {
	id: number,
	title: string,
	todos: Todo[]
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
	projects: Project[] = [];

  constructor() { }

  addProject(project: Project) {
  	this.projects.push(project);
  	console.log('project');
  }

  addTodo(todo: Todo) {
  	console.log('todo');
  }
}
