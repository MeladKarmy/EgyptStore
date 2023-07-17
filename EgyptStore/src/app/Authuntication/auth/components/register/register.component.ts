import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { IUsers } from '../../interfaces/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(
    private title: Title,
    private fb: FormBuilder,
    private router: Router,
    private userService: UsersService
  ) { }
  user: any;
  err: string
  ngOnInit() {
    this.title.setTitle('Register')
  }
  RegisterForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15), Validators.pattern(/^[^0-9]*$/)]],
    lastName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15), Validators.pattern(/^[^0-9]*$/)]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.min(6), Validators.pattern(/^[^a-zA-Z]*$/)]],
    configPassword: ['', [Validators.required, Validators.min(6), Validators.pattern(/^[^a-zA-Z]*$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^[^a-zA-Z]{11}$/)]],
    age: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[^0-9]*$/)]],
    image: ['', [Validators.required, Validators.pattern(/^[^a-zA-Z]{11}$/)]],
    gender: ['', [Validators.required, Validators.pattern(/^[^a-zA-Z]{11}$/)]]
  })
  get FN() {
    return this.RegisterForm.get("firstName")
  }
  get LN() {
    return this.RegisterForm.get("lastName")
  }
  get Email() {
    return this.RegisterForm.get("email")
  }
  get Pass() {
    return this.RegisterForm.get("password")
  }
  get config() {
    return this.RegisterForm.get("configPassword")
  }
  get phone() {
    return this.RegisterForm.get("tel")
  }
  get Age() {
    return this.RegisterForm.get("age")
  }
  get image() {
    return this.RegisterForm.get("image")
  }
  get gender() {
    return this.RegisterForm.get("gender")
  }
  submit() {

    this.userService.createUser(this.RegisterForm.value).subscribe(data => {
      this.user = data
      this.router.navigate(['login'])
      console.log(data, this.user)

    })
    // console.log(this.RegisterForm)
  }
}
