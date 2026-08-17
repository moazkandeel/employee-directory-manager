import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { DatePipe, UpperCasePipe } from '@angular/common';

import { Employee } from '../../../models/employee';
import { HighlightOnHoverDirective } from '../../../shared/directives/highlight-on-hover.directive';
import { DepartmentLabelPipe } from '../../../shared/pipes/department-label.pipe';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [
    HighlightOnHoverDirective,
    DepartmentLabelPipe,
    UpperCasePipe,
    DatePipe
  ],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css'
})
export class EmployeeCardComponent {

  @Input()
  employee!: Employee;

  @Output()
  employeeSelected = new EventEmitter<number>();

  onCardClick(): void {
    this.employeeSelected.emit(this.employee.id);
  }
}