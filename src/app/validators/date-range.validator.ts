import { AbstractControl, ValidationErrors } from '@angular/forms';

// Custom synchronous validator that checks if end date is after start date
export function dateRangeValidator(control: AbstractControl): ValidationErrors | null {
  const startDate = control.get('startDate')?.value;
  const endDate = control.get('endDate')?.value;

  // If either date is missing, skip validation
  if (!startDate || !endDate) {
    return null;
  }

  // Return error if end date is before or equal to start date
  return new Date(endDate) > new Date(startDate) ? null : { invalidDateRange: true };
}