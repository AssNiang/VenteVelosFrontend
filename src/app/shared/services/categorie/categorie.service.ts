import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Categorie} from "../../../models/categorie";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  BASE_URL: string = 'http://localhost:8080/VenteVelos-1.0-SNAPSHOT/api/v1/categories'
  constructor(private http: HttpClient) { }

  addCategorie(categorie: Categorie): Observable<any>{
    return this.http.post(this.BASE_URL, categorie);
  }

  editCategorie(categorie: Categorie): Observable<any>{
    return this.http.put(this.BASE_URL, categorie);
  }

  getCategorieList(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.BASE_URL);
  }

  getCategorieById(id: string): Observable<Categorie>{
    return this.http.get<Categorie>(this.BASE_URL + '/' + id);
  }

  deleteCategorieById(id: string): Observable<any>{
    return this.http.delete(this.BASE_URL + '/' + id);
  }
}
