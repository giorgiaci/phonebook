import { Component, Input, OnInit } from '@angular/core';
import { Car } from '../../car-models/car.model';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-details-cars',
  templateUrl: './details-cars.component.html',
  styleUrls: ['./details-cars.component.css'],
  
})
export class DetailsCarsComponent implements OnInit {
  
  @Input() cars: Car[];
  @Output() deleteCar = new EventEmitter<number>();
 
  selectedCar:any;
  
  constructor() { }

  ngOnInit(): void {
  }

  deleteCarInDetail(idMacchina:number){
     
      this.deleteCar.emit(idMacchina)
    
  }

  setRow(car: Car) {
    if(this.selectedCar === car){
      this.selectedCar = undefined;
    }else{
      this.selectedCar=car;
    }
    
  }

  // setRow(_index: number) {
  //   if(this.status = !this.status){
  //     this.selectedIndex = _index;
  //   }else{
  //     this.selectedIndex = !_index;
  //   }   
  // }
}
