import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CourseData } from 'src/app/forms/courseData';
import { CourseService } from 'src/app/services/course.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-course-dialog',
  templateUrl: './create-course-dialog.component.html',
  styleUrls: ['./create-course-dialog.component.scss']
})
export class CreateCourseDialogComponent {

  data = new CourseData("", "");

  constructor(private courseService: CourseService, private authService: AuthService,
    public dialogRef: MatDialogRef<CreateCourseDialogComponent>) { }

  onCreateClick(): void {
    this.courseService.createCourse(this.data, this.authService.getToken()).subscribe(
      response => {
      },
      error => {
      }
    )
    this.dialogRef.close();
  }
}


