import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddDto } from '../forms/addDto';
import {BehaviorSubject} from 'rxjs';
import { User } from '../models/user';
import { Role } from '../models/role';
import { SignUpDto } from '../forms/signUpDto';

import * as properties from '../../properties';


@Injectable()
export class UserService {
  private apiUrl: string = properties.mainUrl;
  private userSource = new BehaviorSubject<User>(new User(0, new Role("user",2),"","","","","",""));
  currentUser = this.userSource.asObservable();

  setCurrentUser(user: User){
    this.userSource.next(user);
  }

  constructor(private http: HttpClient) {
    this.http = http;
  }

  getAllUsers(token: any): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    return this.http.get(this.apiUrl + 'users', { headers });
  }

  getUserById(id: number, token: any) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    return this.http.get(this.apiUrl + 'users/id/' + id, { headers });
  }

  updateUser(dto: AddDto, token: any){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    return this.http.post<any>(this.apiUrl + 'users/update', dto, { headers })
  }


  addUser(dto: AddDto, token: any) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    return this.http.post<any>(this.apiUrl + 'users/create', dto, { headers })
  }

  signupUser(dto: SignUpDto) {
    return this.http.post<any>(this.apiUrl + 'signup', dto)
  }

  
  deleteUser(id: number, token: any) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    return this.http.get((this.apiUrl + 'users/delete/id/' + id), { headers })
  }

  deleteUserByLogin(login: string, token: any): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    return this.http.get((this.apiUrl + 'users/delete/login/' + login), { headers })
  }
}

