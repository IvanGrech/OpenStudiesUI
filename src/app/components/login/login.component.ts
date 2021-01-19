import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {LoginDto} from '../../forms/loginDto'
import {first} from 'rxjs/operators';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() error: string | null;




  form: FormGroup = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {

  }

  doLogin() {
    let dto = new LoginDto(this.form.get('login').value, this.form.get('password').value);
    this.authService.login(dto)
      .pipe(first())
      .subscribe(
        data => {
          if (this.authService.isAdmin()) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error => {
          this.error = 'Username or password is invalid';
        }
      )
  }


}
