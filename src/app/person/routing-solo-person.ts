import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
// import { LoginGuard } from '../login/login.guard';

import { AddPersonComponent } from './components/add-person/add-person.component';
import { DetailPersonComponent } from './components/detail-person/detail-person.component';
import { SearchPersonComponent } from './components/search-person/search-person.component';

const routes: Routes = [
  {
    // person/search
    path: 'search',
    component: SearchPersonComponent,
  },
  {
    // person/add
    path: 'add',
    component: AddPersonComponent,
  },
  {
    path: ':idPerson',

    children: [
      {
        path: '',
        component: DetailPersonComponent,
      },
      {
        path: 'edit',
        component: AddPersonComponent,
      },
      {
        path: 'car',
        loadChildren: () =>
          import('./cars/cars.module').then((m) => m.CarsModule),
      },
    ],
  },
]; 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    //LoginGuard
  ],
})
export class RoutingPerson {}
