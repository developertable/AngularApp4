import { TestBed } from '@angular/core/testing';
import { EventService } from './event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { Event, Rsvp } from '../models/event.model';

describe('EventService', () => {
  let service: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventService,
        MatSnackBar,
        Overlay
      ]
    });
    service = TestBed.inject(EventService);
  });

  // Test 1: service should be created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test 2: should return initial events list
  it('should return a list of events', () => {
    service.getEvents().subscribe((events: Event[]) => {
      expect(events.length).toBeGreaterThan(0);
    });
  });

  // Test 3: should add a new event
  it('should add a new event', () => {
    const newEvent: Event = {
      id: 0,
      title: 'Test Event',
      description: 'Test Description',
      category: 'Technology',
      startDate: new Date('2025-07-01'),
      endDate: new Date('2025-07-02'),
      maxAttendees: 50,
      location: 'Oshawa'
    };
    service.addEvent(newEvent).subscribe(() => {
      service.getEvents().subscribe((events: Event[]) => {
        const found = events.find((e: Event) => e.title === 'Test Event');
        expect(found).toBeTruthy();
      });
    });
  });

  // Test 4: should delete an event
  it('should delete an event by id', () => {
    service.deleteEvent(1).subscribe(() => {
      service.getEvents().subscribe((events: Event[]) => {
        const found = events.find((e: Event) => e.id === 1);
        expect(found).toBeUndefined();
      });
    });
  });

  // Test 5: should return event titles for validation
  it('should return existing event titles', () => {
    const titles = service.getEventTitles();
    expect(titles.length).toBeGreaterThan(0);
    expect(titles).toContain('angular workshop');
  });

  // Test 6: should submit an RSVP successfully
  it('should submit an RSVP successfully', () => {
    const rsvp: Rsvp = { name: 'Rahul', email: 'rahul@test.com', eventId: 1 };
    service.submitRsvp(rsvp).subscribe((result: Rsvp) => {
      expect(result.name).toBe('Rahul');
    });
  });
});