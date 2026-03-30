import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from '../../services/event.service';
import { dateRangeValidator } from '../../validators/date-range.validator';
import { uniqueTitleValidator } from '../../validators/unique-title.validator';
import { Event } from '../../models/event.model';

// Material imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  templateUrl: './create-event.html',
  styleUrl: './create-event.css'
})
export class CreateEventComponent implements OnInit {

  // The reactive form group
  eventForm!: FormGroup;

  // Available event categories for the mat-select
  categories = ['Technology', 'Business', 'Arts', 'Sports', 'Education', 'Other'];

  // Tracks form submission state
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Initialize the reactive form with validators
    this.eventForm = this.fb.group({
      title: [
        '',
        [Validators.required, Validators.minLength(3)],
        [uniqueTitleValidator(this.eventService)] // async validator
      ],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      location: ['', Validators.required],
      maxAttendees: [1, [Validators.required, Validators.min(1), Validators.max(1000)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    }, { validators: dateRangeValidator }); // form-level validator
  }

  // Convenience getters for cleaner template access
  get title() { return this.eventForm.get('title'); }
  get description() { return this.eventForm.get('description'); }
  get category() { return this.eventForm.get('category'); }
  get location() { return this.eventForm.get('location'); }
  get maxAttendees() { return this.eventForm.get('maxAttendees'); }
  get startDate() { return this.eventForm.get('startDate'); }
  get endDate() { return this.eventForm.get('endDate'); }

  // Handles form submission
  onSubmit(): void {
    if (this.eventForm.invalid) {
      this.snackBar.open('Please fix all errors before submitting', 'Close', { duration: 3000 });
      return;
    }

    this.isSubmitting = true;

    // Build the event object from form values
    const newEvent: Event = { id: 0, ...this.eventForm.value };

    this.eventService.addEvent(newEvent).subscribe({
      next: () => {
        this.snackBar.open('Event created successfully!', 'Close', { duration: 3000 });
        this.eventForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        this.snackBar.open(`Error: ${err.message}`, 'Close', { duration: 4000 });
        this.isSubmitting = false;
      }
    });
  }
}