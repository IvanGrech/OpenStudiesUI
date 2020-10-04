import { Component, OnInit } from '@angular/core';
import { AddDto } from '../../forms/addDto';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/role';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  dto = new AddDto(0, "", "", "", "", "", "", "", new Role("user", 2));
  public errors = new Map<string, string>();
  constructor(private userService: UserService, private router: Router, private authService: AuthService) {

  }

  validatePassword() {
    this.authService.validatePassword();
  }

  ngOnInit() {

  }

  doAdd() {
    if (this.dto.role.name === "user") {
      this.dto.role.id = 2;
    }
    if (this.dto.role.name === "admin") {
      this.dto.role.id = 1;
    }
    this.userService.addUser(this.dto)
      .subscribe(
        response => {
          this.router.navigate(['admin']);
        },
        error => {
          this.errors = error.error;
        }
      )

  }


}
