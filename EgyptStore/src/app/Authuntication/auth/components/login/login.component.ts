import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userData: any
  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UsersService,
  ) { }
  LoginForm: FormGroup = this.fb.group
    ({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })

  get Email() {
    return this.LoginForm.get("email")
  }
  get password() {
    return this.LoginForm.get("password")
  }

  submit() {
    this.userService.login(this.LoginForm.value).subscribe((data) => {
      this.userData = data
      this.userData.token ? localStorage.setItem('token', JSON.stringify(this.userData.token)) : ''
      if (this.userData.data === 'success login') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Welcome to Egypt Store',
          showConfirmButton: false,
          timer: 1500
        })
        this.userService.isLogin = true
        this.userService.getDataJwtUser()
        this.router.navigate(['/home'])
      } else {
        this.userService.isLogin = false
        Swal.fire({
          icon: 'error',
          title: this.userData,
        })
      }
    })

  }

}
