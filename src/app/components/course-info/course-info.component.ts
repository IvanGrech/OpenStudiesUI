import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../services/course.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateTaskDialogComponent} from "../misc/create-task-dialog/create-task-dialog.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {

  private course: any;
  private tasks: any[];

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
  }

  addTask() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '20%', data: {courseId: this.course.id}
    })
  }

  deleteTask(taskId: number) {
    this.courseService.deleteTask(taskId).subscribe((result) => {

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


}
