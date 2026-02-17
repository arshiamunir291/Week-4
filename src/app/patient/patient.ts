import { Component, inject, signal } from '@angular/core';
import { form, minLength, required, schema, submit, validate, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';


interface PatientModel {
  fullName: string;
  age: string;
  gender: string;
  phone: string;
  disease: string;
}
@Component({
  selector: 'app-patient',
  imports: [FormField],
  templateUrl: './patient.html',
  styleUrl: './patient.css',
})
export class Patient {
  private router = inject(Router);

  patientModel = signal<PatientModel>({
    fullName: '',
    age: '',
    gender: '',
    phone: '',
    disease: '',
  })

  patientForm = form(this.patientModel, (schema => {
    required(schema.fullName, { message: 'Full name is required' });
    required(schema.age, { message: 'Age is required' });
    required(schema.gender, { message: 'Gender is required' });
    required(schema.phone, { message: 'Phone number is required' });
    required(schema.disease, { message: 'Disease is required' });

    minLength(schema.fullName, 3, { message: 'Full name must be at least 3 characters long' });
    minLength(schema.phone, 11, { message: 'Phone number must be at least 11 digits long' });

    validate(schema.age, ({ value }) => {
      const ageValue = Number(value());
      if (!ageValue || ageValue < 0 || ageValue > 120) {
        return { kind: 'invalidAge', message: 'Enter a valid age between 0 and 120' };
      }
      return undefined;
    })
  }))
  async onSubmit(event:Event){
    event.preventDefault();
    await submit(this.patientForm,async ()=>{
      console.log('Patient saved:',this.patientModel());
      this.router.navigate(['/dashboard']);
      return undefined;
    })
  }
  resetForm(){
    this.patientModel.set({
      fullName: '',
      age: '',
      gender: '',
      phone: '',
      disease: '',
    })
  }

  }
