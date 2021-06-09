import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {CourseService} from "../../../services/course.service";
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-task-answer-dialog',
  templateUrl: './add-task-answer-dialog.component.html',
  styleUrls: ['./add-task-answer-dialog.component.scss']
})
export class AddTaskAnswerDialogComponent implements OnInit {

  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;
  files = [];

  private data: any;

  constructor(@Inject(MAT_DIALOG_DATA) public injectedData: any, private courseService: CourseService, public dialogRef: MatDialogRef<AddTaskAnswerDialogComponent>, public router: Router) {
  }

  ngOnInit() {
    this.data = {

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

  uploadTaskAnswer() {
    let taskId = this.injectedData.taskId;
    console.log(taskId);
    if (this.files !== null && this.files[0] !== undefined) {
      this.files.forEach((currentFile) => {
        let formData = new FormData();
        formData.append('file', currentFile.data);
        this.courseService.addTaskAnswerFile(taskId, formData).subscribe(fileResponse => {
        });
      })
    }
    this.dialogRef.close();
    this.router.navigate(['/home']);
    //this.closeDialog();
    //window.location.reload();

  }

}
