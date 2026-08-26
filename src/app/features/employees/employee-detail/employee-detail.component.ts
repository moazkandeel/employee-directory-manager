import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../core/services/employee.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent implements OnInit {

  employee: Employee | undefined;

  constructor(
    private readonly notificationService: NotificationService,
    private readonly route: ActivatedRoute,
    private readonly employeeService: EmployeeService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/not-found']);
      return;
    }

    this.employeeService.getEmployeeById(id).subscribe({
      next: employee => {
        this.employee = employee;
      },
      error: error => {
        console.error('Failed to load employee.', error);
        this.router.navigate(['/not-found']);
      }
    });
  }

  deleteEmployee(): void {
    if (!this.employee) {
      return;
    }

    this.employeeService.deleteEmployee(this.employee.id).subscribe({
      next: () => {
        this.notificationService.show('Employee deleted successfully');
        this.router.navigate(['/employees']);
      },
      error: error => {
        console.error('Failed to delete employee.', error);
      }
    });
  }
}