import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserdataService } from 'src/app/services/userdata.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements AfterViewInit {
  // technologies: string[] = ['C', 'C++', 'Java', 'Python', 'JavaScript'];
  // formData: any; // Property to store form data
  // selectedOrderIds:any=[];
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  @ViewChild('closeModalbtn') closeModalbtn!: ElementRef;
  @ViewChild('previewbtn') previewbtn!: ElementRef;
  userServiceData: any;

  constructor(
    private userdata: UserdataService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
  ) {
    this.userServiceData = userdata;
    // this.registerForm = this.fb.group({
    //   checkArray: this.fb.array([]),
    // });

    this.spinner.show();
  }
  // ngOnInit(): void {
  //   this.technologies.forEach(() => (this.registerForm.get('technology') as FormArray).push(new FormControl(false)));
  // }
  // getControls(){

  //   return (this.registerForm.get('technology') as FormArray).controls
  // }

  registerForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
      Validators.maxLength(30),
      Validators.minLength(2),
    ]),
    gender: new FormControl(null, Validators.required),

    mail: new FormControl(null, [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    mobileNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[6-9]\\d{9}$'),
    ]),
    category: new FormControl(null, Validators.required),
    technologies:new FormArray([]),
    // technology: this.formBuilder.array([]),
    // tech: new FormGroup({
    //   c: new FormControl(false),
    //   cpp: new FormControl(false),
    //   java: new FormControl(false),
    //   python: new FormControl(false),
    //   javascript: new FormControl(false)
    // }),
    //tech: new FormGroup({}),
    //FormControl(null,Validators.required),
    // techC: new FormControl(false),
    // techCpp: new FormControl(false),
    // techJava: new FormControl(false),
    // techPython: new FormControl(false),
    //techJavascript: new FormControl(false),
    profilePicture: new FormControl('', Validators.required)
  });

  fileName: string = '';
  imageBase64: string | null = null;
  onFileSelected(event: any) {
    const allowedExtensions = ['jpeg', 'jpg', 'png'];
    const fileName = event.target.files[0].name;
    this.fileName = fileName;
    const fileExtension = fileName.split('.').pop().toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
      const file = event.target.files[0];
      console.log(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        this.imageBase64 = reader.result as string;
      };

      reader.readAsDataURL(file);
    } else {
      this.userServiceData.showAlert('error', 'ERROR : Invalid Image Type');
    }
  }

  get name() {
    return this.registerForm.get('name');
  }
  get mail() {
    return this.registerForm.get('mail');
  }
  get mobileNumber() {
    return this.registerForm.get('mobileNumber');
  }
  get gender() {
    return this.registerForm.get('gender');
  }
  get category() {
    return this.registerForm.get('category');
  }
  get technologiesForm() {
    return this.registerForm.get('technologies') as FormArray;
  }
  onTechChange(event: Event, technology: string) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.technologiesForm.push(new FormControl(technology));
    } else {
      const index = this.technologiesForm.controls.findIndex(
        (control) => control.value === technology
      );
      this.technologiesForm.removeAt(index);
    }
  }

  // get techC() {
  //   return this.registerForm.get('techC');
  // }
  // get techCpp() {
  //   return this.registerForm.get('techCpp');
  // }
  // get techJava() {
  //   return this.registerForm.get('techJava');
  // }
  // get techPython() {
  //   return this.registerForm.get('techPython');
  // }
  // get techJavascript() {
  //   return this.registerForm.get('techJavascript');
  // }
  get profilePicture() {
    return this.registerForm.get('profilePicture');
  }
  preview(event: any) {
    // this.userServiceData.showAlert('error', 'ERROR : Invalid Form');
    // const Technology: string = `${this.techCpp?.value ? 'C++' : ''} ${
    //   this.techC?.value ? 'C' : ''
    // } ${this.techJava?.value ? 'Java' : ''}
    // ${this.techPython?.value ? 'Python' : ''} ${
    //   this.techJavascript?.value ? 'Javascript' : ''
    // }`;
    // console.log(Technology, '++');
    // if (!(!this.techC?.value || !this.techCpp?.value || !this.techJava?.value || !this.techJavascript?.value || !this.techPython?.value)) {console.log(Technology, '--');
    //   this.userServiceData.showAlert('error', 'ERROR :  Technology is Invalid');
    //   return;
    // }
    // this.selectedOrderIds = this.registerForm.value.technology
    // .map((checked: any, i: any) => checked ? this.technologies[i] : null)
    // .filter((v:string) => v !== null);
    if (this.registerForm.invalid) {
      if (this.name?.invalid) {
        this.userServiceData.showAlert('error', 'ERROR :  Name is Invalid');
        return;
      }
      if (this.gender?.invalid) {
        this.userServiceData.showAlert('error', 'ERROR :  Gender is Invalid');
        return;
      }
      if (this.mail?.invalid) {
        this.userServiceData.showAlert('error', 'ERROR :  Mail is Invalid');
        return;
      }
      if (this.mobileNumber?.invalid) {
        this.userServiceData.showAlert(
          'error',
          'ERROR :  Mobile number is Invalid'
        );
        return;
      }
      if (this.category?.invalid) {
        this.userServiceData.showAlert('error', 'ERROR :  Category is Invalid');
        return;
      }
      if (this.profilePicture?.invalid) {
        this.userServiceData.showAlert(
          'error',
          'ERROR :  Profile picture is Invalid'
        );
        return;
      }
      // if (
      //   !(
      //     !this.techC?.value ||
      //     !this.techCpp?.value ||
      //     !this.techJava?.value ||
      //     !this.techJavascript?.value ||
      //     !this.techPython?.value
      //   )
      // ) {
      //   this.userServiceData.showAlert(
      //     'error',
      //     'ERROR :  Technology is Invalid'
      //   );
      //   return;
      // }
      if (this.technologiesForm?.invalid) {
        this.userServiceData.showAlert(
          'error',
          'ERROR :  Technology is Invalid'
        );
        return;
      }
    } else {
      this.previewbtn.nativeElement.click();
    }
  }


  onSubmit() {
    console.log(this.technologiesForm);
    if (this.registerForm.invalid) {
      this.userServiceData.showAlert('error', 'ERROR : Invalid Form');

      this.closeModalbtn.nativeElement.click();

      return;
    } else {
      if (this.imageBase64) {
        this.userServiceData.user.push({
          sn: this.userServiceData.user.length + 1,
          name: this.name?.value,
          mail: this.mail?.value,
          mobileNumber: this.mobileNumber?.value,
          gender: this.gender?.value,
          category: this.category?.value,
          //     Technology: `${this.techCpp?.value ? 'C++' : ''} ${
          //       this.techC?.value ? 'C' : ''
          //     } ${this.techJava?.value ? 'Java' : ''}
          // ${this.techPython?.value ? 'Python' : ''} ${
          //       this.techJavascript?.value ? 'Javascript' : ''
          //     }`,
         technology: this.technologiesForm.value,
          profilePicture: this.imageBase64,
        });

        this.closeModalbtn.nativeElement.click();
        this.userServiceData.showAlert('success', 'User Created !! ');
      } else {
        this.userServiceData.showAlert('error', 'ERROR : Add image');
      }
    }
  }
}
