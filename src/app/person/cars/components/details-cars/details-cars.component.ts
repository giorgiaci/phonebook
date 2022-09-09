import { Component, Input, OnInit } from '@angular/core';
import { Car } from '../../car-models/car.model';
import { Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/person/models/person.model';
import { CarService } from '../../car.services';


@Component({
  selector: 'app-details-cars',
  templateUrl: './details-cars.component.html',
  styleUrls: ['./details-cars.component.css'],

})
export class DetailsCarsComponent implements OnInit {
  person:Person;
  car:Car;
  @Input() cars: Car[];
  @Output() deleteCar = new EventEmitter<number>();
  @Output() modifyCar = new EventEmitter<Car>();
  selectedCar: any;
  
  constructor(private route: Router, private activateRoute: ActivatedRoute, private carService:CarService) { }

  ngOnInit(): void {
  }

  deleteCarInDetail(idMacchina: number) {
    this.deleteCar.emit(idMacchina)
  }

  modifyCarInDetail(car:Car) {
    this.modifyCar.emit(car);    
  }

  goTomodifyCar(){  
     
   // this.route.navigate(['car',this.car.id,'edit'], {relativeTo:this.activateRoute});
  }

  setRow(car: Car) {
    if (this.selectedCar === car) {
      this.selectedCar = undefined;
    } else {
      this.selectedCar = car;
    }

  }
}
