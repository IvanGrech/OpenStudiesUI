import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-course-code-dialog',
  templateUrl: './course-code-dialog.component.html',
  styleUrls: ['./course-code-dialog.component.scss']
})
export class CourseCodeDialogComponent implements OnInit {
  fakeCourseCode: string;
  visibleCourseCode: string;
  course: any;

  constructor(private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public injectedData: any) { }

  ngOnInit() {
    this.fakeCourseCode = "*********";
    this.visibleCourseCode = 'visibility_off';
    this.course = {};
    this.course.courseCode = this.injectedData.courseCode;
  }

  changeCourseCodeVisibility() {
    if(this.visibleCourseCode != 'visibility_off') {
      this.visibleCourseCode = 'visibility_off';
      this.fakeCourseCode = "*********";
    }
    else {
      this.visibleCourseCode = 'visibility'
      this.fakeCourseCode = this.course.courseCode;
    }
  }

}
