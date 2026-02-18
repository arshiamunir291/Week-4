import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private patients:any[]=[];
  addPatient(patient:any){
    this.patients.push(patient);
  }
  exist(cnic:string):boolean{
    return this.patients.some(p=>p.cnic===cnic);
  }
}
