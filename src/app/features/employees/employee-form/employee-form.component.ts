import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../core/services/employee.service';
import { NotificationService } from '../../../core/services/notification.service';

function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  const selectedDate = new Date(control.value);
  const today = new Date();

  selectedDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return selectedDate > today ? { futureDate: true } : null;
}

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {

  form!: FormGroup;
  isEditMode = false;
  employeeId: number | string | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly employeeService: EmployeeService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      department: ['', Validators.required],
      title: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      hireDate: ['', futureDateValidator],
      isActive: [true]
    });

    this.loadEmployeeForEdit();
  }

  private loadEmployeeForEdit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      return;
    }

    this.isEditMode = true;
    this.employeeId = idParam;

    this.employeeService.getEmployeeById(idParam).subscribe({
      next: employee => {
        this.form.patchValue({
          name: employee.name,
          department: employee.department,
          title: employee.title,
          email: employee.email,
          hireDate: employee.hireDate,
          isActive: employee.isActive
        });
      },
      error: () => {
        this.router.navigate(['/not-found']);
      }
    });
  }

  saveEmployee(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    if (this.isEditMode && this.employeeId !== null) {
      const updatedEmployee: Employee = {
        id: this.employeeId,
        name: formValue.name,
        department: formValue.department,
        title: formValue.title,
        email: formValue.email,
        hireDate: formValue.hireDate || '',
        isActive: formValue.isActive
      };

      this.employeeService.updateEmployee(
        this.employeeId,
        updatedEmployee
      ).subscribe({
        next: () => {
          this.notificationService.show('Employee updated successfully');
          this.router.navigate(['/employees']);
        },
        error: error => {
          console.error('Failed to update employee.', error);
        }
      });

      return;
    }

    const newEmployee: Employee = {
      id: '',
      name: formValue.name,
      department: formValue.department,
      title: formValue.title,
      email: formValue.email,
      hireDate: formValue.hireDate || '',
      isActive: formValue.isActive
    };

    this.employeeService.addEmployee(newEmployee).subscribe({
      next: () => {
        this.notificationService.show('Employee added successfully');
        this.router.navigate(['/employees']);
      },
      error: error => {
        console.error('Failed to add employee.', error);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}