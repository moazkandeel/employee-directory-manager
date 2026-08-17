import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../core/services/employee.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [RouterLink ,DatePipe],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent implements OnInit {

  employee: Employee | undefined;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const idParam =
      this.route.snapshot.paramMap.get('id');

    // ID must contain numbers only
    if (!idParam || !/^\d+$/.test(idParam)) {
      this.router.navigate(['/not-found']);
      return;
    }

    const id = Number(idParam);

    this.employee =
      this.employeeService.getEmployeeById(id);

    if (!this.employee) {
      this.router.navigate(['/not-found']);
    }
  }

  deleteEmployee(): void {

    if (!this.employee) {
      return;
    }

    this.employeeService.deleteEmployee(
      this.employee.id
    );

    this.router.navigate(['/employees']);
  }
}