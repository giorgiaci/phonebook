import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/person/models/person.model';
import { Car } from '../../car-models/car.model';
import { CarService } from '../../car.services';
import { TipologicaService } from '../../tipologica.services';
import { TipologicaModel } from '../tipologica.model';
import { EngineValidator } from './engine-validator';

@Component({
  selector: 'app-add-cars',
  templateUrl: './add-cars.component.html',
  styleUrls: ['./add-cars.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AddCarsComponent implements OnInit {

  addResult: Array<Car>;
  carsForm: FormGroup;
  person: Person;

  arrayTipologiche: Array <TipologicaModel>;

  constructor( private carService: CarService,
               private tipologicaService: TipologicaService,
               private activateRoute: ActivatedRoute,
               private fb: FormBuilder,
               private router: Router) { }

  ngOnInit(): void {
  
    this.inizializzaForm();
    this.getTipologica();
  }
  onSubmit() { 
    
    const id = +this.activateRoute.snapshot.paramMap.get('idPerson');
    
    let formValue = this.carsForm.value;

    let newCar = new Car();

    newCar.carplate=formValue.carplate;
    newCar.model=formValue.model;
    newCar.brand=formValue.brand;
    newCar.engine=formValue.engine;
    newCar.idPerson= id;


    this.carService.createCar(newCar).subscribe(
      (ok) => {
        alert('cars saved');
        this.router.navigate(['person', id])
      },
      (error) => { console.error('', error) }
    );

  }
  

  inizializzaForm() {
    this.carsForm = this.fb.group({
     
      carplate: [undefined, Validators.required],
      model: [undefined, Validators.required],
      brand: [undefined, Validators.required],
      engine: [undefined, [Validators.required, EngineValidator.lengthFormat(50, 200)]]
      
    })
  }
 
  getTipologica(){
      this.tipologicaService.getTipologiche().subscribe(
        (tipologiche: TipologicaModel[])=>{
         this.arrayTipologiche = tipologiche;
        },
        (error) => { console.error('', error) }
      );
  }

  
}
