import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  httpOptions = {
    headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')
  }

  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get('https://ruby-task.herokuapp.com/projects', { headers: this.httpOptions.headers });
  }

  addProject(project: Project) {
  	this.projects.push(project);
  	console.log('project');
  }

  addTodo(todo: Todo) {
  	console.log('todo');
  }
}
