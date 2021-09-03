import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup,  Validators} from "@angular/forms";

interface SelectView {
  value: string;
  viewValue: string;
}

enum FrameWorksEnum {
  angular = 'angular',
  react = 'react',
  vue = 'vue'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selectedLibrary: string | undefined;
  versionsForSelect: string[] | undefined;
  isEmailError: boolean | undefined;

  libraries: SelectView[] = [
    {value: 'angular', viewValue: 'Angular'},
    {value: 'react', viewValue: 'React'},
    {value: 'vue', viewValue: 'Vue'}
  ];

  hobbies: SelectView[] = [
    {value: 'basketball', viewValue: 'Basketball'},
    {value: 'react', viewValue: 'React'},
    {value: 'run', viewValue: 'run'}
  ];

  frameworkVersions =  {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  }

  // @ts-ignore
  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    libraries: new FormControl('', Validators.required),
    version: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required,  Validators.email]),
    hobby: new FormControl('',  Validators.minLength(1)),
  });

  constructor() {}

  ngOnInit() {
    this.profileForm.get('libraries')?.valueChanges.subscribe( (library: FrameWorksEnum) => {
      this.versionsForSelect = this.frameworkVersions[library]
    })
    this.profileForm.get('email')?.valueChanges.subscribe( (email: string) => {
      console.log(email)
      console.log(this.profileForm)

    })
  }

   onSubmit() {
     if(this.profileForm.value.email==='test2@test.test') {
       setTimeout(() => {
         console.error('Этот email уже существует!')
         this.isEmailError = true;
         this.profileForm.get('email')?.setErrors({'incorrect': true});

       }, 2000)
     }
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm.value);
  }

}

