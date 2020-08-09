import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as properties from '../../properties';
import { CourseData } from '../forms/courseData';

@Injectable()
export class CourseService {
  private apiUrl: string = properties.coursesApiUrl;

  constructor(private http: HttpClient) {
    this.http = http;
  }
  
  createCourse(course: CourseData, token: any) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    return this.http.post<any>(this.apiUrl + '/create', course, { headers })
  }

}