import { Component } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent  {

  fname: string;
  lname: string;

  constructor(private auth: AuthService){
    var token = this.auth.getDecodedToken();
    this.fname =  token.firstName;
    this.lname = token.lastName;
  }

}
