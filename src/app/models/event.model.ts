// Defines the structure of an Event object used throughout the app
export interface Event {
  id: number;
  title: string;
  description: string;
  category: string;
  startDate: Date;
  endDate: Date;
  maxAttendees: number;
  location: string;
}

// Defines the structure of an RSVP submission
export interface Rsvp {
  name: string;
  email: string;
  eventId: number;
}