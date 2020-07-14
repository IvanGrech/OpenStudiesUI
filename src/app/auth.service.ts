import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { LoginDto} from '../app/forms/loginDto';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import * as properties from '../properties';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = properties.loginUrl;

  constructor(private http: HttpClient, private router: Router) { }

  public login(dto : LoginDto){
    return this.http.post<any>(this.apiUrl, dto,)
    .pipe(map(tokenDto=>{
      let decodedToken = new JwtHelperService().decodeToken(tokenDto.token);
      localStorage.setItem('decodedToken', JSON.stringify(decodedToken))
      localStorage.setItem('token', tokenDto.token)
    }));
  }

  public logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('decodedToken')
    this.router.navigate(['/login'])
  }

  isLoggedIn(): boolean{
    if(localStorage.getItem('token')){
      return true;
    }
    return false;
  }

  isAdmin(): boolean {

    if(this.getDecodedToken().role==='admin'){
      return true;
    }
    return false;
  }

  getRole(): string {
    return this.getDecodedToken().role;
  }

  public getToken(){
    return localStorage.getItem('token')
  }

  public getDecodedToken() {
    return JSON.parse(localStorage.getItem('decodedToken'))
  }

  public getFirstName(): string{
    if(this.getDecodedToken()!=null)
    return this.getDecodedToken().firstName;
    else return "";
  }

  public getLastName(): string{
    if(this.getDecodedToken()!=null)
    return this.getDecodedToken().lastName;
    else return "";
  }
  validatePassword() {
    var passwordId = <HTMLInputElement>document.getElementById("passwordId");
    var passwordAgainId = <HTMLInputElement>document.getElementById("passwordAgainId");
    if (passwordId.value != passwordAgainId.value) {
      passwordAgainId.setCustomValidity("Passwords Don't Match");
    } else {
      passwordAgainId.setCustomValidity('');
    }
  }
}
