import { Component, inject, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PatientService } from '../core/service/patient-service';
import { DuplicatePatientValidator } from '../core/Validators/duplicate-patient.validator';
import { AgeValidator } from '../core/Validators/age-validator.validator';
import { FormError } from '../shared/form-error/form-error';


@Component({
  selector: 'app-patient',
  imports: [ReactiveFormsModule, RouterLink,FormError],
  templateUrl: './patient.html',
  styleUrl: './patient.css',
})
export class Patient {

  private router = inject(Router);
  private patientService = inject(PatientService);
  private duplicatePatient = inject(DuplicatePatientValidator);
  private ageValidator = new AgeValidator();


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

  validationMessage = {
    fullname: {
      required: 'Fullname is required',
      minlength: 'Minimum 3 characters are required'
    },
    email: {
      required: 'Email is required',
      email: 'Enter valid email'
    },
    cnic: {
      required: 'Cnic is required',
      minlength: 'Minimum 13 characters are required',
      maxlength: 'Maximum 13 characters are required',
      duplicatePatient: 'Patient with this cnic already exists'
    },
    age: {
      required: 'Age is required',
      invalidAge: 'Enter valid age (1-90)'
    },
    gender: {
      required: 'Gender is required',
    },
    phone: {
      required: 'Phone number is required',
      minlength: 'Minimum 11 characters are required',
      maxlength: 'Minimum 11 characters are required'
    },
    disease: {
      required: 'Disease is required',
    },

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

