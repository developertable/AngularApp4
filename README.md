# AngularApp4 — Event Planner App

## About This Project
This is Assignment 5 of the Angular Development course (MWD4B) at triOS College.
The **Event Planner App** was selected for production preparation because it is the
most feature-rich app built during this course, covering reactive forms, template-driven
forms, Angular Material, custom validators, routing, and error handling.

---

## Features
- Create events using a **Reactive Form** with full validation
- RSVP for events using a **Template-Driven Form**
- View and delete events in a clean **Material Card** list
- Custom **synchronous validator** for date range checking
- Custom **async validator** for unique event title checking
- **Snackbar** error messages for form errors and simulated HTTP failures
- **TruncatePipe** to shorten long event descriptions

---

## Unit Tests

### What Was Tested
| Test File | Area Covered | # of Tests |
|---|---|---|
| `truncate-pipe.spec.ts` | TruncatePipe (pipe) | 5 |
| `event.service.spec.ts` | EventService (service) | 6 |
| `app.spec.ts` | App root component (routed) | 2 |
| `create-event.spec.ts` | CreateEventComponent | 1 |
| `rsvp-form.spec.ts` | RsvpFormComponent | 1 |
| `event-list.spec.ts` | EventListComponent | 1 |
| `navbar.spec.ts` | NavbarComponent | 1 |

**Total: 17 tests across 7 test files**

### How to Run Tests
```bash
npm install
ng test
```

---

## Performance Optimizations

### 1. Lazy Loading
All routes use `loadComponent` for lazy loading, meaning components are only
loaded when the user navigates to that route — reducing the initial bundle size.

### 2. Production Build
The app was built using Angular's production configuration which includes:
- **Tree shaking** — removes unused code
- **Minification** — compresses JavaScript and CSS
- **Ahead-of-Time (AOT) compilation** — pre-compiles templates for faster rendering

### How to Create Production Build
```bash
ng build --configuration production
```
Output will be in the `dist/AngularApp4` folder.

---

## How to Run Locally
```bash
npm install
ng serve
```
Open your browser at `http://localhost:4200`

---

## GitHub Repository
[https://github.com/developertable/AngularApp4](https://github.com/developertable/AngularApp4)

---

## Course Info
- **Course:** MWD4B — Angular Development
- **College:** triOS College
- **Assignment:** Assignment 5 — Unit Testing, Optimization & Production Build