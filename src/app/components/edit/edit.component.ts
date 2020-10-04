import {Component, OnInit, Input} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Role} from '../../models/role';
import {AddDto} from '../../forms/addDto';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public user: any;
  private dto = new AddDto(0, "", "", "", "", "", "", "", new Role("user", 2));
  public errors = new Map<string, string>();


  constructor(private userService: UserService, private auth: AuthService, private router: Router) {
  }

  parseDate(date: Date) {
    var mm = date.getMonth() + 1;
    var dd = date.getDate();

    return [date.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd
    ].join('-');
  }


  ngOnInit() {
    this.userService.currentUser.subscribe(user => {
      this.dto.login = user.login;
      this.dto.birthday = this.parseDate(new Date(user.birthday));
      this.dto.email = user.email;
      this.dto.firstName = user.firstName;
      this.dto.lastName = user.lastName;
      this.dto.role.id = user.role.id;
      this.dto.role.name = user.role.name;
      this.dto.id = user.id;
    });

  }


  doEdit() {
    if (this.dto.role.name === "user") {
      this.dto.role.id = 2;
    }
    if (this.dto.role.name === "admin") {
      this.dto.role.id = 1;
    }
    this.userService.updateUser(this.dto).subscribe(response => {
      this.router.navigate(['admin']);
    }, error => {
      this.errors = error.error;
    });
  }

  validatePassword() {
    this.auth.validatePassword();
  }
}
