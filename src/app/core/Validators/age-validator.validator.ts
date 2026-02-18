import { Injectable } from "@angular/core";
import { ValidatorFn, AbstractControl } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class AgeValidator {
    validator(): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value) return null;
            const ageValue = Number(control.value);
            if (isNaN(ageValue) || ageValue < 0 || ageValue > 90) {
                return { invalidAge: true };
            }
            return null;
        };
    }
}