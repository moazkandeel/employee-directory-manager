import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../core/services/employee.service';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [ FormsModule, EmployeeCardComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  searchTerm = '';

  constructor(
    private employeeService: EmployeeService, private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  private loadEmployees(): void {
    this.employees = this.employeeService.getEmployees();
  }

  get filteredEmployees(): Employee[] {

    const search = this.searchTerm
      .trim()
      .toLowerCase();

    if (!search) {
      return this.employees;
    }

    return this.employees.filter(employee =>
      employee.name.toLowerCase().includes(search) ||
      employee.department.toLowerCase().includes(search) ||
      employee.title.toLowerCase().includes(search)
    );
  }

  onEmployeeSelected(employeeId: number): void {
    this.router.navigate([
      '/employees',
      employeeId
    ]);
  }

  goToAddEmployee(): void {
    this.router.navigate([
      '/employees/new'
    ]);
  }

 
}