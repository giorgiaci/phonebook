import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Car } from '../../cars/car-models/car.model';
import { CarService } from '../../cars/car.services';
import { Person } from '../../models/person.model';
import { PersonsService } from '../../services/persons.service';

@Component({
  selector: 'app-detail-person',
  templateUrl: './detail-person.component.html',
  styleUrls: ['./detail-person.component.css'],
})
export class DetailPersonComponent implements OnInit {
 
  personForm: FormGroup;
  person: Person;
  cars: Car[];

// idPerson: string;
// queryParameter: any;
// subscriptions: Subscription [] = [] ;
  
  constructor(private route: Router,
              private activateRoute: ActivatedRoute,
              private personService: PersonsService,
              private carService: CarService) { } 
 
 ngOnInit(): void {
   
  const id = +this.activateRoute.snapshot.paramMap.get('idPerson');
  
    this.getPerson(id);
    this.getCars(id);


     //   this.subscriptions.push(this.activateRoute.paramMap.subscribe((params)=>{
    //       this.idPerson=params.get('idPerson');
    //   })
    // )
    // this.subscriptions.push(this.activateRoute.queryParamMap.subscribe((queryParams)=>{
    //   this.queryParameter= queryParams;
    // }))

  }
  ngOnDestroy(){
    // this.subscriptions.forEach(s=>s.unsubscribe());
  }

  getPerson(id): void {
   
    this.personService.getPersona(id)
      .subscribe(person => this.person = person); 
  }
  getCars(idPersona) : void{
    this.carService.getCarsByPerson(idPersona)
    .subscribe(cars => this.cars = cars)
  }
  
  gotoSearch() {
    this.route.navigate(['/person/search']);
  }
  addCar(){
    this.route.navigate(['person',this.person.id, 'detail','addCar']);
  }

  delete(){
    this.personService
    .deletePerson(this.person.id)
    .subscribe(
      (ok)=>{alert('person deleted');
      this.route.navigate(['person', 'search']);}
    );
  }
  deleteCarInDetail(idMacchina){
    this.carService
    .deleteCar(idMacchina)
    .subscribe(
      (ok)=>{alert('car deleted');
        this.getCars(this.person.id);
      }
    );
  }

 
}
