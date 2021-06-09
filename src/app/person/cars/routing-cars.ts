import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { DetailPersonComponent } from '../components/detail-person/detail-person.component';
import { AddCarsComponent } from './components/add-cars/add-cars';
import { DetailsCarsComponent } from './components/details-cars/details-cars.component';
import { SearchCarsComponent } from './components/search-cars/search-cars.component';


    const routes: Routes = [
        {          
          path: 'searchCar', component:SearchCarsComponent
        },
        {         
          path: 'addCar', component: AddCarsComponent
        },
        {
          path: ':idCar',          
          children:[
            { 
              path:'edit',
              component:AddCarsComponent 
            }
          ]
        }
    ]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class CarsRouting{
}