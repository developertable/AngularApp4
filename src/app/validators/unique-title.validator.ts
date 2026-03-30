import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { EventService } from '../services/event.service';

// Custom async validator factory that checks if event title already exists
export function uniqueTitleValidator(eventService: EventService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const title = control.value?.toLowerCase();

    // Simulate async check with a small delay
    return of(eventService.getEventTitles()).pipe(
      delay(300),
      map(titles => titles.includes(title) ? { titleTaken: true } : null)
    );
  };
}