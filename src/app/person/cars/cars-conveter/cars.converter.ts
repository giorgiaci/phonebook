import { Car } from "../car-models/car.model";
import { macchinaDTO } from "../car-dtos/macchina.dto";


export class CarConverter{
    toDto(car: Car):macchinaDTO{
        return{
            id: car.id,
            idPersona: car.idPerson,
            targa: car.carplate,
            modello: car.model,
            marca: car.brand,
            cavalli: car.engine
        }
    }

    toModel(carDTO: macchinaDTO): Car{
        let temp = new Car();
        temp.id= carDTO.id;
        temp.idPerson= carDTO.idPersona;
        temp.carplate= carDTO.targa;
        temp.model = carDTO.modello;
        temp.brand = carDTO.marca;
        temp.engine = carDTO.cavalli;
        return temp;
    }

}