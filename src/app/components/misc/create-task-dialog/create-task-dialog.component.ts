import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../services/course.service";
import {CourseDataService} from "../../../services/course.data.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent implements OnInit {


  private data: any;

  constructor(private courseService: CourseService, private courseDataService: CourseDataService, private authService: AuthService) {
  }

  ngOnInit() {
    this.data = {
      tag: "",
      description: ""
    }
  }

  addTask() {
    var courseId = 0;
    this.courseDataService.currentCourse.subscribe(course => {
      console.log(course)
      courseId = course[0].id ;
    });
    console.log(courseId)
    this.courseService.addCourseTask(courseId, this.data, this.authService.getToken()).subscribe(response => {
        location.reload();
    });
  }

}
