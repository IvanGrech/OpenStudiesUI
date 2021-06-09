import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {CourseData} from 'src/app/models/courseData';
import {CourseService} from 'src/app/services/course.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-course-dialog',
  templateUrl: './create-course-dialog.component.html',
  styleUrls: ['./create-course-dialog.component.scss']
})
export class CreateCourseDialogComponent {

  data = new CourseData("", "");

  constructor(private courseService: CourseService,
              public dialogRef: MatDialogRef<CreateCourseDialogComponent>, private router: Router) {
  }

  onCreateClick(): void {
    this.courseService.createCourse(this.data).subscribe(
      response => {
        if (this.router.url === '/mycourses') {
          this.router.navigate(['/home']);
        }
      },
      error => {
      }
    )
    this.dialogRef.close();
  }
}


