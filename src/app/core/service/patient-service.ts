import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private patients:any[]=[];
  addPatient(patient:any){
    this.patients.push(patient);
  }
  exist(patient:any){
    return this.patients.some(p=>p.email=== patient.email || p.cnic===patient.cnic);
  }
}
