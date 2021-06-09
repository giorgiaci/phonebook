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

  carsForm: FormGroup;  
  car:Car;   
  arrayTipologiche: Array <TipologicaModel>;

  constructor( private carService: CarService,
               private fb: FormBuilder,
               private tipologicaService: TipologicaService,
               private router: Router,
               private activateRoute: ActivatedRoute               
               ) { }

  ngOnInit() {
    const idModified = +this.activateRoute.snapshot.paramMap.get('idCar');
    this.inizializzaForm();
    this.getCar(idModified);
    this.getTipologica();    
  }
getmacchina(){
  
}
  getCar(idModified){
    if(idModified){
          this.carService.getCar(idModified).subscribe((c) => {      
     
      this.carsForm.get('carplate').setValue(c.carplate);
      this.carsForm.get('brand').setValue(c.brand);
      this.carsForm.get('engine').setValue(c.engine);
      this.carsForm.get('model').setValue(c.model);      
      
      this.car = c;
    });
    }

  
  }
  onSubmit() { 
    if(this.car){
      this.onSubmitModified()
    }else{
         
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

  }

  onSubmitModified() {
    const id = +this.activateRoute.snapshot.paramMap.get('idPerson');
    let formValue = this.carsForm.value;
    this.car.carplate= formValue.carplate;
    this.car.brand= formValue.brand;
    this.car.engine= formValue.engine;
    this.car.model= formValue.model;

    this.carService.modifyCarByPerson(this.car).subscribe(
      (ok)=>{
        alert('car modified');
       this.router.navigate(['person', id]);
      },
      (error)=>{
        console.error('', error)
      }
    )
  }
  

  inizializzaForm() {
    this.carsForm = this.fb.group({     
      carplate: [undefined, Validators.required],     
      brand: [undefined, Validators.required],
      engine: [undefined, [Validators.required, EngineValidator.lengthFormat(50, 200)]],
      model: [undefined, Validators.required]
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
