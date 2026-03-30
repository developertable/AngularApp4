import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

// Material imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css'
})
export class EventListComponent implements OnInit {

  // Holds the list of events to display
  events: Event[] = [];

  // Tracks loading state
  isLoading = true;

  constructor(
    private eventService: EventService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Load events when component initializes
    this.loadEvents();
  }

  // Fetches events from the service
  loadEvents(): void {
  this.isLoading = true;
  this.eventService.getEvents().subscribe({
    next: (data) => {
      this.events = data;
      this.isLoading = false;
    },
    error: (err) => {
      this.snackBar.open(`Error loading events: ${err.message}`, 'Close', { duration: 3000 });
      this.isLoading = false;
    },
    complete: () => {
      this.isLoading = false;
    }
  });
  }

  // Deletes an event by ID
  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe({
      next: () => {
        this.events = this.events.filter(e => e.id !== id);
        this.snackBar.open('Event deleted successfully', 'Close', { duration: 3000 });
      },
      error: (err) => {
        this.snackBar.open(`Error deleting event: ${err.message}`, 'Close', { duration: 3000 });
      }
    });
  }
}
