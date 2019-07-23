import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // fashBashApiUrl = 'https://api.fashbash.co/api/feed?page=';
  fashBashApiUrl = 'https://api.fashbash.co/api';
  constructor(private http: HttpClient) { }

  getData(pageNum: number): Observable<Product[]> {
    let params = new HttpParams();
    params = params.append('page', pageNum.toString());

    return this.http.get<Product[]>(`${this.fashBashApiUrl}/feed`, {params});
  }


  getProductById(id: string) {
    return this.getData(0).pipe(
      map( (products: Product[])  => { 
        return products.find(p => p._id === id) 
      })
    )
  }

}
