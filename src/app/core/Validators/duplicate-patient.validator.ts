import { inject, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { PatientService } from "../service/patient-service";
import { delay, Observable, of, map } from "rxjs";
;

@Injectable({
    providedIn:'root'
})
export class DuplicatePatientValidator implements AsyncValidator {
    private readonly patientService=inject(PatientService);
    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        if (!control.value) {
            return of(null);
        }
        return of(control.value).pipe(
            delay(300),
            map(value => this.patientService.exist(value) ? { duplicatePatient: true } : null)
        ) as Observable<ValidationErrors | null>;
    }
}