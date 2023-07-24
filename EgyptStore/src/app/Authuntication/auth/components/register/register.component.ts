import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { IUsers } from '../../interfaces/users';
import { IRegister } from '../../interfaces/register';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private title: Title,
    private fb: FormBuilder,
    private router: Router,
    private userService: UsersService,
  ) { }
  form: FormData
  user: any;
  err: string
  imageFile: any
  ngOnInit() {
    this.title.setTitle('Register')
  }
  RegisterForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(/^[^0-9]*$/)]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(/^[^0-9]*$/)]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^[^a-zA-Z]*$/)]],
    configPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^[^a-zA-Z]*$/)]],
    phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    age: ['', [Validators.required, Validators.min(12)]],
    image: ['', Validators.required],
    gender: ['', [Validators.required]]
  })
  get first() {
    return this.RegisterForm.get("firstName")
  }
  get last() {
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
    return this.RegisterForm.get("phone")
  }
  get age() {
    return this.RegisterForm.get("age")
  }
  get image() {
    return this.RegisterForm.get("image")
  }
  get gender() {
    return this.RegisterForm.get("gender")
  }

  formData() {
    this.form = new FormData();
    this.form.append('firstName', this.RegisterForm.get('firstName')?.value!);
    this.form.append('lastName', this.RegisterForm.get('lastName')?.value!);
    this.form.append('phone', this.RegisterForm.get('phone')?.value!);
    this.form.append('age', this.RegisterForm.get('age')?.value!);
    this.form.append('image', this.RegisterForm.get('image')?.value!);
    this.form.append('gender', this.RegisterForm.get('gender')?.value!);
    this.form.append('email', this.RegisterForm.get('email')?.value!);
    this.form.append('password', this.RegisterForm.get('password')?.value!);
    this.form.append('configPassword', this.RegisterForm.get('configPassword')?.value!);
  }
  submit() {
    this.formData()
    this.userService.register(this.form).subscribe({
      next: data => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: data,
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/login'])
      },
      error: err =>
        Swal.fire({
          icon: 'error',
          title: err.error.msg,
        })
    })
  }
  getImageFile(imageFile: any) {
    this.RegisterForm.get('image')?.setValue(imageFile.files[0])
  }

}
// this.user = data
//       if (this.user == 'Welcome to Egypt Store') {
//         Swal.fire({
//           position: 'center',
//           icon: 'success',
//           title: 'Welcome to Egypt Store',
//           showConfirmButton: false,
//           timer: 1500
//         })
//         this.router.navigate(['/login'])
//       }
//       else {
//         Swal.fire({
//           icon: 'error',
//           title:'not valid',
//         })
//       }
//       console.log(this.user)