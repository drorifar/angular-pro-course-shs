import { Injectable } from '@angular/core';
import { IAutoCompleteProvider, IAutoCompleteItem } from '../models/iAutoCompleteProvider';
import { Observable, of } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService implements IAutoCompleteProvider {

  fashBashApiUrl = 'https://api.fashbash.co/api';


  constructor(private http: HttpClient) { }

  getData(term: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('term', term);

    return this.http.get<any>(`${this.fashBashApiUrl}/suggestions`, { params });
  }

  public getItems(term: string): Observable<IAutoCompleteItem[]> {
    return this.getData(term).pipe(
      switchMap((items) => {
        return of(this.converToAC(items));
      })
    );
  }

  converToAC(data: any): IAutoCompleteItem[] {
    let res = new Array();
    if (data && data['items']) {
    data['items'].forEach((p1: Product) => {
      let p = new IAutoCompleteItem();
      p.id = p1._id;
      p.text = p1.description;
      res.push(p);
    });
  }

    return res;
  }
}
