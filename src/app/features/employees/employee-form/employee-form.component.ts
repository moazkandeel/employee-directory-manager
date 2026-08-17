import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../core/services/employee.service';
import { NotificationService } from '../../../core/services/notification.service';

function futureDateValidator(
  control: AbstractControl
): ValidationErrors | null {

  if (!control.value) {
    return null;
  }

  const selectedDate = new Date(control.value);
  const today = new Date();

  selectedDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return selectedDate > today
    ? { futureDate: true }
    : null;
}

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {

  form!: FormGroup;

  isEditMode = false;

  employeeId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group({

      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      department: [
        '',
        Validators.required
      ],

      title: [
        '',
        Validators.required
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      hireDate: [
        '',
        futureDateValidator
      ],

      isActive: [
        true
      ]

    });

    this.loadEmployeeForEdit();
  }

  private loadEmployeeForEdit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.isEditMode = true;

    this.employeeId = Number(id);

    const employee =
      this.employeeService.getEmployeeById(this.employeeId);

    if (!employee) {
      this.router.navigate(['/employees']);
      return;
    }

    this.form.patchValue({
      name: employee.name,
      department: employee.department,
      title: employee.title,
      email: employee.email,
      hireDate: employee.hireDate,
      isActive: employee.isActive
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
      );

      this.notificationService.show(
        'Employee updated successfully'
      );

    } else {

      const employees =
        this.employeeService.getEmployees();

      const newId =
        employees.length > 0
          ? Math.max(
              ...employees.map(employee => employee.id)
            ) + 1
          : 1;

      const newEmployee: Employee = {
        id: newId,
        name: formValue.name,
        department: formValue.department,
        title: formValue.title,
        email: formValue.email,
        hireDate: formValue.hireDate || '',
        isActive: formValue.isActive
      };

      this.employeeService.addEmployee(newEmployee);

      this.notificationService.show(
        'Employee added successfully'
      );
    }

    this.router.navigate(['/employees']);
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}