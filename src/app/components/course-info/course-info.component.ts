import {Component, OnInit} from '@angular/core';
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

  private course: any;
  private tasks: any[];

  constructor(private courseDataService: CourseDataService, private courseService: CourseService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.courseDataService.currentCourse.subscribe(currentCourse => {
      this.course = currentCourse[0];
    });

    this.courseService.getCourseTasks(this.course.id).subscribe(response => {
      this.tasks = response;
    });
  }

  addTask() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {width: '20%'})
  }


}
