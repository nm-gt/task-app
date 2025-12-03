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
  phone = new FormControl(null, [Validators.required, Validators.pattern(/^09\d{9}$/)])
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

  show = false;

  togglePassword() {
    this.show = !this.show;
  }

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

  conditions = {
    length: false,
    uppercase: false,
    special: false,
    number: false
  };

  updateConditions() {
    const pass = this.form.get('password')?.value || '';

    this.conditions.length = pass.length >= 8;
    this.conditions.uppercase = /[A-Z]/.test(pass);
    this.conditions.special = /[!@#$%^&*()_+\-=]/.test(pass);
    this.conditions.number = /[0-9]/.test(pass);
  }

  getLastPassedIndex(): number {
    const arr = [
      this.conditions.length,
      this.conditions.uppercase,
      this.conditions.special,
      this.conditions.number
    ];
    return arr.lastIndexOf(true);
  }

  getColorFor(condition: boolean): string {
    if (condition) return 'green';
    return '#e0e0e0';
  }

  getPassedCount(): number {
    return Object.values(this.conditions).filter(c => c).length;
  }

  getBoxColor(index: number): string {
    const passed = this.getPassedCount();

    if (passed === 0) return index === 0 ? 'red' : '#e0e0e0';
    if (passed === 1) return index < 1 ? 'orange' : '#e0e0e0';
    if (passed === 2) return index < 2 ? '#ffcc00' : '#e0e0e0';
    if (passed === 3) return index < 3 ? '#7cd97c' : '#e0e0e0';
    if (passed === 4) return 'green';

    return '#e0e0e0';
  }

}
