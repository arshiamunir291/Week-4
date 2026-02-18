import { Component, inject, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../core/service/patient-service';
@Component({
  selector: 'app-patient',
  imports: [ReactiveFormsModule],
  templateUrl: './patient.html',
  styleUrl: './patient.css',
})
export class Patient {
  private router = inject(Router);
  private patientService=inject(PatientService);
  patientForm=new FormGroup({
    fullname:new FormControl('',[Validators.required,Validators.minLength(3)]),
    email:new FormControl('',[Validators.required,Validators.email,]),
    cnic:new FormControl('',[Validators.required,Validators.maxLength(13),Validators.minLength(13)]),
    age:new FormControl('',[Validators.required,]),
    gender:new FormControl('',[Validators.required,]),
    phone:new FormControl('',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]),
    disease:new FormControl('',[Validators.required]),
  });

  get fullNameError():string | null{
    const control=this.patientForm.get('fullname');
    if(!control || !control.touched || !control.errors) return null;
    if(control.errors['required']) return 'Fullname is required';
    if(control.errors['minlength']) return 'Minimum 3 characters are required';
    return null;
  }
    get emailError():string | null{
    const control=this.patientForm.get('email');
    if(!control || !control.errors) return null;
    if((control.touched || control.dirty) &&control.errors['required']) return 'Email is required';
    if((control.touched || control.dirty) &&control.errors['email']) return 'Pls enter a valid email';
    if(control.errors['duplicatePatient']) return 'Patient with this email already exists!';
    return null;
  }
    get cnicError():string | null{
    const control=this.patientForm.get('cnic');
    if(!control || !control.errors) return null;
    if((control.touched || control.dirty) && control.errors['required']) return 'CNIC is required';
    if((control.touched || control.dirty) && control.errors['minlength']) return 'Minimum 13 characters are required';
    if((control.touched || control.dirty) &&control.errors['maxlength']) return 'Maximum 13 characters are allowed';
    if(control.errors['duplicatePatient']) return 'Patient with this cnic already exists!';
    return null;
  }
    get ageError():string | null{
    const control=this.patientForm.get('age');
    if(!control || !control.touched || !control.errors) return null;
    if(control.errors['required']) return 'Age is required';
    return null;
  }
    get genderError():string | null{
    const control=this.patientForm.get('gender');
    if(!control || !control.touched || !control.errors) return null;
    if(control.errors['required']) return 'Gender is required';
    return null;
  }
    get phoneError():string | null{
    const control=this.patientForm.get('phone');
    if(!control || !control.touched || !control.errors) return null;
    if(control.errors['required']) return 'Phone number  is required';
    if(control.errors['minlength']) return 'Minimum 11 characters are required';
    if(control.errors['maxlength']) return 'Maximum 11 characters are allowed';
    return null;
  }
    get diseaseError():string | null{
    const control=this.patientForm.get('disease');
    if(!control || !control.touched || !control.errors) return null;
    if(control.errors['required']) return 'Disease is required';
    return null;
  }
   async onsubmit(){
    if(this.patientForm.invalid){
      this.patientForm.markAllAsTouched();
      return;
    }
    const patient=this.patientForm.value;
    if(this.patientService.exist(patient)){
      this.patientForm.get('email')?.setErrors({duplicatePatient:true});
      this.patientForm.get('cnic')?.setErrors({duplicatePatient:true});
      return;
    }
     this.patientService.addPatient(patient);
     alert("Patient added successfully!")
     this.patientForm.reset();
    this.router.navigate(['/dashboard']);
  }
  resetForm(){
    this.patientForm.reset();
  }
  }   


  // async onSubmit(event:Event){
  //   event.preventDefault();
  //   await submit(this.patientForm,async ()=>{
  //     console.log('Patient saved:',this.patientModel());
  //     this.router.navigate(['/dashboard']);
  //     return undefined;
  //   })
  // }
  // resetForm(){
  //   this.patientModel.set({
  //     fullName: '',
  //     age: '',
  //     gender: '',
  //     phone: '',
  //     disease: '',
  //   })
  // }
    // patientModel = signal<PatientModel>({
  //   fullName: '',
  //   age: '',
  //   gender: '',
  //   phone: '',
  //   disease: '',
  // })

  // patientForm = form(this.patientModel, (schema => {
  //   required(schema.fullName, { message: 'Full name is required' });
  //   required(schema.age, { message: 'Age is required' });
  //   required(schema.gender, { message: 'Gender is required' });
  //   required(schema.phone, { message: 'Phone number is required' });
  //   required(schema.disease, { message: 'Disease is required' });

  //   minLength(schema.fullName, 3, { message: 'Full name must be at least 3 characters long' });
  //   minLength(schema.phone, 11, { message: 'Phone number must be at least 11 digits long' });

  //   validate(schema.age, ({ value }) => {
  //     const ageValue = Number(value());
  //     if (!ageValue || ageValue < 0 || ageValue > 120) {
  //       return { kind: 'invalidAge', message: 'Enter a valid age between 0 and 120' };
  //     }
  //     return undefined;
  //   })
  // }))