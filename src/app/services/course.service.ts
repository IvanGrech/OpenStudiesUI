import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import * as properties from '../../properties';
import {CourseData} from '../models/courseData';

@Injectable()
export class CourseService {
  private apiUrl: string = properties.coursesApiUrl;

  constructor(private http: HttpClient) {
    this.http = http;
  }

  createCourse(course: CourseData, token: any) {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + token});
    return this.http.post<any>(this.apiUrl + '/create', course, {headers});
  }


  deleteCourse(id: Number, token: any) {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + token});
    return this.http.delete<any>(this.apiUrl + '/' + id, {headers});
  }

  getOwnedCourses(login: String, token: any) {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + token});
    return this.http.get<any>(this.apiUrl + '/owner/' + login, {headers});
  }

  addCourseTask(id: number, task: any, token: any) {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + token});
    return this.http.post<any>(this.apiUrl + '/' + id + '/tasks', task, {headers});
  }

  addCourseTaskFile(id: number, taskId: number, file: FormData, token: any) {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + token});
    return this.http.post<any>(`${this.apiUrl}/${id}/tasks/${taskId}/file`, file, {headers});
  }

  getCourseTasks(id: number, token: any) {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + token});
    return this.http.get<any>(this.apiUrl + '/' + id + '/tasks', {headers});
  }

}
