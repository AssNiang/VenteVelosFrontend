import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Commande} from "../../../models/commande";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  BASE_URL: string = 'http://localhost:8080/VenteVelos-1.0-SNAPSHOT/api/v1/commandes'
  constructor(private http: HttpClient) { }

  addCommande(commande: Commande): Observable<any>{
    return this.http.post(this.BASE_URL, commande);
  }

  editCommande(commande: Commande): Observable<any>{
    return this.http.put(this.BASE_URL, commande);
  }

  getCommandeList(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.BASE_URL);
  }

  getCommandeById(id: string): Observable<any>{
    return this.http.get<any>(this.BASE_URL + '/' + id);
  }

  deleteCommandeById(id: string): Observable<any>{
    return this.http.delete(this.BASE_URL + '/' + id);
  }
}
