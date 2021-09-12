import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private data: ProjectsService) { }
  projects: any;

  ngOnInit(): void {
  	this.data.getProjects().subscribe(data => {
  		console.log(data);
  	});
  }

}
