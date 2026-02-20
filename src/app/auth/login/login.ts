import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../core/service/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(Auth);
  private router = inject(Router)
  loginError:string|null=null;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;
    const success = this.authService.login(email!, password!);
    if (!success) {
      this.loginError="Incorrect email or password";
      this.loginForm.markAsPristine();
      return;
    }
    this.loginError=null;
    this.router.navigate(['/dashboard']);
  }
  get emailError() {
    const control = this.loginForm.get('email');
    if (!control || !control.touched) return null;
    if (control.errors?.['required']) return 'Email is required';
    if (control.errors?.['email']) return 'Enter a valid email address';
    return null;
  }
  get passwordError() {
    const control = this.loginForm.get('password');
    if (!control || !control.touched) return null;
    if (control.errors?.['required']) return 'Password is required';
    if (control.errors?.['minlength']) return 'Minimum 8 characters are required';

    if(this.loginError&& !this.loginForm.dirty) return this.loginError;
    return null;
  }
}

