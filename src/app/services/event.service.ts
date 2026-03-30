import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Event, Rsvp } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  // Simulated in-memory list of events
  private events: Event[] = [
    {
      id: 1,
      title: 'Angular Workshop',
      description: 'A hands-on Angular learning session',
      category: 'Technology',
      startDate: new Date('2025-06-01'),
      endDate: new Date('2025-06-02'),
      maxAttendees: 30,
      location: 'Toronto'
    }
  ];

  // Simulated RSVP list
  private rsvps: Rsvp[] = [];

  // Flag to simulate HTTP failure for error handling demo
  private simulateError = false;

  constructor(private snackBar: MatSnackBar) {}

  // Returns all events as an observable (simulates HTTP GET)
  getEvents(): Observable<Event[]> {
    if (this.simulateError) {
      return throwError(() => new Error('Failed to load events'));
    }
    return of([...this.events]);
  }

  // Adds a new event (simulates HTTP POST)
  addEvent(event: Event): Observable<Event> {
    if (this.simulateError) {
      return throwError(() => new Error('Failed to save event'));
    }
    event.id = this.events.length + 1;
    this.events.push(event);
    return of(event).pipe(delay(500));
  }

  // Deletes an event by ID (simulates HTTP DELETE)
  deleteEvent(id: number): Observable<boolean> {
    this.events = this.events.filter(e => e.id !== id);
    return of(true).pipe(delay(500));
  }

  // Submits an RSVP
  submitRsvp(rsvp: Rsvp): Observable<Rsvp> {
    if (this.simulateError) {
      return throwError(() => new Error('Failed to submit RSVP'));
    }
    this.rsvps.push(rsvp);
    return of(rsvp);
  }

  // Returns existing event titles for unique title validation
  getEventTitles(): string[] {
    return this.events.map(e => e.title.toLowerCase());
  }

  // Shows a snackbar notification
  showMessage(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

  // Toggles the simulated error flag
  toggleSimulateError(): void {
    this.simulateError = !this.simulateError;
  }
}