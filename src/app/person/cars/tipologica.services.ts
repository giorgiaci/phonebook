import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { TipologicaModel } from './components/tipologica.model';

@Injectable({ providedIn: 'root' })
export class TipologicaService {
  //get tipicar
  constructor(private http: HttpClient) {}

  public getTipologiche(): Observable<TipologicaModel[]> {
    return this.http
      .get<TipologicaModel[]>('http://localhost:3000/tipologicaMacchine')
      .pipe(
        map((tipologica: any[]): TipologicaModel[] => {
          if (!tipologica) {
            return [];
          }
          let arrayTipologica = [];
          tipologica.forEach((p) => {
            let tempTipologica = new TipologicaModel();
            tempTipologica.id = p.id;
            tempTipologica.name = p.nome;
            arrayTipologica.push(tempTipologica);
          });
          return arrayTipologica;
        })
      );
  }
}
