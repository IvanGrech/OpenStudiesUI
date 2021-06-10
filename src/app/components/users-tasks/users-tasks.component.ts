import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../../services/course.service";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, Validators} from "@angular/forms";


export interface User {
  id: number,
  firstName: string,
  lastName: string,
  grade: number,
  fileNames: string[]
}

@Component({
  selector: 'app-users-tasks',
  templateUrl: './users-tasks.component.html',
  styleUrls: ['./users-tasks.component.scss']
})
export class UsersTasksComponent implements OnInit {

  taskId: any;
  courseId: any;
  private tableDataSource;
  displayedColumns: string[] = ['firstName', 'lastName', 'grade', 'fileNames'];
  private users: User[] = [];
  private usersAndTasks: any[];
  maxGrade: number = 100;
  minGrade: number = 0;

  submitGradeFormControl = new FormControl('', [
    Validators.required,
    Validators.max(this.maxGrade),
    Validators.min(this.minGrade),
    Validators.pattern("^[0-9]*$")
  ]);

  constructor(private route: ActivatedRoute, private courseService: CourseService) {
  }

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('taskId');
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.courseService.getUsersWorksForTask(this.courseId, this.taskId).subscribe((response) => {
      this.usersAndTasks = response;
      this.usersAndTasks.forEach((userAndTasks) => {
        let user: User = {fileNames: [], id: 0, firstName: "", lastName: "", grade: 0};
        user.firstName = userAndTasks.user.firstName;
        user.lastName = userAndTasks.user.lastName;
        user.fileNames = userAndTasks.fileNames;
        user.id = userAndTasks.user.id;
        user.grade = userAndTasks.grade;
        this.users.push(user);
      })
      this.tableDataSource = new MatTableDataSource(this.users);
    })
  }

  downloadTaskAnswerFile(fileName: string, userId: number) {
    if (document.getElementById("downloadLink"))
      document.getElementById("downloadLink").remove();

    var a = document.createElement("a");
    a.id = "downloadLink";
    document.body.appendChild(a);
    a.style.display = "none";
    console.log(fileName);
    this.courseService.getTaskFileForSubscribedUserAsOwner(this.taskId, fileName, userId).subscribe(response => {
      var blob = new Blob([response], {type: 'application/octet-stream'}),
        url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    })
  }

  submitGrade(userId: number, grade: string) {
    if (this.submitGradeFormControl.errors == null) {
      this.courseService.saveGradeForUser(this.taskId, userId, Number(grade)).subscribe(response => {

      });
    }
  }


}
