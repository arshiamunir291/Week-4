import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import { Auth } from '../../core/service/auth';
import { email, form, minLength, required, schema, submit, FormField } from '@angular/forms/signals';
interface LoginModel {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(Auth);
  private router=inject(Router)
  loginModel = signal<LoginModel>({ email: '', password: '' });
  loginForm = form(this.loginModel, (schema) => {
    required(schema.email, { message: 'Email is required' });
    email(schema.email, { message: 'Enter a valid email' });
    required(schema.password, { message: 'Password is required' });
    minLength(schema.password, 8, { message: 'Mininmum 8 characters required' });
  })
  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.loginForm, async () => {
      const { email, password } = this.loginModel();
      const success = await this.authService.login(email, password);
      if (!success) {
        return {
          kind: 'loginError',
          message: 'Incorrect email or password'
        };
      } else {
        this.router.navigate(['/dashboard']);
      }
      // No error, so return null
      return null;
    })
  }

}
    // validate(schema.password, ({ value }) => {
    //   const val = value();
    //   const hasAlpha = /[A-Za-z]/.test(val);
    //   const hasNumber = /[0-9]/.test(val);
    //   const hasSpecial = /[^A-Za-z0-9]/.test(val);
    //   if (!(hasAlpha && hasNumber && hasSpecial)) {
    //     return { kind: 'passwordStrength', message: 'Password must contain letter,number & special characters' };
    //   }
    //   return null;
    // });
