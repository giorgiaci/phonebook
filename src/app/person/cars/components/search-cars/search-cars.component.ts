import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Car } from '../../car-models/car.model';
import { CarService } from '../../car.services';

@Component({
  selector: 'app-search-cars',
  templateUrl: './search-cars.component.html',
  styleUrls: ['./search-cars.component.css']
})
export class SearchCarsComponent implements OnInit {

  searchResult: Array<Car>;    
  

  constructor(private service: CarService) { }

  ngOnInit() {
    this.service.getCars().subscribe((cars)=>{
      this.searchResult = cars;
    });
    
  }

}
