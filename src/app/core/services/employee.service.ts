import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { Employee } from '../../models/employee';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly apiUrl = `${environment.apiUrl}/employees`;

  constructor(private readonly http: HttpClient) {}

  // Update the getEmployees method to return an Observable of Employee array and handle errors

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl).pipe(
      catchError(() =>
        throwError(() =>
          new Error('Unable to load employees. Please try again.')
        )
      )
    );
  }

  // Update the getEmployeeById method to accept both number and string types for the id parameter

  getEmployeeById(id: number | string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  // Add the addEmployee method to create a new employee

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }


  // Update the updateEmployee method to accept both number and string types for the id parameter

  updateEmployee(id: number | string, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(
      `${this.apiUrl}/${id}`,
      employee
    );
  }

  // Add the deleteEmployee method to accept both number and string types for the id parameter
  deleteEmployee(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}