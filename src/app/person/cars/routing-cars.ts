import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AddCarsComponent } from './components/add-cars/add-cars';
import { SearchCarsComponent } from './components/search-cars/search-cars.component';


    const routes: Routes = [
        {          
          path: 'searchCar', component:SearchCarsComponent
        },
        {         
          path: 'addCar', component: AddCarsComponent
        },
        {
          path: ':idCar', component:AddCarsComponent
        }
    ]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class CarsRouting{
}