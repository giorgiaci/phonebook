import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchCarsComponent } from './components/search-cars/search-cars.component';
import { DetailsCarsComponent } from './components/details-cars/details-cars.component';
import { AddCarsComponent } from './components/add-cars/add-cars.component';
import { CarsRouting } from './routing-cars';

@NgModule({
    declarations: [AddCarsComponent, DetailsCarsComponent, SearchCarsComponent],
    exports: [
      DetailsCarsComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,     
      CarsRouting
    ]
  })
  export class CarsModule { }
  