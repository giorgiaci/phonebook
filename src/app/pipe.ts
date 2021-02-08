import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'MyPipe'
})
export class MyPipe implements PipeTransform{
    transform(value: any, filterString:string, surname:string) {
        if (value.lenght === 0){
            return value;
        }
        for (const item of value){
            const result = [];
            if (item[surname] === filterString ){
                result.push(item);
            }
            return result;
        }
    }

}