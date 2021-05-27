import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../../services/course.service";

@Component({
  selector: 'app-users-tasks',
  templateUrl: './users-tasks.component.html',
  styleUrls: ['./users-tasks.component.scss']
})
export class UsersTasksComponent implements OnInit {

  taskId: any;
  courseId: any;
  private usersAndTasks: any[];

  constructor(private route: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('taskId');
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.courseService.getUsersWorksForTask(this.courseId, this.taskId).subscribe((response)=> {
      this.usersAndTasks = response;
    })
  }



}
