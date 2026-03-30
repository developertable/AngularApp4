import { Routes } from '@angular/router';
import { CreateEventComponent } from './components/create-event/create-event';
import { RsvpFormComponent } from './components/rsvp-form/rsvp-form';
import { EventListComponent } from './components/event-list/event-list';

export const routes: Routes = [
  // Default route redirects to event list
  { path: '', component: EventListComponent },

  // Event list page
  { path: 'events', component: EventListComponent },

  // Create event page
  { path: 'create', component: CreateEventComponent },

  // RSVP form page
  { path: 'rsvp', component: RsvpFormComponent },

  // Wildcard route — redirects unknown paths to event list
  { path: '**', redirectTo: 'events' }
];