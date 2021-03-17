import { Person } from "../../models/person.model";

export class Car {
    private _id: number;
    private _idPerson: number;
    private _carplate: string;
    private _brand: string;
    private _model: string;
    private _engine: number;

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }    
    public get carplate(): string {
        return this._carplate;
    }
    public set carplate(value: string) {
        this._carplate = value;
    }   
    public get brand(): string {
        return this._brand;
    }
    public set brand(value: string) {
        this._brand = value;
    }    
    public get model(): string {
        return this._model;
    }
    public set model(value: string) {
        this._model = value;
    }
    public get engine(): number {
        return this._engine;
    }
    public set engine(value: number) {
        this._engine = value;
    }
    public get idPerson(): number {
        return this._idPerson;
    }
    public set idPerson(value: number) {
        this._idPerson = value;
    }
}