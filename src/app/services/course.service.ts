import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import * as properties from '../../properties';
import {CourseData} from '../models/courseData';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable()
export class CourseService {
  private apiUrl: string = properties.coursesApiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  createCourse(course: CourseData) {
    return this.http.post<any>(`${this.apiUrl}`, course, {headers: this.authService.getAuthHeaders()});
  }

  deleteCourse(id: Number) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {headers: this.authService.getAuthHeaders()});
  }

  getOwnedCourses() {
    return this.http.get<any>(`${this.apiUrl}/owner/${this.authService.getDecodedToken().sub}`, {headers: this.authService.getAuthHeaders()});
  }

  getSubscribedCourses() {
    return this.http.get<any>(`${this.apiUrl}/subscribed`, {headers: this.authService.getAuthHeaders()});
  }

  addCourseTask(id: number, task: any) {
    return this.http.post<any>(`${this.apiUrl}/${id}/tasks`, task, {headers: this.authService.getAuthHeaders()});
  }

  addCourseTaskFile(id: number, taskId: number, file: FormData) {
    return this.http.post<any>(`${this.apiUrl}/${id}/tasks/${taskId}/file`, file, {headers: this.authService.getAuthHeaders()});
  }

  addTaskAnswerFile(taskId: number, file: FormData) {
    return this.http.post<any>(`${this.apiUrl}/saveAnswerFiles/tasks/${taskId}/file`, file, {headers: this.authService.getAuthHeaders()});
  }

  getCourseTasks(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}/tasks`, {headers: this.authService.getAuthHeaders()});
  }

  getTaskFile(taskId: number, fileName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/task/${taskId}/file/${fileName}/`, {
      headers: this.authService.getAuthHeaders(),
      responseType: 'blob'
    });
  }

  getTaskFileForSubscribedUser(taskId: number, fileName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/task/${taskId}/file/${fileName}/subscribed`, {
      headers: this.authService.getAuthHeaders(),
      responseType: 'blob'
    });
  }

  getTaskFileForSubscribedUserAsOwner(taskId: number, fileName: string, userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/task/${taskId}/file/${fileName}/subscribed/user/${userId}`, {
      headers: this.authService.getAuthHeaders(),
      responseType: 'blob'
    });
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/task/${taskId}/`, {headers: this.authService.getAuthHeaders()});
  }

  subscribeCourse(courseCode: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/subscribe/${courseCode}`, null, {headers: this.authService.getAuthHeaders()});
  }

  getUsersWorksForTask(courseId: number, taskId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}/task/${taskId}/works`, {headers: this.authService.getAuthHeaders()});
  }

  saveGradeForUser(taskId: number, userId: number, grade: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/task/${taskId}/user/${userId}/grade`, {grade}, {headers: this.authService.getAuthHeaders()});
  }

  getAllCourseGrades(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/grades`, {headers: this.authService.getAuthHeaders()});
  }

}
