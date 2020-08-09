import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  public users: any = [];
  
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
   
  }

  ngOnInit() {
    this.userService.getAllUsers(this.authService.getToken()).subscribe(users =>
      this.users = users
    );
  }

  deleteUser(event: any): void {
    const inputId = event.target.value;
    var res = confirm('Are you sure?');
    if (res) {
      this.userService.deleteUser(inputId, this.authService.getToken()).subscribe(response => {
        this.ngOnInit();
      });        
    } 
  }


  goToEditUser(event: any): void{
    const inputId = event.target.value;
    var foundUser;
    this.userService.getUserById(inputId, this.authService.getToken()).subscribe(user=>{
      foundUser = user;
     this.userService.setCurrentUser(foundUser);
    })
    this.router.navigate(['/admin/edit']);
  }


}
