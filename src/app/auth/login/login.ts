import { Component, inject} from '@angular/core';
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
      this.loginForm.get('email')?.setErrors({loginError:true});
      this.loginForm.get('password')?.setErrors({loginError:true});
      return;
    }
    this.router.navigate(['/dashboard']);
  }
  get emailError(){
    const control=this.loginForm.get('email');
    if(!control || !control.touched || !control.errors) return null;
    if(control.errors['required']) return 'Email is required';
    if(control.errors['email']) return 'Enter a valid email address';
    return null;
  }
  get passwordError(){
   const control =this.loginForm.get('password');
    if(!control||!control.touched||!control.errors) return null;
    if(control.errors['required']) return 'Password is required';
    if(control.errors['minlength']) return 'Minimum 8 characters are required';
    if(control.errors['loginError']) return 'Incorrect email or password';
    return null;
  }
}

