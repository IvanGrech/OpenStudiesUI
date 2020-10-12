import {Component, ElementRef, OnInit} from '@angular/core';
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

  downloadTaskFile(taskId: number, fileName: string) {

    if(document.getElementById("downloadLink"))
      document.getElementById("downloadLink").remove();

      var a = document.createElement("a");
      a.id = "downloadLink";
      document.body.appendChild(a);
      a.style.display = "none";

    this.courseService.getTaskFile(taskId, fileName).subscribe(response => {
      var blob = new Blob([response], { type: 'application/octet-stream' }),
        url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    })
  }


}
