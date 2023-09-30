import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Client} from "../../../models/client";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  BASE_URL: string = 'http://localhost:8080/VenteVelos-1.0-SNAPSHOT/api/v1/clients'
  constructor(private http: HttpClient) { }

  addClient(client: Client): Observable<any>{
    return this.http.post(this.BASE_URL, client);
  }

  editClient(client: Client): Observable<any>{
    return this.http.put(this.BASE_URL, client);
  }

  getClientList(): Observable<Client[]> {
    return this.http.get<Client[]>(this.BASE_URL);
  }

  getClientById(id: string): Observable<Client>{
    return this.http.get<Client>(this.BASE_URL + '/' + id);
  }

  deleteClientById(id: string): Observable<any>{
    return this.http.delete(this.BASE_URL + '/' + id);
  }
}
