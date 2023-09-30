import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Marque} from "../../../models/marque";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MarqueService {
  BASE_URL: string = 'http://localhost:8080/VenteVelos-1.0-SNAPSHOT/api/v1/marques'
  constructor(private http: HttpClient) { }

  addMarque(marque: Marque): Observable<any>{
    return this.http.post(this.BASE_URL, marque);
  }

  editMarque(marque: Marque): Observable<any>{
    return this.http.put(this.BASE_URL, marque);
  }

  getMarqueList(): Observable<Marque[]> {
    return this.http.get<Marque[]>(this.BASE_URL);
  }

  getMarqueById(id: string): Observable<Marque>{
    return this.http.get<Marque>(this.BASE_URL + '/' + id);
  }

  deleteMarqueById(id: string): Observable<any>{
    return this.http.delete(this.BASE_URL + '/' + id);
  }
}
