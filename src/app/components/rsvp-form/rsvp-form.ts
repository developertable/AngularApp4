import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Event, Rsvp } from '../../models/event.model';
import { CommonModule } from '@angular/common';

// Material imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rsvp-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './rsvp-form.html',
  styleUrl: './rsvp-form.css'
})
export class RsvpFormComponent implements OnInit {

  // Holds the list of events for the dropdown
  events: Event[] = [];

  // Model object bound to the template-driven form
  rsvpModel: Rsvp = {
    name: '',
    email: '',
    eventId: 0
  };

  // Tracks submission state
  isSubmitting = false;

  constructor(
    private eventService: EventService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Load events for the dropdown selection
    this.eventService.getEvents().subscribe({
      next: (data) => this.events = data,
      error: (err) => this.snackBar.open(`Error loading events: ${err.message}`, 'Close', { duration: 3000 })
    });
  }

  // Handles RSVP form submission
  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.snackBar.open('Please fill in all required fields correctly', 'Close', { duration: 3000 });
      return;
    }

    this.isSubmitting = true;

    this.eventService.submitRsvp(this.rsvpModel).subscribe({
      next: () => {
        this.snackBar.open('RSVP submitted successfully!', 'Close', { duration: 3000 });
        form.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        this.snackBar.open(`Error: ${err.message}`, 'Close', { duration: 4000 });
        this.isSubmitting = false;
      }
    });
  }
}
