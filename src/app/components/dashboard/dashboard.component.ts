import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private data: ProjectsService) { }

  ngOnInit(): void {
  	this.data.getProjects().subscribe(response => {
  		this.data.projects = response;
  	});
  }

  get projects() {
    return this.data.projects;
  }

}
