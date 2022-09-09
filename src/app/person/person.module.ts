import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPersonComponent } from './components/search-person/search-person.component';
import { RoutingPerson } from './routing-solo-person';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailPersonComponent } from './components/detail-person/detail-person.component';
import { CarsModule } from './cars/cars.module';
import { Invert } from './components/search-person/invert.pipe';
import { BoldDirective } from './components/search-person/bold.directive';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    SearchPersonComponent,
    AddPersonComponent,
    DetailPersonComponent,
    Invert,
    BoldDirective
  ],
  imports: [
    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    RoutingPerson,
    CarsModule
  ]
})
export class PersonModule { }
