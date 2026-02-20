import { Component, inject, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { PatientService } from '../core/service/patient-service';
import { DuplicatePatientValidator } from '../core/Validators/duplicate-patient.validator';
import { AgeValidator } from '../core/Validators/age-validator.validator';

@Component({
  selector: 'app-patient',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './patient.html',
  styleUrl: './patient.css',
})
export class Patient {

  private router = inject(Router);
  private patientService = inject(PatientService);
  private duplicatePatient = inject(DuplicatePatientValidator);
  private ageValidator=inject(AgeValidator);


  patientForm = new FormGroup({
    fullname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email,]),
    cnic: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(13), Validators.minLength(13)],
      asyncValidators: [this.duplicatePatient.validate.bind(this.duplicatePatient)]
    }
    ),
    age: new FormControl('', [Validators.required, this.ageValidator.validator()]),
    gender: new FormControl('', [Validators.required,]),
    phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    disease: new FormControl('', [Validators.required]),
  });


  get fullNameError(): string | null {
    const control = this.patientForm.get('fullname');
    if (!control || !control.touched || !control.errors) return null;
    if (control.errors['required']) return 'Fullname is required';
    if (control.errors['minlength']) return 'Minimum 3 characters are required';
    return null;
  }


  get emailError(): string | null {
    const control = this.patientForm.get('email');
    if (!control || !control.errors) return null;
    if ((control.touched || control.dirty) && control.errors['required']) return 'Email is required';
    if ((control.touched || control.dirty) && control.errors['email']) return 'Pls enter a valid email';
    return null;
  }


  get cnicError(): string | null {
    const control = this.patientForm.get('cnic');
    if (!control || !control.errors) return null;
    if ((control.touched || control.dirty) && control.errors['required']) return 'CNIC is required';
    if ((control.touched || control.dirty) && control.errors['minlength']) return 'Minimum 13 characters are required';
    if ((control.touched || control.dirty) && control.errors['maxlength']) return 'Maximum 13 characters are allowed';
    if (control.errors['duplicatePatient']) return 'Patient with this cnic already exists!';
    return null;
  }


  get ageError(): string | null {
    const control = this.patientForm.get('age');
    if (!control || !control.touched || !control.errors) return null;
    if (control.errors['required']) return 'Age is required';
    if (control.errors['invalidAge']) return 'Enter valid age (0-90)';
    return null;
  }


  get genderError(): string | null {
    const control = this.patientForm.get('gender');
    if (!control || !control.touched || !control.errors) return null;
    if (control.errors['required']) return 'Gender is required';
    return null;
  }


  get phoneError(): string | null {
    const control = this.patientForm.get('phone');
    if (!control || !control.touched || !control.errors) return null;
    if (control.errors['required']) return 'Phone number  is required';
    if (control.errors['minlength']) return 'Minimum 11 characters are required';
    if (control.errors['maxlength']) return 'Maximum 11 characters are allowed';
    return null;
  }


  get diseaseError(): string | null {
    const control = this.patientForm.get('disease');
    if (!control || !control.touched || !control.errors) return null;
    if (control.errors['required']) return 'Disease is required';
    return null;
  }


  onsubmit() {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }
    this.patientService.addPatient(this.patientForm.value);
    alert("Patient added successfully!")
    this.patientForm.reset();
    this.router.navigate(['/dashboard']);
  }


  resetForm() {
    this.patientForm.reset();
  }
 
}

