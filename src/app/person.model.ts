export class Person{
    public codFiscale: string;
    public birthdate: Date;
    public age:number;
    private _name: string;   
    private _surname: string;    
    private _phoneNumber: number;
    public email: string;
    
    constructor(name?: string, surname?: string, phoneNumber?: number){
        this._name = name;
        this._surname = surname;
        this._phoneNumber = phoneNumber;
       
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
        
    public get phoneNumber(): number {
        return this._phoneNumber;
    }
    public set phoneNumber(value: number) {
        this._phoneNumber = value;
    }
    
}