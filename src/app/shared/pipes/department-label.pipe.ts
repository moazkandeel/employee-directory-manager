import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'departmentLabel',
  standalone: true
})
export class DepartmentLabelPipe implements PipeTransform {

  transform(department: string): string {

    const labels: Record<string, string> = {
      IT: 'Information Technology',
      HR: 'Human Resources',
      FIN: 'Finance',
      MKT: 'Marketing',
      SALES: 'Sales',
      OPS: 'Operations'
    };

    return labels[department] ?? department;
  }
}