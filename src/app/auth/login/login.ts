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
  async onSubmit() {
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
  get emailControl(){
    const control=this.loginForm.get('email');
    if(!control || !control.touched || !control.errors) return null;
    if(control.errors['required']) return 'Email is required';
    if(control.errors['email']) return 'Enter a valid email address';
    return null;
  }
  get passwordControl(){
   const control =this.loginForm.get('password');
    if(!control||!control.touched||!control.errors) return null;
    if(control.errors['required']) return 'Password is required';
    if(control.errors['minlength']) return 'Minimum 8 characters are required';
    if(control.errors['loginError']) return 'Incorrect email or password';
    return null;
  }
}

//<-------------Signal based form------------>
// loginModel = signal<LoginModel>({ email: '', password: '' });

// loginForm = form(this.loginModel, (schema) => {
//   required(schema.email, { message: 'Email is required' });
//   email(schema.email, { message: 'Enter a valid email' });
//   required(schema.password, { message: 'Password is required' });
//   minLength(schema.password, 8, { message: 'Mininmum 8 characters required' });
// })

// async onSubmit(event: Event) {
//   event.preventDefault();
//   await submit(this.loginForm, async () => {
//     const { email, password } = this.loginModel();
//     const success = this.authService.login(email, password);
//     if (!success) {
//       return [
//         {
//         fieldTree: this.loginForm.email,
//         kind: 'loginError',
//         message: 'Incorrect email or password'
//       }
//     ];

//     }
//     // No error, so return null
//     this.router.navigate(['/dashboard']);
//     return undefined;
//   })
// }

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