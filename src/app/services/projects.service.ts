import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { plainToClass } from 'class-transformer';

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

class AddProjectReturn {
  projectId!: number;
  todoId!: number;
}
class TodoId {
  todoId!: number
}
class TodoIdComp extends TodoId {
  isCompleted!: boolean;
}
class ProjectClass {
  id!: number;
  title!: string;
  todos!: Todo[]
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  url: string = environment.apiUrl;
	projects: Project[] = [];

  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get(this.url + '/projects').pipe(
      map(data => plainToClass(ProjectClass, data)),
      map(data => {
        this.projects = data as unknown as Project[];
      })
    );
  }

  addProject(project: Partial<Project>, todo: Partial<Todo>) {
    const body = { title: project.title, text: todo.text };
    this.http.post(this.url + '/todos', body).pipe(
      map(data => plainToClass(AddProjectReturn, data))
    ).subscribe(data => {
      const newProject: Project = { ...project, id: data.projectId } as Project;
      const newTodo: Todo = { ...todo, id: data.todoId } as Todo;
      project?.todos?.push(newTodo);
      this.projects.push(newProject);
    });    
  }

  addTodo(todo: Partial<Todo>, projectId: number) {
    const body = { id: projectId, text: todo.text };

  	this.http.post(this.url + '/todos', body).pipe(
      map(data => plainToClass(TodoId, data))
    ).subscribe(data => {
      const newTodo: Todo = { ...todo, id: data.todoId } as Todo;
      this.projects?.find((pr: Project) => pr.id === projectId)?.todos?.push(newTodo);
    });
  }

  patchTodo(projectId: number | undefined, todoId: number | undefined): void {
    const url = this.url + `/projects/${projectId}/todo/${todoId}`;

    this.http.patch(url, null).pipe(
      map(data => plainToClass(TodoIdComp, data))
    ).subscribe(data => {
      const todo = this.projects?.find((pr: Project) => pr?.id === projectId)?.todos?.find(((td: Todo) => td?.id === data?.todoId));

      if (typeof todo?.isCompleted === 'boolean') {
        todo.isCompleted = data.isCompleted;
      }
    });
  }
}
