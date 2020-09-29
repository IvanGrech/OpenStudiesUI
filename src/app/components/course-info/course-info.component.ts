import {Component, OnInit} from '@angular/core';
import {CourseData} from "../../models/courseData";
import {CourseDataService} from "../../services/course.data.service";
import {CourseService} from "../../services/course.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateTaskDialogComponent} from "../misc/create-task-dialog/create-task-dialog.component";

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {

  private course: CourseData;

  constructor(private courseDataService: CourseDataService, private courseService: CourseService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.courseDataService.currentCourse.subscribe(currentCourse => {
      this.course = currentCourse[0];
    });
  }

  addTask() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {width: '20%'})
  }


}
