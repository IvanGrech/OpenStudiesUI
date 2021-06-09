import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {CourseService} from "../../../services/course.service";
import {MAT_DIALOG_DATA} from '@angular/material';
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent implements OnInit {

  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;
  files = [];

  private data: any;

  constructor(@Inject(MAT_DIALOG_DATA) public injectedData: any, private courseService: CourseService, private router: Router, public dialogRef: MatDialogRef<CreateTaskDialogComponent>) {
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
    this.courseService.addCourseTask(this.injectedData.courseId, this.data).subscribe(response => {
      let taskId = response;
      if (this.files !== null && this.files[0] !== undefined) {
        this.files.forEach((currentFile) => {
          let formData = new FormData();
          formData.append('file', currentFile.data);
          this.courseService.addCourseTaskFile(this.injectedData.courseId, taskId, formData).subscribe(fileResponse => {
          });
        })
      }
      this.dialogRef.close();
      this.router.navigate(['/home'])
    });
  }

}
