import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {CourseData} from 'src/app/models/courseData';
import {CourseService} from 'src/app/services/course.service';
import {Router} from '@angular/router';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-course-dialog',
  templateUrl: './create-course-dialog.component.html',
  styleUrls: ['./create-course-dialog.component.scss']
})
export class CreateCourseDialogComponent {

  data = new CourseData("", "");
  maxLength: number = 16;
  minLength: number = 3;


  createCourseFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(this.maxLength),
    Validators.minLength(this.minLength)
  ]);

  constructor(private courseService: CourseService,
              public dialogRef: MatDialogRef<CreateCourseDialogComponent>, private router: Router) {
  }

  onCreateClick(): void {
    if (this.createCourseFormControl.errors == null) {
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
}


