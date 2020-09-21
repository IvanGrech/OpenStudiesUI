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
    this.courseService.getOwnedCourses(this.authService.getDecodedToken().sub, this.authService.getToken()).subscribe(result => {
      this.courses = result;
    });
  }

  deleteCourse(event: any) {
    var deleting = window.confirm('Do you want to delete this course?');
    if (deleting) {
      var courseId = event.target.value;
      this.courseService.deleteCourse(courseId, this.authService.getToken()).subscribe(result => {
        location.reload();
      });
    }

  }



}
