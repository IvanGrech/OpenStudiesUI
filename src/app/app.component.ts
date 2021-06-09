import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateCourseDialogComponent } from './components/misc/create-course-dialog/create-course-dialog.component';
import {SubscribeDialogComponent} from "./components/misc/subscribe-dialog/subscribe-dialog.component";
import * as properties from '../properties';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{


  public fname: string;
  public lname: string;

  ngOnInit(): void {

  }

  constructor(public dialog: MatDialog, private router: Router, private authService: AuthService) {
  }

  isLoggedIn(): boolean{
    this.fname = this.authService.getFirstName();
    this.lname = this.authService.getLastName();
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  showCreateCourseDialog() {
    const dialogRef = this.dialog.open(CreateCourseDialogComponent, {
      width: '20%'
    });

    dialogRef.afterClosed().subscribe(result => {
      //add message about the result here (maybe a new dialog)
    });
  }

  showSubscribeCourseDialog() {
    const dialogRef = this.dialog.open(SubscribeDialogComponent, {
      width: '20%'
    });

    dialogRef.afterClosed().subscribe(result => {
      //add message about the result here (maybe a new dialog)
    });
  }

  openTimeTableTab() {
    window.open(properties.timeTableUrl);
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('decodedToken')
    this.router.navigate(['/login'])
  }

}
