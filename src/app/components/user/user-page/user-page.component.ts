import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {CourseService} from "../../../services/course.service";


export interface GradeAndTask {
  grade: number,
  taskName: string
}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  fname: string;
  lname: string;
  courseGrades: any;
  tablesDataSource: any[];
  displayedColumns: any[];
  gradeAndTaskList: GradeAndTask[] = [];

  constructor(private auth: AuthService, private courseService: CourseService) {
    var token = this.auth.getDecodedToken();
    this.fname = token.firstName;
    this.lname = token.lastName;
  }

  ngOnInit(): void {
    this.courseService.getAllCourseGrades().subscribe(response => {
      this.courseGrades = response;
      this.displayedColumns = []
      this.tablesDataSource = [];
      this.courseGrades.forEach((courseGrade) => {
        for (let i = 0; i < courseGrade.gradeList.length - (courseGrade.gradeList.length - 1) ; i++) {
          let gradeAndTaskName: GradeAndTask = {grade: courseGrade.gradeList[i], taskName: courseGrade.taskNameList[i]}
          this.gradeAndTaskList.push(gradeAndTaskName);
        }
        this.displayedColumns.push(courseGrade.taskNameList);
        this.tablesDataSource.push(this.gradeAndTaskList)
        this.gradeAndTaskList = [];
      })
    });
  }

}
