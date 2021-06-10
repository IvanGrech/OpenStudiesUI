import {Component, OnInit} from '@angular/core';
import {CourseService} from 'src/app/services/course.service';
import {AuthService} from 'src/app/services/auth.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  public courses: any = [];
  public subscribedCourses: any = [];
  showSpinner: boolean = true;
  public title: string = "Title ***";
  public description: string = "Description ***";

  constructor(private courseService: CourseService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.courseService.getOwnedCourses().subscribe(result => {
      this.courses = result;
      this.showSpinner = false;
    });
    this.courseService.getSubscribedCourses().subscribe(result => {
      this.subscribedCourses = result;
      this.showSpinner = false;
    })
  }


  viewCourse(course: any, owner: boolean) {
    if (owner)
      this.router.navigate(['course', {tag: course.tag, description: course.description, courseId: course.id, courseCode: course.courseCode}])
    else this.router.navigate(['subscribed-course', {tag: course.tag, description: course.description, courseId: course.id}])
  }


}
