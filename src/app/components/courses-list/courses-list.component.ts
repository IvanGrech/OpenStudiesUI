import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  public courses: any = [];

  constructor(private courseService: CourseService, private authService: AuthService) { }

  ngOnInit() {
    this.courseService.getOwnedCourses(this.authService.getDecodedToken().sub, this.authService.getToken()).subscribe(result=>{
      this.courses = result;
    });
  }



}
