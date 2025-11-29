import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class Signup {

  constructor(private auth: AuthService, private router: Router) { }

  name = new FormControl('', [Validators.required, Validators.minLength(2)]);
  lastname = new FormControl('', [Validators.required, Validators.minLength(2)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  onSubmitClicked(e: Event) {
    e.preventDefault();
    if (this.name.invalid || this.lastname.invalid || this.email.invalid || this.password.invalid) {
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
    this.password.reset();
  }

  doLogin() {
    this.auth.login();
    this.router.navigate(['/addtask']);
  }

  doLogout() {
    this.auth.logout();
  }
}
