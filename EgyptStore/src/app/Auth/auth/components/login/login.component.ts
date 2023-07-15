import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private title: Title, private fb: FormBuilder, private router: Router) { }
  ngOnInit() {
    this.title.setTitle('login')
  }
  LoginForm: FormGroup = this.fb.group
    ({
      Email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.min(6), Validators.pattern(/^[^a-zA-Z]*$/)]],
    })

  get Email() {
    return this.LoginForm.get("Email")
  }
  get Pass() {
    return this.LoginForm.get("password")
  }

  submit() {
    this.router.navigate(['/home'])
  }
}
