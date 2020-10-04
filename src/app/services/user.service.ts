import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {AddDto} from '../forms/addDto';
import {SignUpDto} from '../forms/signUpDto';

import * as properties from '../../properties';
import {AuthService} from "./auth.service";
import {User} from "../models/user";
import {Role} from "../models/role";


@Injectable()
export class UserService {
  private apiUrl: string = properties.mainUrl;

  private userSource = new BehaviorSubject<User>(new User(0, new Role("user", 2), "", "", "", "", "", ""));
  currentUser = this.userSource.asObservable();

  setCurrentUser(user: User) {
    this.userSource.next(user);
  }

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}users`, {headers: this.authService.getAuthHeaders()});
  }

  getUserById(id: number) {
    return this.http.get(`${this.apiUrl}users/${id}`, {headers: this.authService.getAuthHeaders()});
  }

  updateUser(dto: AddDto) {
    return this.http.put<any>(`${this.apiUrl}users`, dto, {headers: this.authService.getAuthHeaders()});
  }

  addUser(dto: AddDto) {
    return this.http.post<any>(`${this.apiUrl}users`, dto, {headers: this.authService.getAuthHeaders()});
  }

  signupUser(dto: SignUpDto) {
    return this.http.post<any>(`${this.apiUrl}signup`, dto);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}users/${id}`, {headers: this.authService.getAuthHeaders()});
  }
}

