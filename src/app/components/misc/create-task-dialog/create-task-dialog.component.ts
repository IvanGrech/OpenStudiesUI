import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CourseService} from "../../../services/course.service";
import {CourseDataService} from "../../../services/course.data.service";
import {AuthService} from "../../../services/auth.service";


@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent implements OnInit {

  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;
  files = [];

  private data: any;

  constructor(private courseService: CourseService, private courseDataService: CourseDataService, private authService: AuthService) {
  }

  ngOnInit() {
    this.data = {
      tag: "",
      description: ""
    }
  }


  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({data: file, inProgress: false, progress: 0});
      }
    };
    fileUpload.click();
  }

  addTask() {
    var courseId = 0;
    this.courseDataService.currentCourse.subscribe(course => {
      courseId = course[0].id;
    });



    this.courseService.addCourseTask(courseId, this.data, this.authService.getToken()).subscribe(response => {
      let taskId = response;
      if(this.files!== null && this.files[0] !== undefined) {
        this.files.forEach((currentFile)=> {
          let formData = new FormData();
          formData.append('file', currentFile.data);
          this.courseService.addCourseTaskFile(courseId, taskId, formData, this.authService.getToken()).subscribe( fileResponse => {
          });
        })
      }
    });
  }

}
