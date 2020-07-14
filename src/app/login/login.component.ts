import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginDto} from '../forms/loginDto';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  dto = new LoginDto("", "");
  error : boolean;

  constructor(private service: AuthService,  private router: Router) {

   }

  ngOnInit() {
    this.error=false;
  }

  doLogin(){
    this.service.login(this.dto)
    .pipe(first())
    .subscribe(
      data => {
        if(this.service.isAdmin()){
          this.router.navigate(['/admin']);
        }else{
        this.router.navigate(['/home']);
        }
      },
      error => {
        this.error=true;
      }
    )
  }


  

}
