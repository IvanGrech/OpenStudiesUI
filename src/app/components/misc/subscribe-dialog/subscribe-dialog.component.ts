import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../services/course.service";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-subscribe-dialog',
  templateUrl: './subscribe-dialog.component.html',
  styleUrls: ['./subscribe-dialog.component.scss']
})
export class SubscribeDialogComponent implements OnInit {

  courseCode: string;

  constructor(private courseService: CourseService, public dialogRef: MatDialogRef<SubscribeDialogComponent>, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.courseService.subscribeCourse(this.courseCode).subscribe((response) => {
      if (this.router.url === '/mycourses') {
        location.reload();
      }
    });
  }


}
