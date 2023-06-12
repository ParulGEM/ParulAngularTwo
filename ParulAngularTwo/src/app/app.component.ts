import { Component,AfterViewInit } from '@angular/core';
import { UserdataService } from './services/userdata.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


userServiceData :any;
  constructor(private userData : UserdataService){


    this.userServiceData =userData;
  }
  title = 'ParulAngularTwo';
}
