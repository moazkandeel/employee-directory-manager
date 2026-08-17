# Employee Directory Manager

Employee Directory Manager is a Single Page Application built with Angular
for managing employee records.

The application allows users to view, search, add, edit, and delete employees
through a clean and responsive interface.

## Features

- Employee listing
- Live employee search
- Employee details
- Add employee
- Edit employee
- Delete employee
- Active / Inactive employee status
- Reactive Forms for Add/Edit
- Template-driven Forms for live search
- Built-in form validation
- Custom future-date validator
- LocalStorage persistence
- Angular Router navigation
- 404 Not Found page
- Custom attribute directive
- Custom pipe
- Built-in Angular pipes
- Notification service
- Parent-child communication using `@Input()` and `@Output()`
- Standalone Angular components

## Architecture

This project uses Angular Standalone Components instead of NgModules.

Standalone components were chosen because they provide a modern and simpler
Angular architecture while keeping dependencies explicit inside each component.

The project is organized by feature, with separate folders for:

- Employee features
- Core services
- Shared directives and pipes
- Application pages

## Technologies

- Angular 19
- TypeScript
- HTML5
- CSS3
- RxJS
- Angular Router
- Reactive Forms
- Template-driven Forms
- LocalStorage

## Forms

The project deliberately uses both Angular form approaches:

### Reactive Forms

Reactive Forms are used for:

- Add Employee
- Edit Employee
- Form validation
- Custom future-date validation

### Template-driven Forms

Template-driven Forms are used for:

- Live employee search

This demonstrates the difference between the two Angular forms approaches.

## Routing

The application uses Angular Router with the following routes:

| Route | Purpose |
|---|---|
| `/employees` | Employee list |
| `/employees/new` | Add employee |
| `/employees/:id` | Employee details |
| `/employees/:id/edit` | Edit employee |
| `/not-found` | Not Found page |
| `**` | Wildcard 404 route |

Navigation is handled using `routerLink`, `routerLinkActive`, and
`Router.navigate()` without full page reloads.

## Data Storage

The application currently uses static mock employee data stored inside
`EmployeeService`.

Employee changes are persisted using browser `LocalStorage`.

No backend API or HTTP requests are used in this task.
## How to Run

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
ng serve
```

Then open your browser and navigate to:

```text
http://localhost:4200
```

## Build

To create a production build:

```bash
ng build
```

The generated build files will be stored in the `dist/` directory.

## Known Limitations

- There is no backend API yet.
- Employee data is stored using browser LocalStorage.
- LocalStorage data is specific to the browser/profile.
- Authentication and authorization are not implemented.
- Data is currently based on local mock data.

## Reflection

The Angular component structure and routing were relatively straightforward.

Using `@Input()` and `@Output()` helped keep the employee card independent from
the employee management logic.

Reactive Forms and custom validation were more challenging because they require
understanding FormGroup, validators, and form states.

Working with LocalStorage also required careful handling to keep employee
changes after refreshing the page.

With more time, I would improve the application by adding a backend API,
authentication, automated tests, pagination, sorting, and more advanced
employee filtering.

## Project Status

Completed as part of the Angular training task.
