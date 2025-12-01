import { NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class Signup {

  constructor(private auth: AuthService, private router: Router) { }

  name = new FormControl('', [Validators.required, Validators.minLength(2)]);
  lastname = new FormControl('', [Validators.required, Validators.minLength(2)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  form = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*\d)(?=.*[&*]).+$/)
    ]),
    confirmpassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  }, {
    validators: (form: AbstractControl) => {
      const password = form.get('password')?.value;
      const confirm = form.get('confirmpassword')?.value;
      return password === confirm ? null : { passwordMismatch: true };
    }
  });

  onSubmitClicked(e: Event) {
    e.preventDefault();
    if (this.name.invalid || this.lastname.invalid || this.email.invalid || this.form.invalid) {
      alert("⚠️ فیلدها باید به درستی پر شوند");
    } else {
      this.openDeleteModal();
    }

  }

  openDeleteModal() {
    const modalEl = document.getElementById('deleteModal');
    if (!modalEl) {
      console.error('❌ Modal element not found!');
      return;
    }
    const modal = new (window as any).bootstrap.Modal(modalEl);
    modal.show();
  }

  closeModal() {
    const modalEl = document.getElementById('deleteModal');
    const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
  }

  confirmDelete() {
    alert("✅ کاربر ثبت‌نام شد");
    this.closeModal();
    this.name.reset();
    this.lastname.reset();
    this.email.reset();
    this.form.reset();
  }

  doLogin() {
    this.auth.login();
    this.router.navigate(['/addtask']);
  }

  doLogout() {
    this.auth.logout();
  }
}
