import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  constructor(private fb: FormBuilder) { }
  contact = {
    info: [
      { icon: "fa-solid fa-location-dot", text: "Egypt, Alexandria" },
      { icon: "fa-solid fa-envelope", text: "info@example.com" },
      { icon: "fa-solid fa-mobile-screen", text: "01234567891" },
    ]
  }
  contactForm: FormGroup = this.fb.group({
    // fullName:['',[Validators.required]],
    Email: ['', [Validators.required]],
    Subject: ['', [Validators.required]],
    Massage: ['', [Validators.required]]

  })
  get fullName() {
    return this.contactForm.get("fullName")
  }
  get Email() {
    return this.contactForm.get("fullName")
  }
  get Subject() {
    return this.contactForm.get("fullName")
  }
  get Massage() {
    return this.contactForm.get("fullName")
  }
  submit() {
    alert("Massege is send...")
  }
}


