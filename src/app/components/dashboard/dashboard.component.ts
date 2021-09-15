import { Component, OnInit } from '@angular/core';
import { ProjectsService, Project } from '../../services/projects.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private data: ProjectsService) { }

  ngOnInit(): void {
    this.data.getProjects().subscribe()
  }

  get projects(): Project[] {
    return this.data.projects;
  }

}
