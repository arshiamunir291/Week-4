import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../core/service/auth';
import { FormError } from '../../shared/form-error/form-error';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormError],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(Auth);
  private router = inject(Router)
  loginError: string | null = null;

  constructor() {
    this.loginForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.loginError = null);
  }

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
      this.loginError = "Incorrect email or password";
      this.loginForm.markAsPristine();
      return;
    }
    this.loginError = null;
    this.router.navigate(['/dashboard']);
  }
  validationMessage = {
    email: {
      required: 'Email is required',
      email: 'Enter a valid email'
    },
    password: {
      required: 'Password is required',
      minlength: 'Minimum 8 characters are required',
    }
  }
}

