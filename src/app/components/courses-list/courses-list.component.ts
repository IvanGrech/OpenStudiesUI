import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from "@angular/router";
import {CourseDataService} from "../../services/course.data.service";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  public courses: any = [];
  showSpinner: boolean = true;

  constructor(private courseService: CourseService, private authService: AuthService, private router: Router, private courseDataService: CourseDataService) { }

  ngOnInit() {
    this.courseService.getOwnedCourses().subscribe(result => {
      this.courses = result;
      this.showSpinner = false;
    });
  }

  deleteCourse(event: any) {
    var deleting = window.confirm('Do you want to delete this course?');
    if (deleting) {
      var courseId = event.target.value;
      this.courseService.deleteCourse(courseId).subscribe(result => {
        location.reload();
      });
    }
  }
  viewCourse(course: any) {
    this.courseDataService.changeMessage(course);
    this.router.navigate(['course'])
  }




}