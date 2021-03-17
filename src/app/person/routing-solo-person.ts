import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { LoginGuard } from '../login/login.guard';


import { AddPersonComponent } from './components/add-person/add-person.component';
import { DetailPersonComponent } from './components/detail-person/detail-person.component';
import { SearchPersonComponent } from './components/search-person/search-person.component';



const routes: Routes = [
  {
    // person/search
    path: 'search', component:SearchPersonComponent
  },
  {
    // person/add
    path: 'add', component: AddPersonComponent
  },
  
   // {
  //   path: 'detail/:idPerson',
  //   loadChildren: () =>
  //     import('./cars/cars.module').then((m) => m.CarsModule)
   
  // },
 
  {
    path:':idPerson',
    
        children:[
          {
            path: 'edit', component: AddPersonComponent
          },
          {
            path: 'detail', component: DetailPersonComponent,
             loadChildren: () =>
               import('./cars/cars.module').then((m) => m.CarsModule)
          },
         

        ]
  }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[//LoginGuard
  ]
})
export class RoutingSoloPerson { }