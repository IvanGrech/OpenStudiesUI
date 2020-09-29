import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { CourseData } from '../models/courseData';


@Injectable()
export class CourseDataService {

  private courseSource = new BehaviorSubject<any>({});
  currentCourse = this.courseSource.asObservable();

  constructor() {
  }

  changeMessage(object: CourseData) {
    this.courseSource.next(object);
  }

}
