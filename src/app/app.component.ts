import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  
  public fname: string;
  public lname: string;
  private reloaded: boolean = false;
  
  ngOnInit(): void {

  }
 
  
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
  }

  isLoggedIn(): boolean{
    this.fname = this.authService.getFirstName();
    this.lname = this.authService.getLastName();
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout(){
    console.log("in logout")
    localStorage.removeItem('token')
    localStorage.removeItem('decodedToken')
    this.router.navigate(['/login'])
  }

}
