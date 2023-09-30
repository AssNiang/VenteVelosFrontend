import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Stock} from "../../../models/stock";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StockService {
  BASE_URL: string = 'http://localhost:8080/VenteVelos-1.0-SNAPSHOT/api/v1/stocks'
  constructor(private http: HttpClient) { }

  addStock(stock: Stock): Observable<any>{
    return this.http.post(this.BASE_URL, stock);
  }

  editStock(stock: Stock): Observable<any>{
    return this.http.put(this.BASE_URL, stock);
  }

  getStockList(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.BASE_URL);
  }

  getStockById(id: string): Observable<Stock>{
    return this.http.get<Stock>(this.BASE_URL + '/' + id);
  }

  deleteStockById(id: string): Observable<any>{
    return this.http.delete(this.BASE_URL + '/' + id);
  }
}
