import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../services/projects.service';

@Component({
  selector: 'app-todo-category',
  templateUrl: './todo-category.component.html',
  styleUrls: ['./todo-category.component.css']
})
export class TodoCategoryComponent implements OnInit {
	@Input() project: Partial<Project> = {};

  constructor() { }

  ngOnInit(): void {
  }

}
