import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, combineLatest, debounceTime, distinctUntilChanged, map, of, startWith, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../core/services/employee.service';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [FormsModule, AsyncPipe, EmployeeCardComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  employees$!: Observable<Employee[]>;
  filteredEmployees$!: Observable<Employee[]>;

  searchTerm = '';
  loading = false;
  errorMessage = '';

  private readonly searchSubject = new Subject<string>();
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  private loadEmployees(): void {
    this.loading = true;
    this.errorMessage = '';

    this.employees$ = this.employeeService.getEmployees().pipe(
      tap(() => this.loading = false),
      catchError(error => {
        console.error('Failed to load employees.', error);
        this.errorMessage = 'Failed to load employees. Please try again.';
        this.loading = false;
        return of([]);
      })
    );

    const search$ = this.searchSubject.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      map(value => value.trim().toLowerCase())
    );

    this.filteredEmployees$ = combineLatest([
      this.employees$, search$
    ]).pipe( map(([employees, search]) => {
        if (!search) {
          return employees;
        }

        return employees.filter(employee =>
          employee.name.toLowerCase().includes(search) ||
          employee.department.toLowerCase().includes(search) ||
          employee.title.toLowerCase().includes(search)
        );
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.searchSubject.next(value);
  }

  onEmployeeSelected(employeeId: number | string): void {
    this.router.navigate(['/employees', employeeId]);
  }

  goToAddEmployee(): void {
    this.router.navigate(['/employees/new']);
  }
}