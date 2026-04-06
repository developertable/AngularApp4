import { Routes } from '@angular/router';

// Using lazy loading for all routes to reduce initial bundle size
export const routes: Routes = [
  // Default route - lazy loads event list
  { path: '', loadComponent: () => import('./components/event-list/event-list').then(m => m.EventListComponent) },

  // Event list page - lazy loaded
  { path: 'events', loadComponent: () => import('./components/event-list/event-list').then(m => m.EventListComponent) },

  // Create event page - lazy loaded
  { path: 'create', loadComponent: () => import('./components/create-event/create-event').then(m => m.CreateEventComponent) },

  // RSVP form page - lazy loaded
  { path: 'rsvp', loadComponent: () => import('./components/rsvp-form/rsvp-form').then(m => m.RsvpFormComponent) },

  // Wildcard route
  { path: '**', redirectTo: 'events' }
];