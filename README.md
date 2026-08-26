## Technologies

- Angular 19
- TypeScript
- HTML5
- CSS3
- RxJS
- Angular Router
- Angular HttpClient
- Reactive Forms
- Template-driven Forms
- REST API

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

Navigation is handled using `routerLink` and `Router.navigate()` without full page reloads.

## Data Management

The application communicates with a REST API using Angular `HttpClient`.

The `EmployeeService` handles all employee-related HTTP operations:

- `GET /employees` — Get all employees
- `GET /employees/:id` — Get employee by ID
- `POST /employees` — Add employee
- `PUT /employees/:id` — Update employee
- `DELETE /employees/:id` — Delete employee

The application does not use LocalStorage. Employee data is managed through the REST API.

## Error Handling

The application includes:

- Loading state while fetching employees
- Error state when API requests fail
- Retry functionality
- Not Found page for invalid employee IDs
- Empty state when no employees match the search