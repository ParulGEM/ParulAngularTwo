import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  errralert: boolean = false;
  successalert: boolean = false;
  message: string = '';

  constructor() {}
  showAlert(type: string, msg: string) {
    console.log('trigger');
    if (type === 'error') {
      console.log('trigger error');
      this.errralert = true;
    }
    if (type === 'success') {
      console.log('trigger success');
      this.successalert = true;
    }
    this.message = msg;
    setTimeout(() => {
      this.errralert = false;
      this.successalert = false
    }, 5000);
  }
  user: {
    sn: number;
    name: string;
    mail: string;
    mobileNumber: number;
    gender: string;
    category: string;
    profilePicture: string;
    Technology: string;
  }[] = [];
  hello() {
    console.log('hello');
  }
}
