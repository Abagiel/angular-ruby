import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
  	const dialogRef = this.dialog.open(DialogComponent, {
  		width: '400px',
      panelClass: 'dialog'
  	});

  	dialogRef.afterClosed().subscribe(result => {

  	});
  }

  ngOnInit(): void {
  }

}
