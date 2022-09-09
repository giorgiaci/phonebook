import { PersonaDTO } from "../dtos/persona.dto";
import { Person } from "../models/person.model";

export class PersonConverter{
    toDto(model: Person):PersonaDTO{

        return {
            id: model.id,
            nome: model.name,
            genere: model.gender,
            cognome: model.surname,
            telefono: model.phoneNumber,
            eta: model.age,
            datanascita: model.birthdate,
            codFiscale:model.codFiscale,
            email: model.email,
            via: model.street,
            stato: model.state,
            citta: model.city,
            cap: model.zip
        }
    }
    toModel(dto:PersonaDTO): Person{
        let temp = new Person(dto.nome, dto.cognome,  dto.telefono);
        temp.id = dto.id;
        temp.gender = dto.genere;
        temp.age = dto.eta;
        temp.birthdate = dto.datanascita;
        temp.codFiscale = dto.codFiscale;
        temp.email= dto.email;
        temp.street = dto.via;
        temp.state= dto.stato;
        temp.city= dto.citta;
        temp.zip= dto.cap;

        return temp;
    }

}