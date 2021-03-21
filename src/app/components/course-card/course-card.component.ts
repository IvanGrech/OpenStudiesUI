import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;

  constructor() { }

  ngOnInit() {
  }

}
