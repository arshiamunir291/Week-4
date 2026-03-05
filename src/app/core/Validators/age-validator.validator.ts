
import { ValidatorFn, AbstractControl } from "@angular/forms";
export class AgeValidator {
    validator(): ValidatorFn {
        return (control: AbstractControl) => {
            if (control.value === null || control.value === '') return null;
            const ageValue = Number(control.value);
            if (isNaN(ageValue) || ageValue < 1 || ageValue > 90) {
                return { invalidAge: true };
            }
            return null;
        };
    }
}