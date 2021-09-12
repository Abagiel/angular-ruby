import { Component, OnInit, Input } from '@angular/core';
import { ProjectsService, Todo } from '../../services/projects.service';

@Component({
  selector: 'app-todo-element',
  templateUrl: './todo-element.component.html',
  styleUrls: ['./todo-element.component.css']
})
export class TodoElementComponent implements OnInit {
	@Input() todo: Todo = {id: -1, text: '', isCompleted: false};
	@Input() projectId: number = 0;
	@Input() todoOrderId: number = 0;

	checked: boolean = false;

  constructor(private service: ProjectsService) { }

  ngOnInit(): void {
  	this.checked = this.todo.isCompleted;
  }

  patchTodo() {
  	this.service.patchTodo(this.projectId, this.todo.id, this.todoOrderId);
  }

}
