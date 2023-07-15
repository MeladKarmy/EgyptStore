import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private title: Title, private fb: FormBuilder, private router: Router) { }
  ngOnInit() {
    this.title.setTitle('Register')
  }
  RegisterForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[^0-9]*$/)]],
    lastName: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[^0-9]*$/)]],
    Email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.min(6), Validators.pattern(/^[^a-zA-Z]*$/)]],
    configPassword: ['', [Validators.required]],
    age: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[^0-9]*$/)]],
    tel: ['', [Validators.required, Validators.pattern(/^[^a-zA-Z]{11}$/)]]
  })
  get FN() {
    return this.RegisterForm.get("firstName")
  }
  get LN() {
    return this.RegisterForm.get("lastName")
  }
  get Email() {
    return this.RegisterForm.get("Email")
  }
  get Pass() {
    return this.RegisterForm.get("password")
  }
  get config() {
    return this.RegisterForm.get("configPassword")
  }
  get Age() {
    return this.RegisterForm.get("age")
  }
  get Tel() {
    return this.RegisterForm.get("tel")
  }
  submit() {
    this.router.navigate(['login'])
    // console.log(this.RegisterForm)
  }



}
