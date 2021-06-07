import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../services/course.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {AddTaskAnswerDialogComponent} from "../misc/add-task-answer-dialog/add-task-answer-dialog.component";

@Component({
  selector: 'app-subscribed-course',
  templateUrl: './subscribed-course.component.html',
  styleUrls: ['./subscribed-course.component.scss']
})
export class SubscribedCourseComponent implements OnInit {

  private course: any;
  private tasks: any[];
  private courseGrades: any;

  constructor(private courseService: CourseService, public dialog: MatDialog, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.course = {};
    this.course.tag = this.route.snapshot.paramMap.get('tag');
    this.course.description = this.route.snapshot.paramMap.get('description');
    this.course.id = this.route.snapshot.paramMap.get('courseId');

    this.courseService.getCourseTasks(this.course.id).subscribe(response => {
      this.tasks = response;
    });

    this.courseService.getCourseGradesForCurrentUser(this.course.id).subscribe(response => {
      this.courseGrades = response;
    });
  }

  addTaskAnswer(taskId: number) {
    console.log(this.course.id)
    const dialogRef = this.dialog.open(AddTaskAnswerDialogComponent, {
      width: '20%', data: {courseId: this.course.id, taskId: taskId}
    })
  }

  downloadTaskFile(taskId: number, fileName: string) {

    if (document.getElementById("downloadLink"))
      document.getElementById("downloadLink").remove();

    var a = document.createElement("a");
    a.id = "downloadLink";
    document.body.appendChild(a);
    a.style.display = "none";

    this.courseService.getTaskFile(taskId, fileName).subscribe(response => {
      var blob = new Blob([response], {type: 'application/octet-stream'}),
        url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    })
  }

  downloadTaskAnswerFile(taskId: number, fileName: string) {

    if (document.getElementById("downloadLink"))
      document.getElementById("downloadLink").remove();

    var a = document.createElement("a");
    a.id = "downloadLink";
    document.body.appendChild(a);
    a.style.display = "none";

    this.courseService.getTaskFileForSubscribedUser(taskId, fileName).subscribe(response => {
      var blob = new Blob([response], {type: 'application/octet-stream'}),
        url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    })
  }

}
