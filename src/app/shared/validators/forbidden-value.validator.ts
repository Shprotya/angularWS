import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Factory: takes the word to forbid and returns a validator function,
// the same way Validators.minLength(2) takes 2 and returns a validator.
export function forbiddenValue(word: string): ValidatorFn {
    const forbidden = word.trim().toLowerCase();

    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (typeof value === 'string' && value.trim().toLowerCase() === forbidden) {
            return { forbiddenValue: { forbidden: word, actual: value } };
        }
        return null;
    };
}
