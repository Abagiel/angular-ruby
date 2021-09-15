import { Component, OnInit, Input } from '@angular/core';
import { ProjectsService, Todo } from '../../services/projects.service';

@Component({
  selector: 'app-todo-element',
  templateUrl: './todo-element.component.html',
  styleUrls: ['./todo-element.component.css']
})
export class TodoElementComponent implements OnInit {
	@Input() todo: Partial<Todo> = {};
	@Input() projectId: number | undefined;

	checked: boolean = false;

  constructor(private service: ProjectsService) { }

  ngOnInit(): void {
  	this.checked = this.todo?.isCompleted as boolean;
  }

  patchTodo(): void {
  	this.service.patchTodo(this.projectId, this.todo.id);
  }

}
