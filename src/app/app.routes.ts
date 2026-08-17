import { Routes } from '@angular/router';

import { EmployeeListComponent } from './features/employees/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './features/employees/employee-detail/employee-detail.component';
import { EmployeeFormComponent } from './features/employees/employee-form/employee-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [

  {
    path: 'employees',
    component: EmployeeListComponent
  },

  {
    path: 'employees/new',
    component: EmployeeFormComponent
  },

  {
    path: 'employees/:id/edit',
    component: EmployeeFormComponent
  },

  {
    path: 'employees/:id',
    component: EmployeeDetailComponent
  },

  {
    path: 'not-found',
    component: NotFoundComponent
  },

  {
    path: '**',
    component: NotFoundComponent
  }

];