import { Component, AfterViewInit } from '@angular/core';
import { UserdataService } from 'src/app/services/userdata.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }


  userServiceData: {
    sn: number;
    name: string;
    mail: string;
    mobileNumber: number;
    gender: string;
    category: string;
    profilePicture: string;
    Technology: string;
  }[] = [];
  constructor(
    private userdata: UserdataService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    this.userServiceData = userdata.user;
    
  }
}
