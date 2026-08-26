export interface Employee {
  id: number | string;
  name: string;
  department: string;
  title: string;
  email: string;
  hireDate?: string;
  isActive: boolean;
}