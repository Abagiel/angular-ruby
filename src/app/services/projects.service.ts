import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
	projects: any = [];

  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get('https://ruby-task.herokuapp.com/projects');
  }

  addProject(project: Project, todo: Todo) {
    const body = { title: project.title, text: todo.text };
  	this.projects.push(project);
    this.http.post('https://ruby-task.herokuapp.com/todos', body).subscribe(console.log);    
  }

  addTodo(todo: Todo, projectId: number) {
    const body = { id: projectId, text: todo.text };
    this.projects[projectId - 1].todos.push(todo);

  	this.http.post('https://ruby-task.herokuapp.com/todos', body).subscribe(console.log);
  }

  patchTodo(projectId: number, todoId: number, todoOrderId: number): void {
    const isComp = this.projects[projectId - 1].todos[todoOrderId].isCompleted;
    this.projects[projectId - 1].todos[todoOrderId].isCompleted = !isComp;
    const url = `https://ruby-task.herokuapp.com/projects/${projectId}/todo/${todoId}`;

    this.http.patch(url, null).subscribe(console.log);
  }
}
