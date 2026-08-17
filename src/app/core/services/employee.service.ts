import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly storageKey = 'employees';

  private employees: Employee[] = [
    {
      id: 1,
      name: 'Moaz Kandeel',
      department: 'Engineering',
      title: 'Frontend Developer',
      email: 'moaz.kandeel@company.com',
      hireDate: '2022-03-15',
      isActive: true
    },
    {
      id: 2,
      name: 'Sara Mohamed',
      department: 'Human Resources',
      title: 'HR Specialist',
      email: 'sara.mohamed@company.com',
      hireDate: '2021-07-20',
      isActive: true
    },
    {
      id: 3,
      name: 'Omar Ali',
      department: 'Finance',
      title: 'Financial Analyst',
      email: 'omar.ali@company.com',
      hireDate: '2023-01-10',
      isActive: true
    },
    {
      id: 4,
      name: 'Mariam Adel',
      department: 'Marketing',
      title: 'Marketing Specialist',
      email: 'mariam.adel@company.com',
      hireDate: '2020-11-05',
      isActive: false
    },
    {
      id: 5,
      name: 'Youssef Khaled',
      department: 'Engineering',
      title: 'Backend Developer',
      email: 'youssef.khaled@company.com',
      hireDate: '2022-09-12',
      isActive: true
    },
    {
      id: 6,
      name: 'Nour Ibrahim',
      department: 'Sales',
      title: 'Sales Executive',
      email: 'nour.ibrahim@company.com',
      hireDate: '2023-04-18',
      isActive: true
    },
    {
      id: 7,
      name: 'Karim Mostafa',
      department: 'Engineering',
      title: 'Software Engineer',
      email: 'karim.mostafa@company.com',
      hireDate: '2021-02-22',
      isActive: true
    },
    {
      id: 8,
      name: 'Laila Ahmed',
      department: 'Finance',
      title: 'Accountant',
      email: 'laila.ahmed@company.com',
      hireDate: '2020-06-14',
      isActive: false
    },
    {
      id: 9,
      name: 'Mahmoud Samir',
      department: 'Marketing',
      title: 'Content Strategist',
      email: 'mahmoud.samir@company.com',
      hireDate: '2022-12-01',
      isActive: true
    },
    {
      id: 10,
      name: 'Hana Tarek',
      department: 'Human Resources',
      title: 'Recruitment Specialist',
      email: 'hana.tarek@company.com',
      hireDate: '2023-06-08',
      isActive: true
    },
    {
      id: 11,
      name: 'Mostafa Gamal',
      department: 'Sales',
      title: 'Account Manager',
      email: 'mostafa.gamal@company.com',
      hireDate: '2021-09-30',
      isActive: true
    },
    {
      id: 12,
      name: 'Salma Wael',
      department: 'Engineering',
      title: 'UI/UX Developer',
      email: 'salma.wael@company.com',
      hireDate: '2022-05-17',
      isActive: true
    },
    {
      id: 13,
      name: 'Tarek Ashraf',
      department: 'Finance',
      title: 'Finance Manager',
      email: 'tarek.ashraf@company.com',
      hireDate: '2019-08-25',
      isActive: true
    },
    {
      id: 14,
      name: 'Dina Hany',
      department: 'Marketing',
      title: 'Brand Manager',
      email: 'dina.hany@company.com',
      hireDate: '2020-03-11',
      isActive: false
    },
    {
      id: 15,
      name: 'Amr Nabil',
      department: 'Engineering',
      title: 'DevOps Engineer',
      email: 'amr.nabil@company.com',
      hireDate: '2023-02-06',
      isActive: true
    }
  ];

  constructor() {
    this.loadEmployees();
  }

  getEmployees(): Employee[] {
    return this.employees;
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find(
      employee => employee.id === id
    );
  }

  addEmployee(employee: Employee): void {

    this.employees.push(employee);

    this.saveEmployees();
  }

  updateEmployee(
    id: number,
    employee: Employee
  ): void {

    const index = this.employees.findIndex(
      item => item.id === id
    );

    if (index !== -1) {

      this.employees[index] = employee;

      this.saveEmployees();
    }
  }

  deleteEmployee(id: number): void {

    this.employees = this.employees.filter(
      employee => employee.id !== id
    );

    this.saveEmployees();
  }

  private saveEmployees(): void {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.employees)
    );
  }

  private loadEmployees(): void {

  const storedEmployees =
    localStorage.getItem(this.storageKey);

  if (!storedEmployees) {
    this.saveEmployees();
    return;
  }

  try {

    this.employees = JSON.parse(storedEmployees);

  } catch (error) {

    console.error(
      'Failed to load employees from LocalStorage.',
      error
    );

    this.saveEmployees();
  }
}
}