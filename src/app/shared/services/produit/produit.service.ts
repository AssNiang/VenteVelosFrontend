import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Produit} from "../../../models/produit";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  BASE_URL: string = 'http://localhost:8080/VenteVelos-1.0-SNAPSHOT/api/v1/produits'
  constructor(private http: HttpClient) { }

  addProduit(produit: Produit): Observable<any>{
    return this.http.post(this.BASE_URL, produit);
  }

  editProduit(produit: Produit): Observable<any>{
    return this.http.put(this.BASE_URL, produit);
  }

  getProduitList(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.BASE_URL);
  }

  getProduitById(id: string): Observable<Produit>{
    return this.http.get<Produit>(this.BASE_URL + '/' + id);
  }

  deleteProduitById(id: string): Observable<any>{
    return this.http.delete(this.BASE_URL + '/' + id);
  }
}
