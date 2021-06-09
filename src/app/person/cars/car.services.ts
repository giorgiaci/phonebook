import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Car } from '../cars/car-models/car.model';
import { CarConverter } from './../cars/cars-conveter/cars.converter';
import { macchinaDTO } from './car-dtos/macchina.dto';

@Injectable({ providedIn: 'root' })
export class CarService {
  
  private macchineConverter: CarConverter;

  constructor(private http: HttpClient) {
    this.macchineConverter = new CarConverter();
  }
  public getCar(idCar: number): Observable<Car> {
    return this.http
      .get<macchinaDTO>('http://localhost:3000/cars/' +idCar)
      .pipe(
        map(
          (macchinaSingolaBack: macchinaDTO): Car => {
            let macchinaSingola = this.macchineConverter.toModel(
              macchinaSingolaBack
            );
            return macchinaSingola;
          }
        )
      );
  }
  public getCars(): Observable<Car[]> {
    return this.http.get<macchinaDTO[]>('http://localhost:3000/cars').pipe(
      map((macchinaBackEnd: macchinaDTO[]): Car[] => {
        if (!macchinaBackEnd) {
          return [];
        }
        let macchinaConvertite = [];
        macchinaBackEnd.forEach((p) => {
          macchinaConvertite.push(this.macchineConverter.toModel(p));
        });
        return macchinaConvertite;
      })
    );
  }
  public getCarsByPerson(id: number): Observable<Car[]> {
    var url: string = 'http://localhost:3000/cars?idPersona=' + id;

    return this.http.get<macchinaDTO[]>(url).pipe(
      map((macchinaBackEnd: macchinaDTO[]): Car[] => {
        if (!macchinaBackEnd) {
          return [];
        }
        let macchinaConvertite = [];
        macchinaBackEnd.forEach((p) => {
          macchinaConvertite.push(this.macchineConverter.toModel(p));
        });
        return macchinaConvertite;
      })
    );
  }
  // public getSingleCarByPerson(id: number): Observable<Car> {
  //   var url: string = 'http://localhost:3000/cars?idPersona=' + id;
  //   return this.http.get<macchinaDTO>(url).pipe(
  //     map((macchinaBackEnd: macchinaDTO): Car => {
  //       if (!macchinaBackEnd) {
  //         return undefined;
  //       }       
  //       map((macchinaDalBackEnd: macchinaDTO)=>{
  //         return this.macchineConverter.toModel(macchinaDalBackEnd);
  //       }) 
  //     })
  //   );
  // }
  public getSingleCarByPerson(id: number): Observable<Car> {

    return this.http.get<macchinaDTO>('http://localhost:3000/cars?idPersona=' + id)
      .pipe(       
         
        map(
          (macchinaDalBackEnd: macchinaDTO): Car => {
            if (!macchinaDalBackEnd) {
            return undefined;
          }
          let macchina = this.macchineConverter.toModel(
              macchinaDalBackEnd
            );
            return macchina;
          }
        )
      );
  }
  public createCar(car: Car): Observable<Car> {
    let dto = this.macchineConverter.toDto(car);
    return this.http.post<macchinaDTO>('http://localhost:3000/cars', dto).pipe(
      map((macchinaDalBackEnd: macchinaDTO) => {
        return this.macchineConverter.toModel(macchinaDalBackEnd);
      })
    );
  }
  public deleteCar(idCar: number): Observable<Car> {
    const url = `http://localhost:3000/cars/${idCar}`; 
    return this.http.delete(url).pipe(
        map((macchinaDalBackEnd: macchinaDTO)=>{
          return this.macchineConverter.toModel(macchinaDalBackEnd);
        })
    )
  }
  public modifyCarByPerson(car:Car):Observable<Car>{
    let dto = this.macchineConverter.toDto(car);
    return this.http.put<macchinaDTO>(`http://localhost:3000/cars/cars?idPersona=`, dto).pipe(
      map((carBackEnd:macchinaDTO) => {
        return this.macchineConverter.toModel(carBackEnd);
      })
    )
  }
}
