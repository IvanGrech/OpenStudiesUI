import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import * as properties from '../../properties';
import {CourseData} from '../models/courseData';
import {AuthService} from "./auth.service";

@Injectable()
export class CourseService {
  private apiUrl: string = properties.coursesApiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  createCourse(course: CourseData) {
    return this.http.post<any>(`${this.apiUrl}/create`, course, {headers: this.authService.getAuthHeaders()});
  }

  deleteCourse(id: Number) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {headers: this.authService.getAuthHeaders()});
  }

  getOwnedCourses() {
    return this.http.get<any>(`${this.apiUrl}/owner/${this.authService.getDecodedToken().sub}`, {headers: this.authService.getAuthHeaders()});
  }

  addCourseTask(id: number, task: any) {
    return this.http.post<any>(`${this.apiUrl}/${id}/tasks`, task, {headers: this.authService.getAuthHeaders()});
  }

  addCourseTaskFile(id: number, taskId: number, file: FormData) {
    return this.http.post<any>(`${this.apiUrl}/${id}/tasks/${taskId}/file`, file, {headers: this.authService.getAuthHeaders()});
  }

  getCourseTasks(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}/tasks`, {headers: this.authService.getAuthHeaders()});
  }

}
