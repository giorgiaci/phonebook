import { Car } from "../cars/car-models/car.model";

export class Person {
  private _id: number;
  private _name: string;
  private _surname: string;
  private _codFiscale: string;
  private _birthdate: Date;
  private _age: number;
  private _phoneNumber: number;
  private _email: string;
  private _street: string;
  private _city: string;
  private _state: string;
  private _zip: string;
  private _car: Car; 
  private _carList: Car[];
  

  constructor(name?: string, surname?: string, phoneNumber?: number) {
    this._name = name;
    this._surname = surname;
    this._phoneNumber = phoneNumber;
  } 
  public get car(): Car {
    return this._car;
  }
  public set car(value: Car) {
    this._car = value;
  }
  public get carList(): Car[] {
    return this._carList;
  }
  public set carList(value: Car[]) {
    this._carList = value;
  }
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get surname(): string {
    return this._surname;
  }
  public set surname(value: string) {
    this._surname = value;
  }
  public get codFiscale(): string {
    return this._codFiscale;
  }
  public set codFiscale(value: string) {
    this._codFiscale = value;
  }
  public get birthdate(): Date {
    return this._birthdate;
  }
  public set birthdate(value: Date) {
    this._birthdate = value;
  }
  public get age(): number {
    return this._age;
  }
  public set age(value: number) {
    this._age = value;
  }
  public get phoneNumber(): number {
    return this._phoneNumber;
  }
  public set phoneNumber(value: number) {
    this._phoneNumber = value;
  }
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }
  public get city(): string {
    return this._city;
  }
  public set city(value: string) {
    this._city = value;
  }
  public get state(): string {
    return this._state;
  }
  public set state(value: string) {
    this._state = value;
  }
  public get street(): string {
    return this._street;
  }
  public set street(value: string) {
    this._street = value;
  }
  public get zip(): string {
    return this._zip;
  }
  public set zip(value: string) {
    this._zip = value;
  }


  public get nominativo(){
    return this.name + ' ' + this.surname
  }

}
