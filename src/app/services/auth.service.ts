import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Router} from '@angular/router';
import {LoginDto} from '../forms/loginDto';
import {delay, map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

import * as properties from '../../properties';
import {Subscription, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = properties.loginUrl;
  tokenSubscription = new Subscription();
  timeout;

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {
  }

  public login(dto: LoginDto) {
    return this.http.post<any>(this.apiUrl, dto,)
      .pipe(map(tokenDto => {
        let decodedToken = this.jwtHelper.decodeToken(tokenDto.token);
        this.timeout = this.jwtHelper.getTokenExpirationDate(tokenDto.token).valueOf() - new Date().valueOf();
        localStorage.setItem('decodedToken', JSON.stringify(decodedToken))
        localStorage.setItem('token', tokenDto.token)
        this.expirationCounter(this.timeout);
      }));
  }

  public logout() {
    this.tokenSubscription.unsubscribe();
    localStorage.removeItem('token')
    localStorage.removeItem('decodedToken')
    this.router.navigate(['/login'])
  }

  public expirationCounter(timeout) {
    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null).pipe(delay(timeout)).subscribe((expired) => {
      this.logout();
    });
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  isAdmin(): boolean {

    if (this.getDecodedToken().role === 'admin') {
      return true;
    }
    return false;
  }

  getRole(): string {
    return this.getDecodedToken().role;
  }

  public getToken() {
    return localStorage.getItem('token')
  }

  public getDecodedToken() {
    return JSON.parse(localStorage.getItem('decodedToken'))
  }

  public getFirstName(): string {
    if (this.getDecodedToken() != null)
      return this.getDecodedToken().firstName;
    else return "";
  }

  public getLastName(): string {
    if (this.getDecodedToken() != null)
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

  public getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({Authorization: 'Bearer ' + this.getToken()});
  }
}
