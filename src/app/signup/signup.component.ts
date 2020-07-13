import { Component, OnInit } from '@angular/core';
import { SignUpDto } from '../forms/signUpDto';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  private dto = new SignUpDto(0,"","","","","","","","");
  public errors = new Map<string, string>();
  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  doSignUp() {

    this.userService.signupUser(this.dto).subscribe(data=> {
        this.router.navigate(['/login']);
    }, error => {
      this.errors = error.error;
      grecaptcha.reset();
    })

  }

  validatePassword() {
    this.authService.validatePassword();
  }

}
